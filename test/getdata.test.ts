import { getOtherUserDiaryData, getUserByUserID } from "~/server/repository/getdata";
import { updateDiary } from "~/server/repository/updatedata";
import { createNewUser, initializeDiary } from "~/server/service/create";

describe("getOtherUserDiaryData", () => {
  test("正常系", async () => {
    const email = "aaa@gmail.com";
    const hashedPassword = "pass";
    const user = await createNewUser(email, hashedPassword);
    const diary = await initializeDiary(user?.id as unknown as string);

    const user1 = await createNewUser("bbb@gmail.com", hashedPassword);
    const diary1 = await initializeDiary(user1?.id as unknown as string);
    await updateDiary(diary1?.id as unknown as string, "summary", true);

    const user2 = await createNewUser("ccc@gmail.com", hashedPassword);
    const diary2 = await initializeDiary(user2?.id as unknown as string);
    await updateDiary(diary2?.id as unknown as string, "summary", true);

    const user3 = await createNewUser("ddd@gmail.com", hashedPassword);
    const diary3 = await initializeDiary(user3?.id as unknown as string);
    await updateDiary(diary3?.id as unknown as string, "summary", true);

    const user4 = await createNewUser("eee@gmail.com", hashedPassword);
    const diary4 = await initializeDiary(user4?.id as unknown as string);
    await updateDiary(diary4?.id as unknown as string, "summary", true);

    const user5 = await createNewUser("fff@gmail.com", hashedPassword);
    const diary5 = await initializeDiary(user5?.id as unknown as string);
    await updateDiary(diary5?.id as unknown as string, "summary", true);


    const share = await getOtherUserDiaryData(user?.id as unknown as string);
    expect(share).not.toBeNull();
    console.log((await getUserByUserID(share?.userId as unknown as string))?.email);
    expect(share?.userId).not.toBe(user?.id) //cuidの形式
    expect(share?.summary).toBe("summary");

  });
});
