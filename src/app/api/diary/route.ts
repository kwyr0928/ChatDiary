// 全日記の取得GET
import { NextResponse } from "next/server";
import { chatLogSchema } from "~/lib/schemas";
import { auth } from "~/server/auth";
import {
  getChatsByDiaryId,
  getDiariesByUserId,
  getDiaryData,
  getTagByID,
  getTagConnectionsByDiary,
} from "~/server/repository/getdata";
import { getRecentTagNamesByUserId } from "~/server/service/fetch";

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
    const diaries = await getDiariesByUserId(userId);
    if (diaries == null) throw new Error("err in getDiariesByUserId");

    const diaryDatas = [];
    if (diaries.length != 0) {
      for (const diary of diaries) {
        const diaryId: string = diary.id!;
        const diaryData = await getDiaryData(diaryId);
        if (diaryData == null) throw new Error("err in getDiaryData");

        // タグ取得
        const tags = [];
        const tagConnections = await getTagConnectionsByDiary(diaryId);
        if (tagConnections?.length != 0) {
          for (const tag of tagConnections!) {
            const tagData = await getTagByID(tag.tagId);
            if (tagData == null) throw new Error("err in getTagByID");
            tags.push(tagData.name);
          }
        }

        //チャットログ
        const chatLog = [];
        const chats = await getChatsByDiaryId(diaryId);
        if (chats == null) throw new Error("err in getChatsByDiaryId");
        for (const chat of chats) {
          chatLog.push(chatLogSchema.parse(chat));
        }

        diaryDatas.push(diaryData);
      }
    }

    // タグ一覧
    const getTagNames = await getRecentTagNamesByUserId(userId);

    return NextResponse.json({
      message: "get all diaries successfully",
      diaries: diaryDatas,
      tagList: getTagNames,
    });
  } catch (error) {
    console.error("Error in GET diary request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
