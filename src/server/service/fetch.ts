import { getShare } from "~/lib/schemas";
import { getDateDiariesByUserId, getMonthlyFeedBack, getOtherUserDiaryData, getRecentTagsByUserId, getTodayContinuation } from "../repository/getdata";

export const getRecentTagNamesByUserId = async (userId: string) => {
  try {
    const diaryTagDatas = await getRecentTagsByUserId(userId);
    if (diaryTagDatas == null) return [];
    const tagNames: string[] = [];
    for (const tag of diaryTagDatas) {
      tagNames.push(tag.name);
    }
    return tagNames;
  } catch (error) {
    console.error("Error in getRecentTagNamesByUserId:", error);
    return null;
  }
}

export const getLastMonthFB = async (userId: string, target: number) => {
  try {
    const fb = await getMonthlyFeedBack(userId, target);
    if (fb == null) return null

    return fb;
  } catch (error) {
    console.error("Error in getRecentTagNamesByUserId:", error);
    return null;
  }
}

export const getMonthlyContinuation = async (userId: string, today: Date) => {
  try {
    const year = today.getFullYear(); // 年を取得
    const month = today.getMonth() + 1; // 月を取得（0-basedなので +1）
    const day = today.getDate(); // 今日の日を取得

    const ret = [];

    for (let i = 1; i <= day; i++) {
      const target = year * 10000 + month * 100 + i;
      const continuation = await getTodayContinuation(userId, target);
      if (continuation == null) {
        ret.push(false);
      } else {
        ret.push(true);
      }
    }

    return ret;
  } catch (error) {
    console.error("Error in getMonthlyContinuation:", error);
    return null;
  }
}

export const getOtherUserDiary = async (userId: string) => {
  try {
    const diary = await getOtherUserDiaryData(userId);
    if (diary == null) return null

    return getShare.parse(diary);
  } catch (error) {
    console.error("Error in getOtherUserDiary:", error);
    return null;
  }
}

export const getMonthlyDiariesByUserId = async (userId: string, yearMonth: number) => {
  try {
    const year = Math.floor(yearMonth / 100); // 上位4桁が年
    const month = yearMonth % 100; // 下位2桁が月

    // 開始日と終了日を計算
    const startDate = new Date(year, month - 1, 1); // 月は0-basedなので-1
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // 月末日を計算
    const diary = await getDateDiariesByUserId(userId, startDate, endDate);
    if (diary == null) return null

    return getShare.parse(diary);
  } catch (error) {
    console.error("Error in getOtherUserDiary:", error);
    return null;
  }
}
