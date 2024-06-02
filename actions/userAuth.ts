"use server";

import { signIn } from "@/auth";
import type { FormStateType, UserCredentials } from "@/types";
import { db } from "@/lib/db";
import { userCredentialsSchema, userRegistrationSchema } from "@/schemas";
import { createUser } from "@/services/User/createUser";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import { DEFAULT_REDIRECT_AFTER_LOGIN } from "@/routes";

const parseCredentials = (type: "login" | "register", data: FormData) => {
  const email = data.get("email");
  const password = data.get("password");
  const passwVeryfication = data.get("passw-veryfication");

  const schema =
    type === "login" ? userCredentialsSchema : userRegistrationSchema;

  return schema.safeParse({
    email,
    password,
    passwVeryfication,
  });
};

export const login: <T extends UserCredentials>(
  callbackUrl: string | null,
  formState: FormStateType<T>,
  data: FormData
) => Promise<FormStateType<T>> = async (callbackUrl, _, data) => {
  try {
    const parsedCredentials = parseCredentials("login", data);
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
    // if(process.env.NODE_ENV==='development'){
    //   console.log({ callbackUrl });
    // }

    await signIn("credentials", {
      ...parsedCredentials.data,
      redirect: true,
      redirectTo: callbackUrl || DEFAULT_REDIRECT_AFTER_LOGIN,
    });
    return null;
  } catch (err) {
    console.log("\x1b[31m Error in login user action: \x1b[0m", err);

    if (err instanceof AuthError) {
      return { status: "error", message: "Something went wrong..." };
    }
    throw err;
  }
};

// --------------------------------------------------------------------

export const register: <
  T extends UserCredentials & { passwVeryfication?: string }
>(
  formState: FormStateType<T>,
  data: FormData
) => Promise<FormStateType<T>> = async (_, data) => {
  try {
    const parsedCredentials = parseCredentials("register", data);
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
