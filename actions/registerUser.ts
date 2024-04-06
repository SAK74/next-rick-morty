"use server";

import { db } from "@/lib/db";
// import { FormError } from "@/app/auth/register/page";
import { createUser } from "@/services/createUser";

export const register = async (formState: string, data: FormData) => {
  try {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    // to do validate fields!
    if (await db.user.findUnique({ where: { email } })) {
      return "This e-mail allready exist...";
    }
    if (true) {
      // console.log({ email, password });

      await createUser({ email, password });
      return "";
    }
  } catch (err) {
    console.log("\x1b[31m Error in register user action: \x1b[0m", err);
    return "Something wrong...";
  }
};
