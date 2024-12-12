import { JWTPayload, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { registerEmail } from "~/server/repository/updatedata";

const secret = process.env.JWT_SECRET;

export async function PUT(req: Request) {
  try {
    // ヘッダーから取り出し
    const authHeader = req.headers.get("authorization");

    const headToken = authHeader!.substring(4); // "Bearer "を除いたトークン部分
    console.log(headToken);
    // トークンからメアド取り出し
    const secretKey = new TextEncoder().encode(secret);
    let token: JWTPayload;

    try {
      const verified = await jwtVerify(headToken, secretKey);
      token = verified.payload;
    } catch (err) {
      if (err.code === "ERR_JWT_EXPIRED") {
        return NextResponse.json(
          { error: "Token expired" },
          { status: 401 }
        );
      }
      throw err; // 他のエラーは再スロー
    }
    const email = token.email;
    console.log(email);
    const registered = await registerEmail(email as string);
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
