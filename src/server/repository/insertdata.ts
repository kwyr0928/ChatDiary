import { z } from "zod";
import { userSchema } from "~/lib/schemas";
import { db } from "../db";

export async function insertNewUser(userData: z.infer<typeof userSchema>	) {
  try {
    if (userData == null) throw new Error("Invalid option data");
    const create = await db.user.create({
      data: userData,
    });
    return create;
  } catch (error) {
    console.error(error);
    return null;
  }
}
