import { getTodayContinuation } from "~/server/repository/getdata";
import { createContinuation, createMonthlyFB, createNewUser, createTag, initializeDiary } from "~/server/service/create";
import { getLastMonthFB, getMonthlyContinuation, getRecentTagNamesByUserId } from "~/server/service/fetch";

describe("getRecentTagNamesByUserId", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    await initializeDiary(user?.id as unknown as string);
    
    const tagName = "tag";
    await createTag(tagName, user?.id as unknown as string);
    const tagName2 = "tag2";
    await createTag(tagName2, user?.id as unknown as string);
    const tagName3 = "tag3";
    await createTag(tagName3, user?.id as unknown as string);
    const tagName4 = "tag4";
    await createTag(tagName4, user?.id as unknown as string);

    const getData = await getRecentTagNamesByUserId(user?.id as unknown as string);
    expect(getData).toEqual([tagName4, tagName3, tagName2]);
  });
});

describe("getLastMonthFB", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    const fb = await createMonthlyFB(user?.id as unknown as string, 202411);

    const getData = await getLastMonthFB(user?.id as unknown as string, 202411);
    expect(getData).not.toBeNull();
    expect(getData?.id).toBe(fb?.id as unknown as string);
    expect(fb?.month).toBe(202411);
  });
});

describe("getTodayContinuation", () => {
  test("異常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    const continuation = await getTodayContinuation(user?.id as unknown as string, 20241120);
    expect(continuation).toBeNull();
  });
});

describe("getMonthlyContinuation", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);

    await createContinuation(user?.id as unknown as string, new Date(2024, 11, 1));
    await createContinuation(user?.id as unknown as string, new Date(2024, 11, 3));
    await createContinuation(user?.id as unknown as string, new Date(2024, 11, 4));

    const continuation = await getMonthlyContinuation(user?.id as unknown as string, new Date(2024, 11, 5));
    expect(continuation).not.toBeNull();
    expect(continuation).toEqual([true, false, true, true, false]);
  });
});
