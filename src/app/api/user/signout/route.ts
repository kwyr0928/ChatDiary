//ログアウト処理POST
import { NextResponse, type NextRequest } from "next/server";
import { logout } from "~/lib/actions";
import { handlers } from "~/server/auth";

export const { GET } = handlers;

export const POST = async (req: NextRequest) => {
  await logout();
  
  return NextResponse.json({
    message: "sign out successfully",
  });
};
