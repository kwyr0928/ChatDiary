// チャット送信POST

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { postSendChat } from "~/lib/schemas";
import { getChatCounts, getHistoryData } from "~/server/repository/getdata";
import { returnedChat, summariedDiary } from "~/server/repository/updatedata";
import { initializeChat } from "~/server/service/create";

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
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 2, }, });  // 使用モデル指定
      //過去のログの生成
      const historyArray = []
      if (mode == 0) {              // 物事モード
        historyArray.push({ role: "user", parts: [{ text: "あなたは物事について深掘りする質問を得意とするアシスタントです。ユーザーが書いた文章に基づいて、その出来事や状況の背景、関連する要素、起こった結果について詳しく引き出し、それを深く理解する手助けをする質問を1つしてください。質問は親しみやすく、ユーザーが考えを整理しやすいトーンで簡潔に作成してください。" }] });
        historyArray.push({ role: "model", parts: [{ text: 'はい、私は物事を深掘りする質問を得意とするアシスタントです。個人的な意見は述べず、リラックスしたトーンで、ユーザーが答えやすい簡単な質問を、80字以内の簡潔な文章で1つ作成します。' }] });
      } else {                       // 感情モード
        historyArray.push({ role: "user", parts: [{ text: "あなたは感情を深掘りする質問を得意とするアシスタントです。ユーザーが書いた文章に基づいて、そのときの感情や体験の背景を詳しく引き出し、価値観、強みを見つけ出すことにつながるような質問を1つしてください。質問は親しみやすく、ユーザーが考えを整理しやすいトーンで簡潔に作成してください。" }] });
        historyArray.push({ role: "model", parts: [{ text: 'はい、私は感情を深掘りする質問を得意とするアシスタントです。個人的な意見は述べず、リラックスしたトーンで、ユーザーが答えやすい簡単な質問を、80字以内の簡潔な文章で1つ作成します。' }] });
      }
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


      // Gemini APIキーを設定
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      // モデルの取得
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 2, }, });  // 使用モデル指定
      //過去のログの生成
      const historyArray = []
      if (mode == 0) {              // 物事モード
        historyArray.push({ role: "user", parts: [{ text: "あなたは物事について深掘りする質問を得意とするアシスタントです。ユーザーが書いた文章に基づいて、その出来事や状況の背景、関連する要素、起こった結果について詳しく引き出し、それを深く理解する手助けをする質問を1つしてください。質問は親しみやすく、ユーザーが考えを整理しやすいトーンで簡潔に作成してください。" }] });
        historyArray.push({ role: "model", parts: [{ text: 'はい、私は物事を深掘りする質問を得意とするアシスタントです。個人的な意見は述べず、リラックスしたトーンで、ユーザーが答えやすい簡単な質問を、80字以内の簡潔な文章で1つ作成します。' }] });
      } else {                       // 感情モード
        historyArray.push({ role: "user", parts: [{ text: "あなたは感情を深掘りする質問を得意とするアシスタントです。ユーザーが書いた文章に基づいて、そのときの感情や体験の背景を詳しく引き出し、価値観、強みを見つけ出すことにつながるような質問を1つしてください。質問は親しみやすく、ユーザーが考えを整理しやすいトーンで簡潔に作成してください。" }] });
        historyArray.push({ role: "model", parts: [{ text: 'はい、私は感情を深掘りする質問を得意とするアシスタントです。個人的な意見は述べず、リラックスしたトーンで、ユーザーが答えやすい簡単な質問を、80字以内の簡潔な文章で1つ作成します。' }] });
      }
      const historyData = await getHistoryData(diaryId);
      if (historyData == null) throw new Error("err in getHistoryData");
      for (const data of historyData) {
        if (data?.message && data?.response) {
          historyArray.push({ role: "user", parts: [{ text: data.message }] });
          historyArray.push({ role: "model", parts: [{ text: data.response }] });
        }
      }
      // ユーザーが送る文章を history に追加
      if (text) {
        historyArray.push({ role: "user", parts: [{ text }] });
      }

      // テキスト生成
      const chat = model.startChat({
        history: historyArray
      })

      // 要約の取得
      const result = await chat.sendMessage("これまでのやり取りを基に、日記として200字程度で要約してまとめてください");
      const response = result.response;
      const summaryText = response.text();

      // 日記に追加
      const updatedDiary = await summariedDiary(diaryId, summaryText);
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
