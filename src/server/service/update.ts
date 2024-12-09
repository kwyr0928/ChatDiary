import { z } from "zod";
import { analysesSchema } from "~/lib/schemas";
import { updateAnalyses } from "../repository/updatedata";

export async function updateAnalysesFB(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    // text生成
    // @TODO: にいろ
    const text = "analyses feedback";
    const analysesData: z.infer<typeof analysesSchema> = {
      userId: userId,
      text: text,
    };
    const updated = await updateAnalyses(userId, text);
    if(updated==null) throw new Error("err in updateAnalyses");
    
    return updated;
  } catch (error) {
    console.error(error);
    return null;
  }
}
