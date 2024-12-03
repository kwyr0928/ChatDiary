// 構造体定義ファイル
// Route Handler
import { z } from "zod";

/*
  スキーマへ与えるデータの構造体
*/
export const userSchema = z.object({
  id: z.string().min(1).optional(),
  emailVerified: z.date().nullable().optional(),
  email: z.string().email(),
  password: z.string().min(1),
  created_at: z.date().optional(),
});

export const safeUserSchema = z.object({
  id: z.string().min(1).optional(),
  emailVerified: z.date().nullable().optional(),
  email: z.string().email(),
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
  message: z.string().min(1), // userの送信
  response: z.string().min(1), // AIからの質問
  created_at: z.date().optional(),
});

export const tagsSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  created_at: z.date().optional(),
});

export const diaryTagsSchema = z.object({
  id: z.string().min(1).optional(),
  tagId: z.string().min(1),
});

export const monthlySummariesSchema = z.object({
  id: z.string().min(1).optional(),
  userId: z.string().min(1),
  month: z.number(),
  name: z.string().min(1),
  created_at: z.date().optional(),
});

export const analysesSchema = z.object({
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
  email: z.string().email({
    message: 'メールアドレスを入力してください。',
  }),
  password: z.string().min(1, {
    message: 'パスワードを入力してください。',
  }),
});

// /api/user/signin
export const postSignin = z.object({
  email: z.string().email({
    message: 'メールアドレスを入力してください。',
  }),
  password: z.string().min(1, {
    message: 'パスワードを入力してください。',
  }),
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
  mode: z.number(),
});

// api/chat
export const postChat = z.object({
  userId: z.string(),
});

// api/chat/[id]/send
export const postSendChat = z.object({
  mode: z.number(),
  text: z.number(),
});

// api/diary/[id]/new
export const postDiary = z.object({
  tags: z.array(z.number()),
  summary: z.string(),
  isPublic: z.boolean()
});

/*
  GETデータの構造体
*/

// api/user/[id]
export const getUser = z.object({
  id: z.string().min(1).optional(),
  email: z.string().email(),
  passward: z.string().min(1), //TODO: 暗号化する
  registered: z.boolean(),
  created_at: z.date().optional(),
});

// api/diary
export const getDiaries = z.object({
  diaryIds: z.array(z.number()),
});

// api/diary/[id]
export const getDiary = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  created_at: z.date()
});

// api/chat/[id]/receive
export const getAiResponse = z.object({
  response: z.string(),
});

// api/chat/[id]/summary
export const getSummary = z.object({
  summary: z.string(),
});

// api/share
export const getShare = z.object({
  diary: z.string(),
});

// api/feedback/[year]/[month]
export const getFeedBack = z.object({
  year: z.number(),
  month: z.number(),
  monthly: z.string(),
  analysis: z.string(),
  continuation: z.array(z.array(z.boolean())) //その月だけ？過去全部？
});
