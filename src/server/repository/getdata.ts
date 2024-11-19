import { user as zUser } from '~/lib/schemas';
import { db } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return zUser.parse(user);
  } catch (error) {
    return null;
  }
};
