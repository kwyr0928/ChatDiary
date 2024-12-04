// 全日記の取得GET

import { NextResponse } from "next/server";
import { z } from "zod";
import { chatLogSchema } from "~/lib/schemas";
import { getChatsByDiaryId, getDiariesByUserId, getDiaryData, getTagByID, getTagConnectionsByDiary } from "~/server/repository/getdata";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ
    const diaries = await getDiariesByUserId(userId);
    if(diaries==null) throw new Error("err in getDiariesByUserId");

    const diaryDatas = []
    for(const diary of diaries){
      const diaryId: string = diary.id!;
      const diaryData = await getDiaryData(diaryId);
      if(diaryData==null) throw new Error("err in getDiaryData");
      
      // タグ取得
      const tags = [];
      const tagConnections = await getTagConnectionsByDiary(diaryId);
      if(tagConnections==null) throw new Error("err in getTagConnectionsByDiary");

      for(const tag of tagConnections){
        const tagData = await getTagByID(tag.tagId);
        if(tagData==null) throw new Error("err in getTagByID");
        tags.push(tagData.name);
      }

      //チャットログ
      const chatLog = [];
      const chats = await getChatsByDiaryId(diaryId);
      if(chats==null) throw new Error("err in getChatsByDiaryId");
      for(const chat of chats) {
        chatLog.push(chatLogSchema.parse(chat));
      }

      diaryDatas.push(diaryData);
    }

    return NextResponse.json({
      message: "get all diaries successfully",
      diaries: diaryDatas,
    });
  } catch (error) {
    console.error("Error in GET diary request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
