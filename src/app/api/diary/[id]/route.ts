// 特定の日記の詳細GET
// タグ、本文、公開範囲更新のPUT
// 日記削除DELETE

import { NextResponse } from "next/server";
import { z } from "zod";
import { getDiaryData } from "~/server/repository/getdata";

export async function GET(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ

    const diaryData = await getDiaryData(diaryId);
    if(diaryData==null) throw new Error("err in getDiaryData");
    
    return NextResponse.json({
      message: "get diary successfully",
    });
  } catch (error) {
    console.error("Error in GET diary/id request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
