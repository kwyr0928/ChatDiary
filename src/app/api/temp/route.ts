import { NextResponse } from "next/server";
import { z } from "zod";
import { postSignup } from "~/lib/schemas";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ

    return NextResponse.json({
      message: "get xxx successfully",
    });
  } catch (error) {
    console.error("Error in GET xxx request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, password } = postSignup.parse(await req.json()); //body

    return NextResponse.json({
      message: "create xxx successfully",
    });
  } catch (error) {
    console.error("Error in POST xxx request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = z.string().parse(searchParams.get("userId")); //クエリパラメータ
    
    return NextResponse.json({
      message: "delete xxx successfully",
    });
  } catch (error) {
    console.error("Error in DELETE xxx request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
