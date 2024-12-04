import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: Request) {
    try {
        const { prompt_post } = await req.json();
        // Gemini APIキーを設定
        // const apiKey = process.env.GEMINI_API_KEY;
        const apiKey = "AIzaSyD7UYVUhhJFBP3SVwzr92EmaIB5T5lw8gU";

        if (!apiKey) {
            return NextResponse.json({ error: 'API key not found' }, { status: 500 });
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        // モデルの取得
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  // 使用モデル指定
        // テキスト生成
        const result = await model.generateContent({ 
            contents: [{ role: 'USER', parts: [{ text: prompt_post }] }], 
            generationConfig: { maxOutputTokens: 100 }, 
        });
        // レスポンスの取得
        const response = await result.response;
        const generatedText = await response.text();

        console.log("プロンプト:", prompt_post);
        console.log("APIレスポンス:", response);
        console.log(JSON.stringify(response.text));
        // console.log(response.candidates?.[0]?.content?.text); // contentプロパティのtextプロパティを取得
        
        return NextResponse.json({
            message: generatedText
        })
    } catch (error) {
        console.error("エラーが発生しました:", error);
        return NextResponse.json(
            { error: "テキスト生成中にエラーが発生しました。" },
            { status: 500 },
        );
    }
}