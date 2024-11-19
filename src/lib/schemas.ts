// 構造体定義ファイル
// Route Handler
import { z } from "zod";

/*
  スキーマへ与えるデータの構造体
*/
export const user = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  email: z.string().email(),
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
  POST/PUTデータの構造体 - アカウント関連
*/

// /api/user/signup
export const postSignup = z.object({
  email: z.string().email(),
  passward: z.string().min(1),
});

// /api/user/signin
export const postSignin = z.object({
  email: z.string().email(),
  passward: z.string().min(1),
});

// /api/user/signout
export const postSignout = z.object({
  userId: z.string(),
});

// api/user/remail
export const postReEmail = z.object({
  email: z.string().email(),
});

/*
  POST/PUTデータの構造体 - 日記関連
*/

// api/diary/[id]
export const putDiary = z.object({
  tags: z.array(z.number()),
  text: z.string(),
  isPublish: z.boolean()
});

// api/chat
export const postChat = z.object({
  userId: z.string(),
});

// api/chat/[id]
export const putChat = z.object({
  mode: z.number(),
});

// api/chat/[id]/send
export const postSendChat = z.object({
  mode: z.number(),
});

// api/diary/[id]/new
export const postDiary = z.object({
  mode: z.number(),
});

/*
  GETデータの構造体
*/
