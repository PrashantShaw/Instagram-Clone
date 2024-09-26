import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// TODO: implement user signin
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        return null;
      },
    }),
  ],
});
