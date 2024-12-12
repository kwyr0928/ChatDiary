import { z } from "zod";
import { analysesSchema } from "~/lib/schemas";
import { updateAnalyses } from "../repository/updatedata";
import { getDiariesByUserId, getDiaryData } from "../repository/getdata";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function updateAnalysesFB(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    // 全体FB更新
    // @TODO: にいろ

    // Gemini APIキーを設定
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) throw new Error("err in getDiariesByUserId");

    const genAI = new GoogleGenerativeAI(apiKey);
    // モデルの取得
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 1, }, });  // 使用モデル指定

    // 全部の日記の本文を取得 
    const diaries = await getDiariesByUserId(userId);
    if (diaries == null) throw new Error("err in getDiariesByUserId");

    let diarySummaries = ""
    if (diaries.length != 0) {
      for (const diary of diaries) {
        const diaryId: string = diary.id!;
        const diaryData = await getDiaryData(diaryId);
        if (diaryData == null) throw new Error("err in getDiaryData");

        diarySummaries += "[" + diaryData.summary + "]";
      }
    }

    // 日記全文＋要約の文章をGeminiに送る（チャットじゃなくてgenerateContents？）
    const prompt_post = diarySummaries + "あなたは人物の分析を得意とするアシスタントです。上記の[]で囲まれた日記を基に、以下の点を要約して文章にしてください。 主な出来事や体験、感情の変化や価値観、ユーザーの強みや特徴を簡潔かつ自己分析に役立つ形で200字程度でまとめてください。"

    // テキスト生成
    const result = await model.generateContent({
      contents: [{ role: 'USER', parts: [{ text: prompt_post }] }],
      generationConfig: { temperature: 2 },
    });
    // レスポンスの取得
    const response = await result.response;
    const generatedText = await response.text();

    console.log(generatedText)
    // FBの取得
    const text = generatedText;
    // const text = "analyses feedback";
    const analysesData: z.infer<typeof analysesSchema> = {
      userId: userId,
      text: text,
    };
    const updated = await updateAnalyses(userId, text);
    if (updated == null) throw new Error("err in updateAnalyses");

    return updated;
  } catch (error) {
    console.error(error);
    return null;
  }
}
