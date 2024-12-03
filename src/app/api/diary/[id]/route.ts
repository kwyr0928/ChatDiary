// 特定の日記の詳細GET
// タグ、本文、公開範囲更新のPUT
// 日記削除DELETE

import { NextResponse } from "next/server";
import { z } from "zod";
import { chatLogSchema, putDiary } from "~/lib/schemas";
import { getChatsByDiaryId, getDiaryData, getTagByID, getTagByName, getTagConnectionsByDiary } from "~/server/repository/getdata";
import { connectDiaryTag, createTag } from "~/server/repository/insertdata";
import { updateDiary } from "~/server/repository/updatedata";

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

export async function PUT(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const { summary, tags, isPublic } = putDiary.parse(await req.json()); //body

    const updatedDiary = await updateDiary(diaryId, summary, isPublic);
    if(updatedDiary==null) throw new Error("err in getDiaryData");

    //タグの紐づけ
    for (const tag of tags) {
      const tagData = await getTagByName(tag);
      let tagId = "";
      if(tagData==null){
        // 新しいタグ生成
        const newTag = await createTag(tag);
        if(newTag==null) throw new Error("err in createTag");
        tagId = newTag.id;
      } else {
        tagId = tagData.id!;
      }
      //紐づけ
      const newConnection = await connectDiaryTag(diaryId, tagId);
    }
    return NextResponse.json({
      message: "updaate diary successfully",
      diaryData: updatedDiary,
    });
  } catch (error) {
    console.error("Error in UPDATE diary request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
