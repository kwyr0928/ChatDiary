import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteUser } from "~/server/repository/deletedata";

// 退会処理DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const userId = z.string().parse(par.id); //パスパラメータ
    console.log(userId);
    const deleted = await deleteUser(userId);
    return NextResponse.json({
      message: "delete user successfully. email:" + deleted?.email,
    });
  } catch (error) {
    console.error("Error in DELETE user request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
