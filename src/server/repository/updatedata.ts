import { chatsSchema } from "~/lib/schemas";
import { db } from "../db";

export async function returnedChat(chatId: string, aiMessage: string) {
  try {
    if (chatId == null || aiMessage ==null) throw new Error("Invalid option data");
    const update = await db.chats.update({
      where: {id: chatId},
      data: {response: aiMessage},
    });
    const parsedUpdata = chatsSchema.parse(update);
    return parsedUpdata;
  } catch (error) {
    console.error(error);
    return null;
  }
}
