"use server";

import { auth, unstable_update } from "@/auth";
import { db } from "@/lib/db";
import { oauthUserSetupSchema, userSetupSchema } from "@/schemas";
import type { FormStateType, UserCredentials } from "@/types";
import { compare, hash } from "bcryptjs";
import { getError } from "./utils";
import { UNKNOWN_ERROR_MESSAGE } from "@/_constants";

export const userSetupAction: <
  T extends UserCredentials & { name: string; newPassw?: string }
>(
  formState: FormStateType<T>,
  formData: FormData
) => Promise<FormStateType<T>> = async (formState, formData) => {
  const data = Object.fromEntries(formData.entries());

  // console.log(Object.fromEntries(formData.entries()));
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const newPassw = formData.get("new-password");
  const session = await auth();
  if (!session) {
    console.error("User is not logged!");
    return getError(UNKNOWN_ERROR_MESSAGE);
  }
  const schema = (
    session.user.isOauth ? oauthUserSetupSchema : userSetupSchema
  ) as typeof userSetupSchema;
  const parsedData = schema.safeParse({
    ...(name && { name }),
    ...(email && { email }),
    ...(password && { password }),
    ...(newPassw && { newPassw }),
  });
  if (!parsedData.success) {
    return { status: "error", message: parsedData.error.flatten().fieldErrors };
  }
  const { data: parsedValuesWithPassword } = parsedData;

  const { password: currentPassw, ...parsedValues } = parsedValuesWithPassword;

  if (!parsedValues.name && !parsedValues.email && !parsedValues.newPassw) {
    return getError("Nothing to change!");
  }

  const existingUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, password: true, id: true },
  });
  if (!existingUser) {
    return getError("User not exist");
  }

  if (session.user.isOauth) {
    if (existingUser.name === parsedValues.name) {
      return getError("The new name is the same...");
    }
    const updatedUser = await db.user.update({
      where: { id: existingUser.id },
      data: { name: parsedValues.name },
      select: { name: true },
    });
    await unstable_update({ user: { ...session.user, ...updatedUser } });

    return { status: "ok", message: "The name was changed" };
  }

  const passwMatched = await compare(currentPassw!, existingUser.password!);
  if (!passwMatched) {
    return getError("Wrong password!");
  }
  const newPassword =
    parsedValues.newPassw && (await hash(parsedValues.newPassw, 10));

  const updatedUser = await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: newPassword,
      name: parsedValues.name,
      email: parsedValues.email,
    },
    select: { name: true, email: true },
  });

  await unstable_update({ user: { ...session.user, ...updatedUser } });

  return { status: "ok", message: "Success!" };
};
