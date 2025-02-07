"use server";

import { AuthError } from "next-auth";
import { NextResponse } from "next/server";
import { type z } from "zod";
import { signIn, signOut } from "~/server/auth";
import { type userSchema } from "./schemas";

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type SignInParams = {
  email: string;
  password: string;
  redirect: boolean;
};

// export async function signUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
//   try {
//     await signUp(prevState, formData);
//   } catch (error) {
//     throw error;
//   }

//   redirect('/login');
// }

export async function login(
  prevState: string | undefined,
  formData: z.infer<typeof userSchema>,
) {
  try {
    await signIn(prevState, {
      email: formData.email,
      password: formData.password,
      redirect: false, // リダイレクトを無効化
    });
    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log(
            "Invalid credentials.メールかパスワードが違うか, 登録が完了していません.",
          );
          return false;
        default:
          console.log("Something went wrong.");
          return false;
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut({ redirect: false });
    return NextResponse.json({
      message: "successfully logouted",
    });
  } catch (error) {
    throw error;
  }
}
