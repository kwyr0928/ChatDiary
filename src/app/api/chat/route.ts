// 新規日記作成POST。diaryIdを返す！

import { NextResponse } from "next/server";
import { postChat } from "~/lib/schemas";
import { initializeDiary } from "~/server/repository/insertdata";

export async function POST(req: Request) {
  try {
    const { userId } = postChat.parse(await req.json()); //body

    const newDiary = await initializeDiary(userId);

    return NextResponse.json({
      message: "start chat successfully",
      diaryId: newDiary?.id,
    });
  } catch (error) {
    console.error("Error in POST chat request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
