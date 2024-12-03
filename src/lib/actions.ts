'use server';

import { AuthError } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signIn, signOut } from '~/server/auth';
import { userSchema } from './schemas';

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type  SignInParams = {
  email: string;
  password: string;
  redirect: boolean;
}

// export async function signUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
//   try {
//     await signUp(prevState, formData);
//   } catch (error) {
//     throw error;
//   }

//   redirect('/login');
// }

export async function login(prevState: string | undefined, formData: z.infer<typeof userSchema>) {
  try {
    await signIn(prevState, {
      email: formData.email,
      password: formData.password,
      redirect: false, // リダイレクトを無効化
    });
    return NextResponse.json({
      message: "successfully in login",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return NextResponse.json(
            { error: "Invalid credentials.メールかパスワードが違います." },
            { status: 500 },
          );
        default:
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 },
          );
      }
    }
    throw error;
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}
