import { createAnalysesFB, createContinuation, createMonthlyFB, createNewUser, createTag, initializeChat, initializeDiary } from "~/server/service/create";

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
    
    const diary = await initializeDiary(user?.id as unknown as string);
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

describe("createMonthlyFB", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const fb = await createMonthlyFB(user?.id as unknown as string, 202411);
    expect(fb).not.toBeNull();
    expect(fb?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(fb?.month).toBe(202411);
  });
});

describe("createAnalysesFB", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const fb = await createAnalysesFB(user?.id as unknown as string);
    expect(fb).not.toBeNull();
    expect(fb?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
  });
});

describe("createContinuation", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    await initializeDiary(user?.id as unknown as string);
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 月は0ベース
    const day = today.getDate();
    // YYYYMMDD形式
    const target = year*10000 + (month+1)*100 + day; // 月は0ベースなので+1して調整

    const continuation = await createContinuation(user?.id as unknown as string, today);
    expect(continuation).not.toBeNull();
    expect(continuation?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(continuation?.day).toBe(target);
    expect(continuation?.done).toBe(true);
  });
  test("正常系-既にdone", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    await initializeDiary(user?.id as unknown as string);
    
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 月は0ベース
    const day = today.getDate();
    // YYYYMMDD形式
    const target = year*10000 + (month+1)*100 + day; // 月は0ベースなので+1して調整

    const done = await createContinuation(user?.id as unknown as string, today);
    const continuation = await createContinuation(user?.id as unknown as string, today);
    expect(continuation).not.toBeNull();
    expect(continuation?.id).toMatch(done?.id as unknown as string); //cuidの形式
    expect(done?.day).toBe(target);
    expect(continuation?.done).toBe(true);
  });
});
