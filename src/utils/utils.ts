import { RESTGetAPIUserResult } from "discord-api-types/v10";
import { GetServerSidePropsContext } from "next";
import { parse } from "cookie"
import { verify } from "jsonwebtoken";

export const parseUser = (ctx: GetServerSidePropsContext): RESTGetAPIUserResult | null => {
  if(!ctx.req.headers.cookie) {
    return null
  }
  const token = parse(ctx.req.headers.cookie)["token"]
  if(!token) return null;
  try {
    const { iat, exp, ...user } = verify(token, process.env.JWT_SECRET as string) as RESTGetAPIUserResult & {
      iat: number;
      exp: number
    }
    return user
  } catch {
    return null
  }
}

export const firstQuery = (a: undefined | string | string[]) => {
    if(!a) return;
    if(typeof a === "string") return a;
    return a[0]
}