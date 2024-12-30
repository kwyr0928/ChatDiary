// 新規登録処理POST
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { postSignup, userSchema } from "~/lib/schemas";
import { sendEmail } from "~/server/mail/sendEmail";
import { deleteUser } from "~/server/repository/deletedata";
import { getUserByEmail } from "~/server/repository/getdata";
import { insertNewUser } from "~/server/repository/insertdata";

export async function POST(req: Request) {
  try {
    const { email, password } = postSignup.parse(await req.json()); //body

    // ユーザー存在判定
    const exist = await getUserByEmail(email);

    if (exist != null) {
      if (exist.emailVerified == null) {
        // ユーザー削除して登録処理へ
        await deleteUser(exist.id!);
      } else {
        // 認証済みの既存ユーザー
        return NextResponse.json({ error: "exist user" }, { status: 409 });
      }
    }

    // ハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB挿入
    const user = await insertNewUser(
      userSchema.parse({
        email: email,
        password: hashedPassword,
      }),
    );
    if (user == null) throw new Error("err in insertNewUser");

    // トークン生成
    const secret = process.env.JWT_SECRET;
    const key = new TextEncoder().encode(secret);

    const payload = {
      id: user.id,
      email: email,
    };
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5m") //5min
      .sign(key);
    console.log("signup token: " + token);

    // メール送信
    await sendEmail(email, token);

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
