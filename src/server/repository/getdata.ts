import { userSchema } from '~/lib/schemas';
import { db } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    const parsedUser = userSchema.parse(user);
    return parsedUser;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    return null;
  }
};
