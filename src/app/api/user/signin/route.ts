// ログインPOST
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { login } from "~/lib/actions";
import { postSignup } from "~/lib/schemas";
import { handlers } from "~/server/auth";

export const { GET } = handlers;
const secret = process.env.AUTH_SECRET

export const POST = async (req: NextRequest) => {
  const data = postSignup.parse(await req.json());
  const ret = await login('credentials', data);
  
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  
  return ret;
};
