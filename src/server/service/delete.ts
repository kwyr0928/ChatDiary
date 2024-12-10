import { z } from "zod";
import { tagsSchema } from "~/lib/schemas";
import { deleteTag } from "../repository/deletedata";
import { getTagByName } from "../repository/getdata";

export async function deleteTags(userId: string, tagNames: string[]) {
  try {
    if (tagNames.length == 0) throw new Error("Invalid option data");
    const deleted: z.infer<typeof tagsSchema>[] = [];
    for(const name of tagNames) {
      const tag = await getTagByName(userId, name);
      if(tag==null) throw new Error("err in getTagByName");
      const deletedTag = await deleteTag(tag.id as unknown as string);
      if(deleteTag==null) throw new Error("err in deleteTag");
      deleted.push(tagsSchema.parse(deletedTag));
    }
    return deleted;
  } catch (error) {
    console.error(error);
    return null;
  }
}
