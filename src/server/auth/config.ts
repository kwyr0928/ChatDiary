import bcrypt from "bcrypt";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postSignin } from "~/lib/schemas";
import { getVerifiedUserByEmail } from "../repository/getdata";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      emailVerified: Date | null;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    emailVerified: Date | null;
    // ...other properties
    // role: UserRole;
  }
}

export const authConfig = {
  pages: {
    signIn: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = postSignin.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid credentials format");
          return null;
        }
        const { email, password } = parsedCredentials.data;
        //DBチェック
        const user = await getVerifiedUserByEmail(email);
        if (!user) {
          console.log("User not found");
          return null;
        }
        //パスワードチェック
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          console.log("Password mismatch");
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified ?? null,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // トークン情報をセッションに反映
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      console.log("authorized");
      const isLoggedIn = !!auth?.user;
      const isAuthRoute = ["/signin", "/signup"].includes(nextUrl.pathname);
      const isPublicRoute = ["/"].includes(nextUrl.pathname);
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }

        return true;
      }

      if (!isPublicRoute && !isLoggedIn) {
        return Response.redirect(new URL("/signin", nextUrl));
        //return false;
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
// export const authConfig = {
//   providers: [
//     GoogleProvider,
//     /**
//      * ...add more providers here.
//      *
//      * Most other providers require a bit more work than the Google provider. For example, the
//      * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
//      * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
//      *
//      * @see https://next-auth.js.org/providers/github
//      */
//   ],
//   adapter: PrismaAdapter(db),
//   callbacks: {
//     session: ({ session, user }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: user.id,
//       },
//     }),
//   },
// } satisfies NextAuthConfig;
