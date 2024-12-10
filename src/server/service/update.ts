import { z } from "zod";
import { analysesSchema } from "~/lib/schemas";
import { updateAnalyses } from "../repository/updatedata";
import { getDiariesByUserId, getDiaryData } from "../repository/getdata";

export async function updateAnalysesFB(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    // text生成
    // @TODO: にいろ
    
    // 全部の日記の本文を取得  済
    // 全文＋要約の文章をGeminiに送る（チャットじゃなくてgenerateContents？）
    
    const diaries = await getDiariesByUserId(userId);
    if(diaries==null) throw new Error("err in getDiariesByUserId");

    let diarySummaries = ""
    if(diaries.length!=0) {
      for(const diary of diaries){
        const diaryId: string = diary.id!;
        const diaryData = await getDiaryData(diaryId);
        if(diaryData==null) throw new Error("err in getDiaryData");
      
        diarySummaries += "["+diaryData.summary+"]";
      }
    }


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
