import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { registerEmail } from "~/server/repository/updatedata";

const secret = process.env.AUTH_SECRET;

export async function PUT(req: Request) {
  try {
    // トークンからメアド取り出し
    const token = await getToken({ req, secret });
    if(token==null) throw new Error("err in getToken");
    const email = token.email!;
    const registered = await registerEmail(email);
    if(registered==null) throw new Error("err in registerEmail");

    return NextResponse.json({
      message: "register email successfully",
    });
  } catch (error) {
    console.error("Error in PUT register request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
