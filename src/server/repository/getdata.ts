import { z } from 'zod';
import { safeUserSchema, userSchema } from '~/lib/schemas';
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

export const getChatCounts = async (diaryId: string) => {
  try {
    const count = await db.chats.count({ where: { diaryId: diaryId } });
    if(count == null || count == 0) throw new Error("chats not found");
    return z.number().parse(count);
  } catch (error) {
    console.error("Error in getUserByUserID:", error);
    return null;
  }
};
