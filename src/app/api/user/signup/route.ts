// 新規登録処理POST
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { postSignup, userSchema } from "~/lib/schemas";
import { sendEmail } from "~/server/mail/sendEmail";
import { insertNewUser } from "~/server/repository/insertdata";

export async function POST(req: Request) {
  try {
    const { email, password } = postSignup.parse(await req.json()); //body

    // ハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB挿入
    const user = await insertNewUser(userSchema.parse({
      email: email,
      password: hashedPassword,
    }))
    if(user==null) throw new Error("err in insertNewUser");

    // メール送信
    await sendEmail(email);

    return NextResponse.json({
      message: "create User successfully! email: " + email,
      userId: user.id,
    });
  } catch (error) {
    console.error("Error in POST signup request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
