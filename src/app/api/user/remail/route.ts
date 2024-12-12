// メール再送POST
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { postReEmail } from "~/lib/schemas";
import { sendEmail } from "~/server/mail/sendEmail";

export async function POST(req: Request) {
  try {
    const { userId, email } = postReEmail.parse(await req.json()); //body

    // トークン生成
    const secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);

    const payload = {
        id: userId,
        email: email,
    }
    const token = await new SignJWT(payload).setProtectedHeader({alg:"HS256"})
    .setExpirationTime("5m") //5min
    .sign(key);
    console.log("signup token: "+token);
    
    // メール送信
    await sendEmail(email, token);

    return NextResponse.json({
      message: "resend Email successfully! email: " + email,
    });
  } catch (error) {
    console.error("Error in POST ReMail request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
