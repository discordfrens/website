import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "GET") return res.redirect("/")
  res.redirect(process.env.DISCORD_LOGIN_URL as string)
};
