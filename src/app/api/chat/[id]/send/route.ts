// チャット送信POST

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { postSendChat } from "~/lib/schemas";
import { getChatCounts, getHistoryData } from "~/server/repository/getdata";
import { returnedChat, summariedDiary } from "~/server/repository/updatedata";
import { initializeChat } from "~/server/service/create";

export async function POST(
  req: Request,
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

    // タイムアウト付きの関数を作成
    async function withTimeout(promise: Promise<any>, timeoutMs: number): Promise<any> {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("Request timed out")), timeoutMs);
        promise
          .then((result) => {
            clearTimeout(timeout);
            resolve(result);
          })
          .catch((error) => {
            clearTimeout(timeout);
            reject(error);
          });
      });
    }

    // タイムアウト時間の設定
    const timeoutMs = 10000;  // 10秒

    let aiResponse = "";
    if (diaryCounts < chatLimit) {
      // Gemini APIキーを設定
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return NextResponse.json({ error: 'API key not found' }, { status: 500 });
      }
      const genAI = new GoogleGenerativeAI(apiKey);
      // モデルの取得
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 1, }, });  // 使用モデル指定
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

      try {
        // レスポンスの取得
        const result = await withTimeout(chat.sendMessage(text), timeoutMs);
        const response = result.response;
        const responseText = response.text();

        const res = await returnedChat(sendChat?.id, responseText);

        if (res == null) throw new Error("err in returnedChat");
        aiResponse = res.response!;
      } catch (error) {
        if (error.message === "Request timed out") {
          console.error("Gemini API request timed out");

          // タイムアウト時にchatcountを増加させないための処理
          return NextResponse.json(
            { error: "Gemini API request timed out" },
            { status: 504 },
          );
        } else {
          throw error; // その他のエラーはそのままスロー
        }
      }
    } else {
      // 要約を生成する処理
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
      let summaryText;
      try {
        // 要約の取得
        const result = await withTimeout(chat.sendMessage("これまでのやり取りを基に、一人称視点で自然な日記を書いてください。AIとのやり取りや会話形式には触れず、内容が矛盾しないように調整してください。余計な情報は追加せず、200字程度で要約してまとめてください"), 10000);
        const response = result.response;
        summaryText = response.text();
      } catch (error) {
        if (error.message === "Request timed out") {
          console.error("Gemini API request timed out");

          // タイムアウト時にchatcountを増加させないための処理
          return NextResponse.json(
            { error: "Gemini API request timed out" },
            { status: 504 },
          );
        } else {
          throw error; // その他のエラーはそのままスロー
        }
      }
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
