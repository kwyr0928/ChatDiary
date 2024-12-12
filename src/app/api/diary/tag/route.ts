import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteTagSchema } from "~/lib/schemas";
import { deleteTags } from "~/server/service/delete";
import { getRecentTagNamesByUserId } from "~/server/service/fetch";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ
    const { names } = deleteTagSchema.parse(await req.json()); //body

    const nameArray = z.array(z.string()).parse(names);
    const deleted = await deleteTags(userId, nameArray);
    
    return NextResponse.json({
      message: "delete tag successfully",
    });
  } catch (error) {
    console.error("Error in DELETE tag request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ

    // タグ一覧取得
    const getTagNames = await getRecentTagNamesByUserId(userId);
    if(getTagNames==null) throw new Error("err in getRecentTagNamesByUserId");
    return NextResponse.json({
      message: "get tag successfully",
      tagList: getTagNames
    });
  } catch (error) {
    console.error("Error in GET tag request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
