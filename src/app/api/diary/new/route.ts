import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { createContinuation, initializeDiary } from "~/server/service/create";


export async function POST() {
  try {
    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;

    const newDiary = await initializeDiary(userId);
    if(newDiary==null) throw new Error("err in initializeDiary");

    // 継続登録処理
    await createContinuation(userId, new Date());

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
