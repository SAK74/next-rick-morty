import type { DefaultSession, User } from "next-auth";

export type CustomUser = DefaultSession["user"] & {
  isOauth: boolean;
  email: string;
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: CustomUser;
  }
}
