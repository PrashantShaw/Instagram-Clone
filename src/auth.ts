import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateCredentialsLogin } from "./lib/helpers/fetchers";

// TODO: implement user signin
export const { handlers, signIn, signOut, auth } = NextAuth({
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
          throw new Error(authResult.error);
          // return null;
        }

        return {
          email: "example@email.co",
        };
      },
    }),
  ],
});
