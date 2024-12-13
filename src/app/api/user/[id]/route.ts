import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { deleteUser } from "~/server/repository/deletedata";
import { getUserByUserID } from "~/server/repository/getdata";

// GET ユーザー情報。登録完了メールを開いたとき、登録できるかどうか
export async function GET() {
  try {
    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;
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
export async function DELETE() {
  try {
    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;
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
