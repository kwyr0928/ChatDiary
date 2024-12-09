import { NextResponse } from "next/server";
import { postReEmail } from "~/lib/schemas";
import { registerEmail } from "~/server/repository/updatedata";

export async function PUT(req: Request) {
  try {
    const { email } = postReEmail.parse(await req.json()); //body

    const registered = await registerEmail(email);
    if(registered==null) throw new Error("err in registerEmail");

    return NextResponse.json({
      message: "register email successfully",
    });
  } catch (error) {
    console.error("Error in PUT register request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
