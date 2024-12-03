import { db } from "../db";

export async function deleteUser(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    const deleted = await db.user.delete({
      where: {
        id: userId,
      },
    });
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}
