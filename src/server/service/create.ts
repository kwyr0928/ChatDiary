import { z } from "zod";
import { chatsSchema, diariesSchema, diaryTagsSchema, newTag, userSchema } from "~/lib/schemas";
import { insertChat, insertDiary, insertDiaryTag, insertNewUser, insertTag } from "../repository/insertdata";

export async function createNewUser(email: string, hashedPassword: string) {
  try {
    if (email == null || hashedPassword == null) throw new Error("Invalid option data");
    const userData = userSchema.parse({
      email: email,
      password: hashedPassword,
    });
    const create = await insertNewUser(userData);
    if(create==null) throw new Error("err in insertNewUser");

    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function initializeDiary(userId: string) {
  try {
    if (userId == null) throw new Error("Invalid option data");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月は0始まりなので+1する
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // フォーマットした日時文字列を返す
    const dateString = `${year}/${month}/${day} ${hours}:${minutes}`;
    const diaryData: z.infer<typeof diariesSchema> = {
      userId: userId,
      title: dateString,
      summary: "出力結果",
      isPublic: false,
    };
    
    const created = await insertDiary(diaryData);
    if(created==null) throw new Error("err in insertDiary");

    return created;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function initializeChat(diaryId: string, mode: number, userMessage: string) {
  try {
    if (diaryId == null || userMessage ==null) throw new Error("Invalid option data");
    const chatData: z.infer<typeof chatsSchema> = {
      diaryId: diaryId,
      mode: mode,
      message: userMessage,
    };
    
    const created = await insertChat(chatData);
    if(created==null) throw new Error("err in insertChat");
    
    return created;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createTag(name: string, userId: string) {
  try {
    if (name ==null) throw new Error("Invalid option data");
    const tagData: z.infer<typeof newTag> = {
      name: name,
      userId: userId
    };
    const created = await insertTag(tagData);
    if(created==null) throw new Error("err in createTag");
    
    return created;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function connectDiaryTag(diaryId: string, tagId: string) {
  try {
    if (diaryId == null || tagId ==null) throw new Error("Invalid option data");
    const diaryTagsData: z.infer<typeof diaryTagsSchema> = {
      diaryId: diaryId,
      tagId: tagId
    };
    const created = await insertDiaryTag(diaryTagsData);
    if(created==null) throw new Error("err in insertDiaryTag");
    
    return created;
  } catch (error) {
    console.error(error);
    return null;
  }
}

