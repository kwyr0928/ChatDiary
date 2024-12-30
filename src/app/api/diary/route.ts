// 全日記の取得GET
import { NextResponse } from "next/server";
import { chatLogSchema } from "~/lib/schemas";
import { auth } from "~/server/auth";
import {
  getChatsByDiaryId,
  getDiariesByUserId,
  getTagByID,
  getTagConnectionsByDiary
} from "~/server/repository/getdata";
import { getDiariesAndTag, getRecentTagNamesByUserId } from "~/server/service/fetch";

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

    const diaryDatas = await Promise.all(
      diaries.map(async (diary) => {
        const diaryId: string = diary.id!;
        const [diaryData, tagConnections, chats] = await Promise.all([
          getDiariesAndTag(diaryId),
          // タグ取得
          getTagConnectionsByDiary(diaryId),
          //チャットログ
          getChatsByDiaryId(diaryId)
        ]);
        if (diaryData == null) throw new Error("err in getDiaryData");
        if (chats == null) throw new Error("err in getChatsByDiaryId");
        
        const tags = tagConnections?.length
          ? await Promise.all(
              tagConnections.map(async (tag) => {
                const tagData = await getTagByID(tag.tagId);
                if (tagData == null) throw new Error("err in getTagByID");
                return tagData.name;
              })
            )
          : [];
          
          // チャットログの処理
          const chatLog = chats.map(chat => chatLogSchema.parse(chat));
          
          return {
            ...diaryData,
            tags,
            chatLog
          };
        })
      );

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
