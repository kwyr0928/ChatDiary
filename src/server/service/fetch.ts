import { getRecentTagsByUserId } from "../repository/getdata";

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
  }
}
