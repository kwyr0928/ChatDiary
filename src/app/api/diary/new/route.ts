import { NextResponse } from "next/server";
import { postChat } from "~/lib/schemas";
import { initializeDiary } from "~/server/service/create";


export async function POST(req: Request) {
  try {
    const { userId } = postChat.parse(await req.json()); //body

    const newDiary = await initializeDiary(userId);
    if(newDiary==null) throw new Error("err in initializeDiary");

    return NextResponse.json({
      message: "start chat successfully",
      diaryId: newDiary.id,
    });
  } catch (error) {
    console.error("Error in POST chat request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
