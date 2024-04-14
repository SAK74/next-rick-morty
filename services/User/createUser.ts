import { SALT } from "@/_constants";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";

export const createUser = async (user: { email: string; password: string }) => {
  try {
    const password = await hash(user.password, SALT);
    await db.user.create({ data: { ...user, password } });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
