import { NextResponse } from "next/server";
import { z } from "zod";
import { getOtherUserDiaryData } from "~/server/repository/getdata";

// 自分以外の誰かの日記取得 GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ
    
    const share = await getOtherUserDiaryData(userId);

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
