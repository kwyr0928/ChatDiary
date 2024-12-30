// 構造体定義ファイル
// Route Handler
import { z } from "zod";

// モード
export const modeList = {
  detail: 0,
  personality: 1,
};

/*
  スキーマへ与えるデータの構造体
*/
export const userSchema = z.object({
  id: z.string().min(1).optional(),
  emailVerified: z.date().nullable().optional(),
  email: z.string().email(),
  password: z.string().min(1),
  theme: z.number().optional(),
  created_at: z.date().optional(),
});

export const safeUserSchema = z.object({
  id: z.string().min(1).optional(),
  emailVerified: z.date().nullable().optional(),
  email: z.string().email(),
  theme: z.number().optional(),
  created_at: z.date().optional(),
});

export const diariesSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  isPublic: z.boolean(),
  created_at: z.date().optional(),
});

export const chatsSchema = z.object({
  id: z.string().min(1).optional(),
  diaryId: z.string().min(1),
  mode: z.number(),
  message: z.string().min(1), // userの送信
  response: z.string().min(1).nullable().optional(), // AIからの質問
  created_at: z.date().optional(),
});

export const tagsSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  name: z.string().min(1),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const diaryTagsSchema = z.object({
  diaryId: z.string().min(1),
  tagId: z.string().min(1),
});

export const monthlySummariesSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  month: z.number(),
  text: z.string().min(1),
  created_at: z.date().optional(),
});

export const analysesSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  text: z.string().min(1),
  created_at: z.date().optional(),
});

export const continuationSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  day: z.number(),
  done: z.boolean(),
});

/////////////

export const chatLogSchema = z.object({
  message: z.string().min(1), // userの送信
  response: z.string().min(1).nullable().optional(), // AIからの質問
});

/////////////

/*
  POST/PUTデータの構造体 - アカウント関連
*/

// /api/user/signup
export const postSignup = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください。",
  }),
  password: z.string().min(1, {
    message: "パスワードを入力してください。",
  }),
});

// /api/user/signin
export const postSignin = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください。",
  }),
  password: z.string().min(1, {
    message: "パスワードを入力してください。",
  }),
});

// api/user/remail
export const postReEmail = z.object({
  userId: z.string(),
  email: z.string().email(),
});

// api/user/theme
export const putTheme = z.object({
  theme: z.number(),
});

/*
  POST/PUTデータの構造体 - 日記関連
*/

// api/user/register
export const putResister = z.object({
  token: z.string(),
});

// api/chat/[id]/send
export const postSendChat = z.object({
  mode: z.number(),
  text: z.string(),
});

// api/diary/[id] PUT
// api/diary/[id]/new
export const putDiary = z.object({
  tags: z.array(z.string()),
  summary: z.string(),
  isPublic: z.boolean(),
});

export const newTag = z.object({
  name: z.string(),
  userId: z.string(),
});

export const deleteTagSchema = z.object({
  names: z.array(z.string()),
});

/*
  GETデータの構造体
*/

export const getSummary = z.object({
  summary: z.string(),
});

// api/user/[id]
export const getEmail = z.object({
  email: z.string().email(),
});

// api/diary
export const diaryAndTagSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  summary: z.string().min(1).optional(),
  isPublic: z.boolean(),
  created_at: z.date().optional(),
  tags: z.array(z.string()),
});
