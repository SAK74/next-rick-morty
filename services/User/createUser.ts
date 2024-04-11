import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { User } from "prisma/prisma-client";

export const createUser = async (
  user: Pick<User, "email"> & { password: string }
) => {
  try {
    const password = await hash(user.password, 10);
    await db.user.create({ data: { ...user, password } });
  } catch {}
};
