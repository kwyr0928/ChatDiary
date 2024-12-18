import { Diaries } from '@prisma/client';
import { z } from 'zod';
import { analysesSchema, chatsSchema, continuationSchema, diariesSchema, diaryTagsSchema, monthlySummariesSchema, safeUserSchema, tagsSchema, userSchema } from '~/lib/schemas';
import { db } from "../db";

export const getVerifiedUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email, emailVerified: { not: null } }

    });
    if(user==null) throw new Error("user not found");
    const parsedUser = userSchema.parse(user);
    return parsedUser;
  } catch (error) {
    console.error("Error in getVerifiedUserByEmail:", error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email }

    });
    if(user==null) throw new Error("user not found");
    const parsedUser = userSchema.parse(user);
    return parsedUser;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};

export const getUserByUserID = async (userId: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if(user==null) throw new Error("user not found");
    const parsedUser = safeUserSchema.parse(user);
    return parsedUser;
  } catch (error) {
    console.error("Error in getUserByUserID:", error);
    return null;
  }
};

////////////////////////////////

export const getDiariesByUserId = async (userId: string) => {
  try {
    const data = await db.diaries.findMany({
      where: { userId: userId },
      orderBy: { created_at: 'asc' },
    });
    if(data == null) return [];
    return z.array(diariesSchema).parse(data);
  } catch (error) {
    console.error("Error in getDiariesByUserId:", error);
    return null;
  }
};

export const getDateDiariesByUserId = async (userId: string, start: Date, end: Date) => {
  try {
    const data = await db.diaries.findMany({
      where: {
        userId: userId,
        created_at: {
          gte: start, // 開始日以上
          lte: end,   // 終了日以下
        },
      },
      orderBy: { created_at: 'asc' },
    });
    if(data == null) return [];
    return z.array(diariesSchema).parse(data);
  } catch (error) {
    console.error("Error in getDiariesByUserId:", error);
    return null;
  }
};

export const getDiaryData = async (diaryId: string) => {
  try {
    const data = await db.diaries.findUnique({ where: { id: diaryId } });
    if(data == null) throw new Error("diary not found");
    return diariesSchema.parse(data);
  } catch (error) {
    console.error("Error in getDiaryData:", error);
    return null;
  }
};

export const getChatCounts = async (diaryId: string) => {
  try {
    const count = await db.chats.count({ where: { diaryId: diaryId } });
    if(count == null || count == 0) throw new Error("chats not found");
    return z.number().parse(count);
  } catch (error) {
    console.error("Error in getChatCounts:", error);
    return null;
  }
};

export const getChatsByDiaryId = async (diaryId: string) => {
  try {
    const data = await db.chats.findMany({
      where: { diaryId: diaryId },
      orderBy: { created_at: 'asc' },
    });
    if(data == null) return [];
    return z.array(chatsSchema).parse(data);
  } catch (error) {
    console.error("Error in getChatsByDiaryId:", error);
    return null;
  }
};

export const getOtherUserDiaryData = async (userId: string) => {
  const data = await db.$queryRawUnsafe<Diaries[]>(
    `SELECT * FROM "Diaries" WHERE "userId" <> $1 AND "isPublic" = $2 ORDER BY RANDOM() LIMIT 1;`,
    userId,
    true
  );
  if(data == null) return null;
  return diariesSchema.parse(data[0]);
};

////////////////////////////////

export const getHistoryData = async (diaryId: string) => {
  try {
    const count = await db.chats.findMany({
      where: { diaryId: diaryId },
      orderBy: { created_at: 'asc'}
    });
    if(count == null) throw new Error("chats not found");
    return z.array(chatsSchema).parse(count);
  } catch (error) {
    console.error("Error in getHistoryData:", error);
    return null;
  }
};

export const getTagByName = async (userId: string, name: string) => {
  const data = await db.tags.findFirst({ where: { name, userId } });
  if(data == null) {
    return null;
  }
  return tagsSchema.parse(data);
};

export const getTagByID = async (tagId: string) => {
  try {
    const data = await db.tags.findUnique({
      where: { id: tagId }
    });
    if(data == null) throw new Error("tags not found");
    return tagsSchema.parse(data);
  } catch (error) {
    console.error("Error in getTagByID:", error);
    return null;
  }
};

export const getTagsByUserId = async (userId: string) => {
  try {
    const data = await db.tags.findMany({ where: { userId } });
    if(data == null) throw new Error("tags not found");
    return z.array(tagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getTagsByUserId:", error);
  }
};

export const getRecentTagsByUserId = async (userId: string) => {
  try {
    const data = await db.tags.findMany({
      where: { userId },
      orderBy: { updated_at: 'desc'},
      take: 3,
    });
    if(data == null) throw new Error("tags not found");
    return z.array(tagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getRecentTagsByUserId:", error);
  }
};

export const getTagConnectionsByDiary = async (diaryId: string) => {
  try {
    const data = await db.diaryTags.findMany({ where: { diaryId } });
    if(data == null) return [];
    return z.array(diaryTagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getTagConnectionsByDiary:", error);
    return null;
  }
};

export const getTagConnectionsByTag = async (diaryId: string, tagId: string) => {
  try {
    const data = await db.diaryTags.findMany({ where: { diaryId, tagId } });
    if(data == null) return [];
    return z.array(diaryTagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getTagConnectionsByTag:", error);
    return null;
  }
};

/////////////////////////////

export const getMonthlyFeedBack = async (userId: string, month: number) => {
  try {
    const data = await db.monthlySummaries.findFirst({ where: { userId, month } });
    if(data == null) return null;
    return monthlySummariesSchema.parse(data);
  } catch (error) {
    console.error("Error in getMonthlyFeedBack:", error);
    return null;
  }
};

export const getAnalysesFeedBack = async (userId: string) => {
  try {
    const data = await db.analyses.findFirst({ where: { userId } });
    if(data == null) return null;
    return analysesSchema.parse(data);
  } catch (error) {
    console.error("Error in getAnalysesFeedBack:", error);
    return null;
  }
};

export const getTodayContinuation = async (userId: string, day: number) => {
  try {
    const data = await db.continuation.findFirst({
      where: { userId, day }
    });
    if(data == null) return null;
    return continuationSchema.parse(data);
  } catch (error) {
    console.error("Error in getTodayContinuation:", error);
    return null;
  }
};
