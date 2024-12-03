import { chatsSchema, diariesSchema } from "~/lib/schemas";
import { db } from "../db";

export async function returnedChat(chatId: string, aiMessage: string) {
  try {
    if (chatId == null || aiMessage ==null) throw new Error("Invalid option data");
    const update = await db.chats.update({
      where: {id: chatId},
      data: {response: aiMessage},
    });
    const parsedUpdata = chatsSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function summariedDiary(diaryId: string, aiSummary: string) {
  try {
    if (diaryId == null || aiSummary ==null) throw new Error("Invalid option data");
    const update = await db.diaries.update({
      where: {id: diaryId},
      data: {summary: aiSummary},
    });
    const parsedUpdata = diariesSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createdDiary(diaryId: string, summary: string, isPublic: boolean) {
  try {
    if (diaryId==null || summary==null || isPublic==null) throw new Error("Invalid option data");
    const update = await db.diaries.update({
      where: {id: diaryId},
      data: {
        summary: summary,
        isPublic: isPublic,
        },
    });
    const parsedUpdata = diariesSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}
