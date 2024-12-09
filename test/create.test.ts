import { createNewUser, createTag, initializeChat, initializeDiary } from "~/server/service/create";

describe("createNewUser", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    expect(user).not.toBeNull();
    expect(user?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(user?.email).toBe(email); // Emailが一致
    expect(user?.password).toBe(hashedPassword); // パスワードが一致
    expect(user?.emailVerified).toBeNull(); // 初期値がnull
  });
  test("異常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const sameUser = await createNewUser(email, hashedPassword);
    await expect(createNewUser(email, hashedPassword)).resolves.toBeNull();
  });
});

describe("initializeDiary", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
    const diary = await initializeDiary(user?.id as string);
    expect(diary).not.toBeNull();
    expect(diary?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(diary?.isPublic).toBe(false);
    expect(diary?.summary).toBe("出力結果");
  });
});

describe("initializeChat", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    const diary = await initializeDiary(user?.id as unknown as string);
    
    const message = "今日はドーナツを食べました";
    const chat = await initializeChat(diary?.id as unknown as string, 0, message);
    expect(chat).not.toBeNull();
    expect(chat?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(chat?.message).toBe(message);
  });
});

describe("createTag", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    const tagName = "tag";
    const tag = await createTag(tagName, user?.id as unknown as string);
    expect(tag).not.toBeNull();
    expect(tag?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(tag?.name).toBe(tagName);
  });
});
