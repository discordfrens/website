// Inspired by: https://alistair.blog/serverless-discord-oauth

import { NextApiRequest, NextApiResponse } from 'next';
import urlcat from 'urlcat';
import { O } from '../../../types';
import axios from 'axios';
import { RESTGetAPIUserResult } from 'discord-api-types/v10';
import { serialize } from 'cookie';
import dayjs from 'dayjs';
import { sign } from 'jsonwebtoken';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, JWT_SECRET, URL } =
    process.env as O<string>;
const REDIRECT_URL = `${URL}/api/auth/callback`;
const SCOPES = ['identify'].join(' ');
const OAUTH_URL = urlcat(`https://discord.com/api/oauth2/authorize`, {
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: REDIRECT_URL,
    response_type: 'code',
    scope: SCOPES,
});

const extangeCode = async (code: string) => {
    const BODY = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        redirect_uri: REDIRECT_URL,
        grant_type: 'authorization_code',
        code: code,
        scope: SCOPES,
    }).toString();

    const auth = (await fetch('https://discord.com/api/oauth2/token', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body: BODY,
    }).then((res) => res.json())) as {
        access_token: string;
        token_type: string;
    };

    const user = (await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `${auth.token_type} ${auth.access_token}` },
    }).then((res) => res.json())) as RESTGetAPIUserResult;

    return { user, auth };
};

const getCookieHeader = (token: string) => {
    return serialize(`token`, token, {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        expires: dayjs().add(1, 'week').toDate(),
        sameSite: 'lax',
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.redirect('/');
    const { code = null } = req.query as O<string>;
    if (typeof code !== 'string') {
        return res.redirect(OAUTH_URL);
    }
    const { user } = await extangeCode(code);
    const token = sign(user, JWT_SECRET, { expiresIn: '7d' });
    const cookie = getCookieHeader(token);
    res.setHeader('Set-Cookie', cookie);
    res.redirect('/');
};
