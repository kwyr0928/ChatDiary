import { z } from 'zod';
import { chatsSchema, diariesSchema, safeUserSchema, tagsSchema, userSchema } from '~/lib/schemas';
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

export const getTagByName = async (name: string) => {
  const data = await db.tags.findFirst({ where: { tagName: name } });
  if(data == null) {
    return null;
  }
  return tagsSchema.parse(data);
};
