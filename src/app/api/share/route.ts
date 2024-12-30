import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { getOtherUserDiary } from "~/server/service/fetch";

// 自分以外の誰かの日記取得 GET
export async function GET() {
  try {
    const session = await auth();
    if (session == null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;

    const share = await getOtherUserDiary(userId);

    return NextResponse.json({
      message: "get share successfully",
      share: share,
    });
  } catch (error) {
    console.error("Error in GET share request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
