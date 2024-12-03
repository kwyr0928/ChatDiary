// 新規登録処理POST
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { postSignup, userSchema } from "~/lib/schemas";
import { insertNewUser } from "~/server/repository/insertdata";

export async function POST(req: Request) {
  try {
    const { email, password } = postSignup.parse(await req.json()); //body

    // ハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB挿入
    await insertNewUser(userSchema.parse({
      email: email,
      password: hashedPassword,
    }))

    return NextResponse.json({
      message: "create User successfully! email: " + email,
    });
  } catch (error) {
    console.error("Error in POST signup request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
