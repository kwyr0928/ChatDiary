import { NextResponse } from "next/server";
import { z } from "zod";
import { postDiary } from "~/lib/schemas";
import { getTagByName } from "~/server/repository/getdata";
import { connectDiaryTag, createTag } from "~/server/repository/insertdata";
import { createdDiary } from "~/server/repository/updatedata";

// チャット後の日記作成
export async function POST(req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const diaryId = z.string().parse(par.id); //パスパラメータ
    const { summary, tags, isPublic } = postDiary.parse(await req.json()); //body

    const updatedDiary = await createdDiary(diaryId, summary, isPublic);
    if(updatedDiary==null) throw new Error("err in getDiaryData");

    //タグの紐づけ
    for (const tag of tags) {
      const tagData = await getTagByName(tag);
      let tagId = "";
      if(tagData==null){
        // 新しいタグ生成
        const newTag = await createTag(tag);
        if(newTag==null) throw new Error("err in createTag");
        tagId = newTag.id;
      } else {
        tagId = tagData.id!;
      }
      //紐づけ
      const newConnection = await connectDiaryTag(diaryId, tagId);
    }
    return NextResponse.json({
      message: "create diary successfully",
      diaryData: updatedDiary,
    });
  } catch (error) {
    console.error("Error in POST diary/new request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
