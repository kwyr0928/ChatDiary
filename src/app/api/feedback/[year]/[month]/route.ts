// 先月のFB、分析、継続状況GET

import { NextResponse } from "next/server";
import { z } from "zod";
import { getAnalysesFeedBack, getDiariesByUserId } from "~/server/repository/getdata";
import { createAnalysesFB, createMonthlyFB } from "~/server/service/create";
import { getLastMonthFB, getMonthlyContinuation } from "~/server/service/fetch";
import { updateAnalysesFB } from "~/server/service/update";

export async function GET(
  req: Request,
  { params }: { params: { year: string, month: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const year = parseInt(par.year); //パスパラメータ
    const month = parseInt(par.month); //パスパラメータ
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ
    if (userId == null) throw new Error("userId query is required");

    const target = year * 100 + month;
    // 先月のDB
    let lastMonthFBData = await getLastMonthFB(userId, target);
    let lastMonthFB = lastMonthFBData?.text;
    const diaries = await getDiariesByUserId(userId);
    if (diaries == null) throw new Error("err in getDiariesByUserId");
    if (lastMonthFBData == null) {
      if (diaries.length != 0) {
        //FB生成
        const created = await createMonthlyFB(userId, target);
        lastMonthFBData = created;
        lastMonthFB = lastMonthFBData?.text;
      } else {
        lastMonthFB = "日記を書いてね！"
      }
    }

    // 全体分析
    let analysesFBData = await getAnalysesFeedBack(userId);
    let analysesFB = analysesFBData?.text;
    const limit = new Date();
    limit.setMonth(new Date().getMonth() - 1);
    if (analysesFBData == null) {
      if (diaries.length != 0) {
        //分析FB生成
        analysesFBData = await createAnalysesFB(userId);
        analysesFB = analysesFBData?.text;
      } else {
        analysesFB = "日記を書いてね！";
      }
    } else if (analysesFBData.created_at! < limit) {
      //分析FB生成
      analysesFBData = await updateAnalysesFB(userId);
      analysesFB = analysesFBData?.text;
    }

    // 継続情報
    const continuation = await getMonthlyContinuation(userId, new Date());
    if (continuation == null || continuation.length == 0) throw new Error("err in getMonthlyContinuation");

    return NextResponse.json({
      message: "get " + year + "/" + month + " feedback successfully",
      monthly: lastMonthFB,
      analyses: analysesFB,
      continuation: continuation,
    });
  } catch (error) {
    console.error("Error in GET feedback request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
