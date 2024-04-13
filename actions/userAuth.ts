"use server";

import { FormStateType } from "@/components/auth/loginForm";
import { db } from "@/lib/db";
import { userCredentialsSchema } from "@/schemas";
import { createUser } from "@/services/User/createUser";

export const login: (
  formState: FormStateType,
  data: FormData
) => Promise<FormStateType> = async (_: FormStateType, data: FormData) => {
  try {
    const email = data.get("email");
    const password = data.get("password");
    console.log({ email, password });
    const parseCredentials = userCredentialsSchema.safeParse({
      email,
      password,
    });
    if (parseCredentials.success) {
      return { status: "ok", message: "Success!" };
    }
    return {
      status: "error",
      message: parseCredentials.error.flatten().fieldErrors,
    };
  } catch (err) {
    console.log(err);
    return { status: "error", message: "Something went wrong..." };
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
