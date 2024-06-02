// export { auth as middleware } from "@/auth";
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|db|.*\\.png|nextauth).*)",
  ],
};
export default NextAuth(authConfig).auth;
