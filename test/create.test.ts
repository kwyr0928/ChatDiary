import { createNewUser } from "~/server/service/create";

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
    const email = "yyy@gmail.com";
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
    expect(user).not.toBeNull();
    expect(user?.id).toMatch(/^c[a-z0-9]{24}$/); //cuidの形式
    expect(user?.email).toBe(email); // Emailが一致
    expect(user?.password).toBe(hashedPassword); // パスワードが一致
    expect(user?.emailVerified).toBeNull(); // 初期値がnull
  });
  test("異常系", async () => {
    const email = "yyy@gmail.com";
    const hashedPassword = "pass";
    const sameuser = await createNewUser(email, hashedPassword);
    await expect(createNewUser(email, hashedPassword)).resolves.toBeNull();
  });
});
