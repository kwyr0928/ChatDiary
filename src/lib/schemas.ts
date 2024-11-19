// 構造体定義ファイル
import { z } from "zod";

/*
  スキーマへ与えるデータの構造体
*/
export const user = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  email: z.string().min(3),
  passward: z.string().min(1), //TODO: 暗号化する
  created_at: z.date().optional(),
});

export const diaries = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  isPublic: z.boolean(),
  created_at: z.date().optional(),
});

export const chats = z.object({
  id: z.string().min(1).optional(),
  diaryId: z.string().min(1),
  message: z.string().min(1), // userの送信
  response: z.string().min(1), // AIからの質問
  created_at: z.date().optional(),
});

export const tags = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  created_at: z.date().optional(),
});

export const diaryTags = z.object({
  id: z.string().min(1).optional(),
  tagId: z.string().min(1),
});

export const monthlySummaries = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  month: z.number(),
  name: z.string().min(1),
  created_at: z.date().optional(),
});

export const analyses = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  text: z.string().min(1),
  created_at: z.date().optional(),
});


/*
  POST/PUTデータの構造体
*/



/*
  GETデータの構造体
*/
