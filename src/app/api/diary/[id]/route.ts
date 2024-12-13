import { NextResponse } from "next/server";
import { z } from "zod";
import { chatLogSchema, putDiary } from "~/lib/schemas";
import { auth } from "~/server/auth";
import { deleteDiary } from "~/server/repository/deletedata";
import { getChatsByDiaryId, getDiaryData, getTagByID, getTagByName, getTagConnectionsByDiary } from "~/server/repository/getdata";
import { updateDiary, updateRecentTag } from "~/server/repository/updatedata";
import { connectDiaryTag, createTag } from "~/server/service/create";
import { getRecentTagNamesByUserId } from "~/server/service/fetch";

// 特定の日記の詳細GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    console.log(par);
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;
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

    // タグ一覧
    const getTagNames = await getRecentTagNamesByUserId(userId);

    return NextResponse.json({
      message: "get diary successfully",
      diaryData: diaryData,
      tags: tags,
      tagList: getTagNames,
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

// タグ、本文、公開範囲更新のPUT
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const { summary, tags, isPublic } = putDiary.parse(await req.json()); //body

    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;

    const updatedDiary = await updateDiary(diaryId, summary, isPublic);
    if(updatedDiary==null) throw new Error("err in getDiaryData");

    //タグの紐づけ
    for (const tag of tags) {
      const tagData = await getTagByName(tag, userId);
      let tagId = "";
      if(tagData==null){
        // 新しいタグ生成
        const newTag = await createTag(tag, userId);
        if(newTag==null) throw new Error("err in createTag");
        tagId = newTag.id;
      } else {
        // 既にあるのでupdate更新
        const updateTag = await updateRecentTag(tagData.id!);
        if(updateTag==null) throw new Error("err in updateRecentTag");
        tagId = tagData.id!;
      }
      //紐づけ
      await connectDiaryTag(diaryId, tagId);
    }
    return NextResponse.json({
      message: "update diary successfully",
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

// 日記削除DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    
    const deleted = await deleteDiary(diaryId);
    if(deleted==null) throw new Error("err in deleteDiary");
    
    return NextResponse.json({
      message: "delete diary successfully. diaryTitle: " + deleted.title,
    });
  } catch (error) {
    console.error("Error in DELETE diary request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
