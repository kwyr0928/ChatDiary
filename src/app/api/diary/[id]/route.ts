// 特定の日記の詳細GET
// タグ、本文、公開範囲更新のPUT
// 日記削除DELETE

import { NextResponse } from "next/server";
import { z } from "zod";
import { chatLogSchema } from "~/lib/schemas";
import { getChatsByDiaryId, getDiaryData, getTagByID, getTagConnectionsByDiary } from "~/server/repository/getdata";

export async function GET(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
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

    return NextResponse.json({
      message: "get diary successfully",
      diaryData: diaryData,
      tags: tags,
      chatLog: chatLog,
    });
  } catch (error) {
    console.error("Error in GET diary/id request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
