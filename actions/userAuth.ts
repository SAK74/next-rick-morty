"use server";

import { signIn } from "@/auth";
import { FormStateType } from "@/app/auth/_components/CredentialsForm";
import { db } from "@/lib/db";
import { userCredentialsSchema } from "@/schemas";
import { createUser } from "@/services/User/createUser";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";

const parseCredentials = (data: FormData) => {
  const email = data.get("email");
  const password = data.get("password");
  console.log({ email, password });
  return userCredentialsSchema.safeParse({
    email,
    password,
  });
};

export const login: (
  callbackUrl: string | null,
  formState: FormStateType,
  data: FormData
) => Promise<FormStateType> = async (
  callbackUrl,
  _: FormStateType,
  data: FormData
) => {
  try {
    const parsedCredentials = parseCredentials(data);
    if (!parsedCredentials.success) {
      return {
        status: "error",
        message: parsedCredentials.error.flatten().fieldErrors,
      };
    }
    const {
      data: { email: verifiedEmail, password: verifiedPassword },
    } = parsedCredentials;
    const existingUser = await db.user.findUnique({
      where: { email: verifiedEmail },
      select: { id: true, email: true, password: true },
    });
    if (!existingUser || !existingUser.password) {
      return { status: "error", message: "Wrong user veryfication!" };
    }
    const passwordMatch = await compare(
      verifiedPassword,
      existingUser.password
    );

    if (!passwordMatch) {
      return { status: "error", message: "Wrong password veryfication!" };
    }
    await signIn("credentials", {
      ...parsedCredentials.data,
      redirect: true,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN,
    });
    return null;
  } catch (err) {
    console.log(err);
    if (err instanceof AuthError) {
      return { status: "error", message: "Something went wrong..." };
    }
    throw err;
  }
};

// --------------------------------------------------------------------

export const register: (
  formState: FormStateType,
  data: FormData
) => Promise<FormStateType> = async (_: FormStateType, data: FormData) => {
  try {
    const parsedCredentials = parseCredentials(data);
    if (!parsedCredentials.success) {
      return {
        status: "error",
        message: parsedCredentials.error.flatten().fieldErrors,
      };
    }
    const {
      data: { email: verifiedEmail, password: verifiedPassword },
    } = parsedCredentials;
    const isExist = await db.user.findUnique({
      where: { email: verifiedEmail },
      select: { id: true },
    });
    if (isExist) {
      return { status: "error", message: "This e-mail allready exist..." };
    }

    if (
      !(await createUser({ email: verifiedEmail, password: verifiedPassword }))
    ) {
      return { status: "error", message: "Something wrong..." };
    }
    return { status: "ok", message: "User has been created successfully" };
  } catch (err) {
    console.log("\x1b[31m Error in register user action: \x1b[0m", err);
    return { status: "error", message: "Something wrong..." };
  }
};
