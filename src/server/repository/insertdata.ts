import { z } from "zod";
import { chatsSchema, diariesSchema, diaryTagsSchema, userSchema } from "~/lib/schemas";
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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月は0始まりなので+1する
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // フォーマットした日時文字列を返す
    const dateString = `${year}/${month}/${day} ${hours}:${minutes}`;
    const diaryData: z.infer<typeof diariesSchema> = {
      userId: userId,
      title: dateString,
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

export async function initializeChat(diaryId: string, mode: number, userMessage: string) {
  try {
    if (diaryId == null || userMessage ==null) throw new Error("Invalid option data");
    const chatData: z.infer<typeof chatsSchema> = {
      diaryId: diaryId,
      mode: mode,
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

export async function createTag(name: string) {
  try {
    if (name ==null) throw new Error("Invalid option data");
    const create = await db.tags.create({
      data: { name: name },
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function connectDiaryTag(diaryId: string, tagId: string) {
  try {
    if (diaryId == null || tagId ==null) throw new Error("Invalid option data");
    const tagData: z.infer<typeof diaryTagsSchema> = {
      diaryId: diaryId,
      tagId: tagId
    };
    const create = await db.diaryTags.create({
      data: tagData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}
