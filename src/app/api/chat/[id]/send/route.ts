// チャット送信POST

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { postSendChat } from "~/lib/schemas";
import { getChatCounts, getHistoryData } from "~/server/repository/getdata";
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
    if (sendChat == null) throw new Error("err in initializeChat()");

    // AIからの返答
    const chatLimit = 5;
    const diaryCounts = await getChatCounts(diaryId);
    if (diaryCounts == null) throw new Error("err in getChatCounts");

    let aiResponse = "";
    if (diaryCounts < chatLimit) {
      // Gemini APIキーを設定
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      // モデルの取得
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // 使用モデル指定
      //過去のログの生成
      const historyArray = [
        { role: "user", parts: [{ text: "回答する場合は、「だよ~。」を語尾につけてください。" }] },
        { role: "model", parts: [{ text: 'はい、「だよ~。」を語尾につけて回答いたします。' }] },
      ];
      const historyData = await getHistoryData(diaryId);
      if (historyData == null) throw new Error("err in getHistoryData");
      for (const data of historyData) {
        if (data?.message && data?.response) {
          historyArray.push({ role: "user", parts: [{ text: data.message }] });
          historyArray.push({ role: "model", parts: [{ text: data.response }] });
        }
      }

      // テキスト生成
      const chat = model.startChat({
        history: historyArray
      })

      // レスポンスの取得
      const result = await chat.sendMessage(text);
      const response = result.response;
      const responseText = response.text();

      const res = await returnedChat(sendChat?.id, responseText);
      if (res == null) throw new Error("err in returnedChat");
      aiResponse = res.response!;
    } else {
      // TODO: @にいろ 要約を生成する処理

      const dummysummary = "こういう一日を送りました。楽しいね。";
      const updatedDiary = await summariedDiary(diaryId, dummysummary);
      if (updatedDiary == null) throw new Error("err in summariedDiary");
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
