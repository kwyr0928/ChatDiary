import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getHistoryData } from "~/server/repository/getdata";


export async function POST(req: Request) {
    try {
        const { diaryId, prompt_post } = await req.json();
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
            {role: "user", parts: [{ text: "回答する場合は、「だよ~。」を語尾につけてください。" }]},
            {role: "model", parts: [{text: 'はい、「だよ~。」を語尾につけて回答いたします。'}]},
        ];
        const historyData = await getHistoryData(diaryId);
        if (historyData == null) throw new Error("err in getHistoryData");
        for (const data of historyData){
            historyArray.push({role: "user", parts: [{ text: data.message }]});
            historyArray.push({role: "model", parts: [{ text: data.response! }]});
        }

        // テキスト生成
        const chat = await model.startChat({
            history: historyArray
        })

        // レスポンスの取得
        const result = await chat.sendMessage(prompt_post);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ response, text });

    } catch (error) {
        console.error("エラーが発生しました:", error);
        return NextResponse.json(
            { error: "テキスト生成中にエラーが発生しました。" },
            { status: 500 },
        );
    }
}