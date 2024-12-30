import { type z } from "zod";
import {
  type analysesSchema,
  type chatsSchema,
  type continuationSchema,
  type diariesSchema,
  type diaryTagsSchema,
  type monthlySummariesSchema,
  type newTag,
  type userSchema,
} from "~/lib/schemas";
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

export async function insertDiary(diaryData: z.infer<typeof diariesSchema>) {
  try {
    if (diaryData == null) throw new Error("diaryData IS NULL");
    const create = await db.diaries.create({
      data: diaryData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertChat(chatData: z.infer<typeof chatsSchema>) {
  try {
    if (chatData == null) throw new Error("chatData IS NULL");
    const create = await db.chats.create({
      data: chatData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertTag(tagData: z.infer<typeof newTag>) {
  try {
    if (tagData == null) throw new Error("tagData IS NULL");
    const create = await db.tags.create({
      data: tagData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertDiaryTag(
  diaryTagsData: z.infer<typeof diaryTagsSchema>,
) {
  try {
    if (diaryTagsData == null) throw new Error("tagData IS NULL");
    const create = await db.diaryTags.create({
      data: diaryTagsData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertMonthlySummaries(
  monthlyData: z.infer<typeof monthlySummariesSchema>,
) {
  try {
    if (monthlyData == null) throw new Error("monthlyData IS NULL");
    const create = await db.monthlySummaries.create({
      data: monthlyData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertAnalyses(
  analysesData: z.infer<typeof analysesSchema>,
) {
  try {
    if (analysesData == null) throw new Error("analysesData IS NULL");
    const create = await db.analyses.create({
      data: analysesData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function insertContinuation(
  continuationData: z.infer<typeof continuationSchema>,
) {
  try {
    if (continuationData == null) throw new Error("continuationData IS NULL");
    const create = await db.continuation.create({
      data: continuationData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}
