import { describe, expect, test } from "vitest";
import { add } from "~/lib/templete";
import { createNewUser } from "~/server/service/create";

describe("add", () => {
  test("addが正常に動作すること", async () => {
    expect(add(1,2)).toBe(3); //.resolves.toEqual(2);
  });

  // test("空のタイトルでは、addTodoが失敗すること", async () => {
  //   const newTodo = { title: "" };
  //   await expect(add(1,-1)).rejects.toThrow();
  // });
});

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
    const sameuser = await createNewUser(email, hashedPassword);
    await expect(createNewUser(email, hashedPassword)).resolves.toBeNull();
  });
});
