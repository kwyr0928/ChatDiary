import { createNewUser, createTag, initializeDiary } from "~/server/service/create";
import { getRecentTagNamesByUserId } from "~/server/service/fetch";

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
