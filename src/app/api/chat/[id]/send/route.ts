// チャット送信POST

import { NextResponse } from "next/server";
import { z } from "zod";
import { postSendChat } from "~/lib/schemas";
import { initializeChat } from "~/server/repository/insertdata";

export async function POST(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const { mode, text } = postSendChat.parse(await req.json()); //body

    const sendChat = await initializeChat(diaryId, mode, text);

    return NextResponse.json({
      message: "send chat successfully",
      chatId: sendChat?.id,
    });
  } catch (error) {
    console.error("Error in POST chat/[id]/send request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
