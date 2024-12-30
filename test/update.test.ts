import { returnedChat, updateDiary } from "~/server/repository/updatedata";
import {
  createAnalysesFB,
  createNewUser,
  initializeChat,
  initializeDiary,
} from "~/server/service/create";
import { updateAnalysesFB } from "~/server/service/update";

describe("returnedChat", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const diary = await initializeDiary(user?.id as unknown as string);

    const message = "今日はドーナツを食べました";
    const chat = await initializeChat(
      diary?.id as unknown as string,
      0,
      message,
    );

    const aiMessage = "誰と食べたんですか？";
    const updated = await returnedChat(
      chat?.id as unknown as string,
      aiMessage,
    );
    expect(updated).not.toBeNull();
    expect(updated?.id).toBe(chat?.id as unknown as string); //cuidの形式
    expect(updated?.response).toBe(aiMessage);
  });
});

describe("updateDiary", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const diary = await initializeDiary(user?.id as unknown as string);

    const summary = "新たな要約";
    const updated = await updateDiary(
      diary?.id as unknown as string,
      summary,
      true,
    );
    expect(updated).not.toBeNull();
    expect(updated?.id).toBe(diary?.id as unknown as string);
    expect(updated?.summary).toBe(summary);
    expect(updated?.isPublic).toBe(true);
  });
});

describe("updateAnalysesFB", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const createFB = await createAnalysesFB(user?.id as unknown as string);

    const updated = await updateAnalysesFB(user?.id as unknown as string);
    expect(updated).not.toBeNull();
    expect(updated?.id).toBe(createFB?.id as unknown as string);
  });
});
