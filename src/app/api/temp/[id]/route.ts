import { NextResponse } from "next/server";
import { z } from "zod";
import { postSignup } from "~/lib/schemas";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const par = await params;
    const itemId = z.string().safeParse(par.id); //パスパラメータ
    const { email, password } = postSignup.parse(await req.json()); //body

    return NextResponse.json({
      message: "update xxx successfully",
    });
  } catch (error) {
    console.error("Error in UPDATE xxx request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
