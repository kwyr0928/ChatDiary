//ログアウト処理POST
import { NextResponse } from "next/server";
import { logout } from "~/lib/actions";
import { handlers } from "~/server/auth";

export const { GET } = handlers;

export const POST = async () => {
  await logout();

  return NextResponse.json({
    message: "sign out successfully",
  });
};
