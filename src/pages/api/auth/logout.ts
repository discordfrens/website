import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { firstQuery } from '../../../utils/utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.redirect('/');
    res.setHeader(
        'Set-Cookie',
        serialize('token', '', {
            maxAge: -1,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'lax',
            path: '/',
        })
    );
    res.redirect(firstQuery(req.query.onLogout) || '/');
};
