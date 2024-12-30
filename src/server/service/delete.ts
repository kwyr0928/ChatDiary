import { type z } from "zod";
import { tagsSchema } from "~/lib/schemas";
import { deleteTag, deleteTagConnection } from "../repository/deletedata";
import { getTagByName } from "../repository/getdata";

export async function deleteTags(userId: string, tagNames: string[]) {
  try {
    if (userId == null || tagNames.length == 0)
      throw new Error("Invalid option data");
    const deleted: z.infer<typeof tagsSchema>[] = [];
    for (const name of tagNames) {
      const tag = await getTagByName(userId, name);
      if (tag == null) throw new Error("err in getTagByName");
      const deletedTag = await deleteTag(tag.id as unknown as string);
      if (deleteTag == null) throw new Error("err in deleteTag");
      deleted.push(tagsSchema.parse(deletedTag));
    }
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTagConnectionsByName(
  userId: string,
  diaryId: string,
  tagNames: string[],
) {
  try {
    if (userId == null || diaryId == null || tagNames.length == 0)
      throw new Error("Invalid option data");
    const deleted: z.infer<typeof tagsSchema>[] = [];
    for (const name of tagNames) {
      const tag = await getTagByName(userId, name);
      if (tag == null) throw new Error("err in getTagByName");
      const deletedTag = await deleteTagConnection(
        diaryId,
        tag.id as unknown as string,
      );
      if (deleteTag == null) throw new Error("err in deleteTagConnection");
      deleted.push(tagsSchema.parse(deletedTag));
    }
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}
