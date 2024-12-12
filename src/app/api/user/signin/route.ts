// ログインPOST
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { login } from "~/lib/actions";
import { postSignin } from "~/lib/schemas";
import { handlers } from "~/server/auth";

export const { GET } = handlers;
const secret = process.env.AUTH_SECRET;

export const POST = async (req: NextRequest) => {
  try {
    const data = postSignin.parse(await req.json());
    const ret = await login('credentials', data);
    if(ret==false) throw new Error("err in login");
    
    const token = await getToken({ req, secret, raw: true });
    console.log("JWT@login", token);

    return NextResponse.json({
      message: "sign in successfully",
      jwt: token
    });
  } catch (error) {
    console.error("Error in POST signin request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
