import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getAccountByUserId } from "./services/User/getUserAccount";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  ...authConfig,
  events: {
    signIn(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("\x1b[92m Sign in Event: \x1b[0m", message);
        console.log("-----------------------");
      }
    },
    signOut(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("\x1b[31m Signout in Event: \x1b[0m", message);
        console.log("-----------------------");
      }
    },
    async linkAccount(message) {
      const { account, profile, user } = message;
      if (process.env.NODE_ENV === "development") {
        console.log("\x1b[95m Link account in Event: \x1b[0m", message);
        console.log("-----------------------");
      }

      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    ...authConfig.callbacks,
    async session(params) {
      // console.log("\x1b[33m In Session callback \x1b[0m");
      // console.log(params);

      const { newSession, session, token, user, trigger } = params;

      if (token.sub) {
        const userInDb = await db.user.findUnique({
          where: { id: token.sub },
          select: { name: true, email: true },
        });
        const isOauth = Boolean(await getAccountByUserId(token.sub));
        const name = userInDb?.name;
        const email = userInDb?.email;
        // console.log({ userInDb, isOauth });

        // console.log("-----------------------");

        return {
          ...session,
          user: { ...session.user, id: token.sub, isOauth, name, email },
        };
      }

      // console.log("-----------------------");

      return session;
    },
    // jwt(params) {
    //   console.log("\x1b[33m In JWT callback \x1b[0m");
    //   console.log(params);

    //   const {} = params;
    //   console.log("-----------------------");

    //   return params.token;
    // },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
