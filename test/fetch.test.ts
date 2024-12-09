import { createNewUser, createTag, initializeDiary } from "~/server/service/create";
import { getTagNamesByUserId } from "~/server/service/fetch";

describe("getTagNamesByUserId", () => {
  test("正常系", async () => {
    const email = "xxx@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    
    const diary = await initializeDiary(user?.id as unknown as string);
    
    const tagName = "tag";
    await createTag(tagName, user?.id as unknown as string);
    const tagName2 = "tag2";
    await createTag(tagName2, user?.id as unknown as string);

    const getData = await getTagNamesByUserId(user?.id as unknown as string);
    expect(getData).toEqual([tagName, tagName2]);
  });
});
