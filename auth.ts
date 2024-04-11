import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  events: {
    signIn(message) {
      console.log("\x1b[92m Sign in Event: \x1b[0m", message);
      console.log("-----------------------");
    },
    signOut(message) {
      console.log("\x1b[31m Signout in Event: \x1b[0m", message);
      console.log("-----------------------");
    },
    async linkAccount(message) {
      const { account, profile, user } = message;
      console.log("\x1b[95m Link account in Event: \x1b[0m", message);
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
      console.log("-----------------------");
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
