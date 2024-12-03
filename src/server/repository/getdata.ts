import { z } from 'zod';
import { chatsSchema, diariesSchema, diaryTagsSchema, safeUserSchema, tagsSchema, userSchema } from '~/lib/schemas';
import { db } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
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
    if(data == null) throw new Error("diary not found");
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
    if(data == null) throw new Error("chats not found");
    return z.array(chatsSchema).parse(data);
  } catch (error) {
    console.error("Error in getChatsByDiaryId:", error);
    return null;
  }
};

export const getOtherUserDiaryData = async (userId: string) => {
  const data = await db.diaries.findFirst({
    where: {
      isPublic: true,
      NOT: {userId: userId}
    },
  });
  if(data == null) return null;
  return diariesSchema.parse(data);
};

////////////////////////////////

export const getTagByUserId = async (diaryId: string) => {
  try {
    const data = await db.diaryTags.findMany({ where: { diaryId } });
    if(data == null) throw new Error("tags not found");
    return z.array(diaryTagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getTagConnectionsByDiary:", error);
    return null;
  }
};

export const getTagByName = async (name: string) => {
  const data = await db.tags.findFirst({ where: { name } });
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

export const getTagConnectionsByDiary = async (diaryId: string) => {
  try {
    const data = await db.diaryTags.findMany({ where: { diaryId } });
    if(data == null) throw new Error("tags not found");
    return z.array(diaryTagsSchema).parse(data);
  } catch (error) {
    console.error("Error in getTagConnectionsByDiary:", error);
    return null;
  }
};
