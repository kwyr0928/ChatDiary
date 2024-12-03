'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '~/server/auth';

export type SignUpState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

// export async function signUp(prevState: SignUpState, formData: FormData): Promise<SignUpState> {
//   const validatedFields = postSignup.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: '入力項目が足りません。',
//     };
//   }

//   const { email, password } = validatedFields.data;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const existingUser = await getUserByEmail(email);

//     if (existingUser) {
//       return {
//         message: '既に登録されているユーザーです。',
//       };
//     }

//     await db.user.create({
//       data: {
//         email: email,
//         password: hashedPassword,
//       },
//     });
//   } catch (error) {
//     throw error;
//   }

//   redirect('/login');
// }

export async function login(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
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
