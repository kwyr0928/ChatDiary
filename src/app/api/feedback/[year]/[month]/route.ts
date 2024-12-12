// 先月のFB、分析、継続状況GET

import { NextResponse } from "next/server";
import { auth } from "~/server/auth";
import { getAnalysesFeedBack } from "~/server/repository/getdata";
import { createAnalysesFB, createMonthlyFB } from "~/server/service/create";
import { getLastMonthFB, getMonthlyContinuation } from "~/server/service/fetch";
import { updateAnalysesFB } from "~/server/service/update";

export async function GET(
  { params }: { params: { year: string, month: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const year = parseInt(par.year); //パスパラメータ
    const month = parseInt(par.month); //パスパラメータ
    const session = await auth();
    if(session==null) {
      return NextResponse.json(
        { error: "can't get login session." },
        { status: 401 },
      );
    }
    const userId = session?.user.id;
    if(userId==null) throw new Error("userId query is required");
    
    const target = year * 100 + month;
    // 先月のDB
    let lastMonthFBData = await getLastMonthFB(userId, target);
    let lastMonthFB = lastMonthFBData?.text;
    if(lastMonthFBData==null){
      //FB生成
      const created = await createMonthlyFB(userId, target);
      lastMonthFBData = created;
      lastMonthFB = lastMonthFBData?.text;
    }

    // 全体分析
    let analysesFBData = await getAnalysesFeedBack(userId);
    let analysesFB = analysesFBData?.text;
    const limit = new Date();
    limit.setMonth(new Date().getMonth()-1);
    if(analysesFBData==null){
      //分析FB生成
      analysesFBData = await createAnalysesFB(userId);
      analysesFB = analysesFBData?.text;
    } else if(analysesFBData.created_at! < limit){
      //分析FB生成
      analysesFBData = await updateAnalysesFB(userId);
      analysesFB = analysesFBData?.text;
    }

    // 継続情報
    const continuation = await getMonthlyContinuation(userId, new Date());
    if(continuation==null || continuation.length==0) throw new Error("err in getMonthlyContinuation");

    return NextResponse.json({
      message: "get "+year+"/"+month+" feedback successfully",
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
