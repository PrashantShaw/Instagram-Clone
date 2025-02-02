import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateCredentialsLogin } from "./lib/helpers/fetchers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt"; // below line will be used for: declare module "next-auth/jwt"
import { User as PrismaUser } from "@prisma/client";

type AuthUser = Pick<PrismaUser, "email" | "password" | "username"> & {
  uid: string;
};
declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      email: PrismaUser["email"];
      username: PrismaUser["username"];
      password: PrismaUser["password"];
    } & DefaultSession["user"];
    currTime: string;
  }
  interface User extends AuthUser {}
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      uid: string;
      email: PrismaUser["email"];
      password: PrismaUser["password"];
      username: PrismaUser["username"];
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  session: {
    maxAge: 60 * 60 * 24 * 2, // 2 days
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
        // set authenticated user to store
        const {
          id,
          email: _email,
          password: _password,
          username,
        } = authResult.data!;

        const user = {
          uid: id.toString(),
          email: _email,
          password: _password,
          username,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // 'user' will is available when login is triggered through any OAuth provider.
      if (user) {
        const jwtPayload = {
          user: {
            uid: user.uid,
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
