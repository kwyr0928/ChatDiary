import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteUser } from "~/server/repository/deletedata";
import { getUserByUserID } from "~/server/repository/getdata";

// GET ユーザー情報。登録完了メールを開いたとき、登録できるかどうか
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const userId = z.string().parse(par.id); //パスパラメータ
    const userData = await getUserByUserID(userId);
    return NextResponse.json({
      message: "get user successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Error in GET user request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// 退会処理DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const userId = z.string().parse(par.id); //パスパラメータ

    const deleted = await deleteUser(userId);
    return NextResponse.json({
      message: "delete user successfully. email:" + deleted?.email,
    });
  } catch (error) {
    console.error("Error in DELETE user request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
