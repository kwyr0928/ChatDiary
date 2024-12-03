//ログアウト処理POST
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { logout } from "~/lib/actions";
import { handlers } from "~/server/auth";

export const { GET } = handlers;
const secret = process.env.AUTH_SECRET

export const POST = async (req: NextRequest) => {
  const ret = await logout();
  
  const tokenaf = await getToken({ req, secret })
  console.log("JSON Web Token", tokenaf)
  
  return ret;
};
