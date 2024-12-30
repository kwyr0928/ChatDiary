import { NextResponse } from "next/server";
import { putTheme } from "~/lib/schemas";
import { auth } from "~/server/auth";
import { updateUserTheme } from "~/server/repository/updatedata";

export async function PUT(req: Request) {
  try {
    const { theme } = putTheme.parse(await req.json()); //body

    const session = await auth();
    if (session == null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;

    const updated = await updateUserTheme(userId, theme);
    if (updated == null) throw new Error("err in updateUserTheme");

    return NextResponse.json({
      message: "update theme successfully",
      theme: updated?.theme,
    });
  } catch (error) {
    console.error("Error in UPDATE theme request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
