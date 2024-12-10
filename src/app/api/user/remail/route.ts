// メール再送POST
import { NextResponse } from "next/server";
import { postReEmail } from "~/lib/schemas";
import { sendEmail } from "~/server/mail/sendEmail";

export async function POST(req: Request) {
  try {
    const { email } = postReEmail.parse(await req.json()); //body

    // メール送信
    const emailSended = await sendEmail(email);

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
