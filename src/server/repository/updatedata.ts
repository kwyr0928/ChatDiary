import { chatsSchema, diariesSchema, tagsSchema, userSchema } from "~/lib/schemas";
import { db } from "../db";

export async function registerEmail(email: string) {
  try {
    if (email == null) throw new Error("Invalid option data");
    const update = await db.user.update({
      where: {email: email, emailVerified: null},
      data: {emailVerified: new Date()},
    });
    const parsedUpdata = userSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

export async function updateDiary(diaryId: string, summary: string, isPublic: boolean) {
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

export async function updateRecentTag(tagId: string) {
  try {
    if (tagId==null) throw new Error("Invalid option data");
    const update = await db.tags.update({
      where: {id: tagId},
      data: {
        updated_at: new Date(),
        },
    });
    const parsedUpdata = tagsSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateAnalyses(userId: string, text: string) {
  try {
    if (text==null) throw new Error("Invalid option data");
    const update = await db.analyses.update({
      where: { userId: userId },
      data: {
        text: text
      },
    });
    return update;
  } catch (error) {
    console.error(error);
    return null;
  }
}
