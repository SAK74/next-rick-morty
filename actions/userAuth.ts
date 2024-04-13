"use server";

import { FormStateType } from "@/components/auth/loginForm";
import { db } from "@/lib/db";
import { createUser } from "@/services/User/createUser";

export const login = async (_: FormStateType, data: FormData) => {
  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    console.log({ email, password });
    return null;
  } catch {
    return null;
  }
};

export const register: (
  formState: FormStateType,
  data: FormData
) => Promise<FormStateType> = async (_: FormStateType, data: FormData) => {
  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    // TODO validate fields with zod!
    if (!email || !password) {
      return { status: "error", message: "Both fields are required!" };
    }
    if (await db.user.findUnique({ where: { email } })) {
      return { status: "error", message: "This e-mail allready exist..." };
    }
    if (true) {
      await createUser({ email, password });
      return { status: "ok", message: "User has been created successfully" };
    }
  } catch (err) {
    console.log("\x1b[31m Error in register user action: \x1b[0m", err);
    return { status: "error", message: "Something wrong..." };
  }
};
