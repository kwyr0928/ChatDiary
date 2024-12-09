import { createMonthlyFB, createNewUser, createTag, initializeDiary } from "~/server/service/create";
import { getLastMonthFB, getRecentTagNamesByUserId } from "~/server/service/fetch";

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
