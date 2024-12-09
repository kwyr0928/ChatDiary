import { describe, expect, test } from "vitest";
import { add } from "~/lib/templete";

describe("add", () => {
  test("addが正常に動作すること", async () => {
    expect(add(1,2)).toBe(3); //.resolves.toEqual(2);
  });

  // test("空のタイトルでは、addTodoが失敗すること", async () => {
  //   const newTodo = { title: "" };
  //   await expect(add(1,-1)).rejects.toThrow();
  // });
});
