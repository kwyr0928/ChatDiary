import { z } from "zod";
import { chatsSchema, diariesSchema, modeList, userSchema } from "~/lib/schemas";
import { db } from "../db";

export async function insertNewUser(userData: z.infer<typeof userSchema>) {
  try {
    if (userData == null) throw new Error("Invalid option data");
    const create = await db.user.create({
      data: userData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function initializeDiary(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    const diaryData: z.infer<typeof diariesSchema> = {
      userId: userId,
      title: "新しい日記",
      summary: "出力結果",
      isPublic: false,
    };
    const create = await db.diaries.create({
      data: diaryData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function initializeChat(diaryId: string, userMessage: string) {
  try {
    if (diaryId == null || userMessage ==null) throw new Error("Invalid option data");
    const chatData: z.infer<typeof chatsSchema> = {
      diaryId: diaryId,
      mode: modeList.detail,
      message: userMessage,
    };
    const create = await db.chats.create({
      data: chatData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}
