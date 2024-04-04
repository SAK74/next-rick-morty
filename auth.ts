import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// import { redirect } from "next/navigation";

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
      console.log("\x1b[93m Signout in Event: \x1b[0m", message);
      console.log("-----------------------");

      // redirect("/");
    },
  },
});
