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

export async function deleteDiary(diaryId: string) {
  try {
    if (diaryId == null) throw new Error("Invalid option data");
    const deleted = await db.diaries.delete({
      where: {
        id: diaryId,
      },
    });
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTag(tagId: string) {
  try {
    if (tagId == null) throw new Error("Invalid option data");
    const deleted = await db.tags.delete({
      where: {
        id: tagId,
      },
    });
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}
