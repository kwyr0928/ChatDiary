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

describe("user test", () => {
  test("create user", async () => {
    await expect(createNewUser("s.oufflesumire03@gmail.com", "hashedPassword")).resolves.not.toBeNull();
  });
});
