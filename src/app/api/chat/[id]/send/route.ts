// チャット送信POST

import { NextResponse } from "next/server";
import { z } from "zod";
import { postSendChat } from "~/lib/schemas";
import { getChatCounts } from "~/server/repository/getdata";
import { initializeChat } from "~/server/repository/insertdata";
import { returnedChat, summariedDiary } from "~/server/repository/updatedata";

export async function POST(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const { mode, text } = postSendChat.parse(await req.json()); //body

    // 送ったチャットを反映
    const sendChat = await initializeChat(diaryId, mode, text);
    if (sendChat==null) throw new Error("err in initializeChat()");
    
    // AIからの返答
    const chatLimit = 5;
    const diaryCounts = await getChatCounts(diaryId);
    if(diaryCounts==null) throw new Error("err in getChatCounts");

    let aiResponse = "";
    if(diaryCounts < chatLimit){
      // TODO: @にいろ AIに質問を聞く処理

      const dummy = "dummy質問ですがどうですか？";
      const res = await returnedChat(sendChat?.id, dummy);
      if(res==null) throw new Error("err in returnedChat");
      aiResponse = res.response!;
    } else {
      // TODO: @にいろ 要約を生成する処理

      const dummysummary = "こういう一日を送りました。楽しいね。";
      const updatedDiary = await summariedDiary(diaryId, dummysummary);
      if(updatedDiary==null) throw new Error("err in summariedDiary");
      aiResponse = updatedDiary.summary!;
    }
    return NextResponse.json({
      message: "send chat successfully",
      chatId: sendChat?.id,
      count: diaryCounts,
      response: aiResponse,
    });
  } catch (error) {
    console.error("Error in POST chat/[id]/send request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
