import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateCredentialsLogin } from "./lib/helpers/fetchers";
import { JWT } from "next-auth/jwt";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      email: PrismaUser["email"];
      username: PrismaUser["username"];
      password: PrismaUser["password"];
    } & DefaultSession["user"];
    currTime: string;
  }
  interface User extends Pick<PrismaUser, "email" | "password" | "username"> {}
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      email: PrismaUser["email"];
      password: PrismaUser["password"];
      username: PrismaUser["username"];
    };
  }
}

// TODO: implement user signin
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 60 * 30, // 30 mins
    strategy: "jwt",
    updateAge: 60 * 10,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("credentials ::", credentials);
        const { email, password } = credentials;
        const authResult = await authenticateCredentialsLogin(
          email as string,
          password as string
        );
        console.log("authResult ::", authResult);
        if (!authResult.success) {
          throw new Error(authResult.error!);
        }
        console.log("authResult ::", authResult);
        return authResult.data;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user, trigger }) => {
      // 'user' will is available when login is triggered through any OAuth provider.
      if (user) {
        const jwtPayload = {
          user: {
            email: user.email ?? "NA",
            password: user.password,
            username: user.username,
          },
        };
        return jwtPayload;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        const expireDateTimeIST = new Date(session.expires).toLocaleString(
          undefined,
          { timeZone: "Asia/Kolkata" }
        );
        const currentDateTimeIST = new Date().toLocaleString(undefined, {
          timeZone: "Asia/Kolkata",
        });

        session = {
          ...session,
          user: {
            ...session.user,
            ...token.user,
          },
          currTime: currentDateTimeIST,
          expires: expireDateTimeIST as Date & string,
        };
      }

      return session;
    },
  },
});
