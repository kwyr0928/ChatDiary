import { getMonthlyFeedBack, getRecentTagsByUserId } from "../repository/getdata";

export const getRecentTagNamesByUserId = async (userId: string) => {
  try {
    const diaryTagDatas = await getRecentTagsByUserId(userId);
    if(diaryTagDatas==null) throw new Error("err in getRecentTagsByUserId");
    const tagNames: string[] = [];
    for(const tag of diaryTagDatas){
      tagNames.push(tag.name);
    }
    return tagNames;
  } catch (error) {
    console.error("Error in getRecentTagNamesByUserId:", error);
    return null;
  }
}

export const getLastMonthFB = async (userId: string, now: Date) => {
  try {
    const year = now.getFullYear();
    const month = now.getMonth();
    // 先月の計算
    const prevMonth = month === 0 ? 11 : month - 1; // 12月の場合は11月へ
    const prevYear = month === 0 ? year - 1 : year; // 12月の場合は前年へ

    // YYYYMM形式で返すために結合
    const target = prevYear * 100 + (prevMonth + 1); // 月は0ベースなので +1 して調整
    const fb = await getMonthlyFeedBack(userId, target);
    if(fb==null) return null

    return fb;
  } catch (error) {
    console.error("Error in getRecentTagNamesByUserId:", error);
    return null;
  }
}
