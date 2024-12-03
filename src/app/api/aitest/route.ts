import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: Request) {
    try {
        const { prompt_post } = await req.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'default_api_key');  // default値を設定

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContentStream(prompt_post);
        const response = await result.response

        return NextResponse.json({
            message: response.text()
        })
    } catch (error) {
        console.error("Error in POST xxx request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}