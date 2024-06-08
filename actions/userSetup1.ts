"use server";

import { UNKNOWN_ERROR_MESSAGE } from "@/_constants";
import { auth, unstable_update } from "@/auth";
import { db } from "@/lib/db";
import type { UserSetupForm } from "@/types";
import { getError } from "./utils";
import { compare, hash } from "bcryptjs";

export const userSetupAction: (
  data: UserSetupForm
) => Promise<{ status: "ok" | "error"; message: string }> = async (data) => {
  const session = await auth();
  if (!session) {
    console.error("User is not logged!");
    return getError(UNKNOWN_ERROR_MESSAGE);
  }

  const existingUser = await db.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, password: true, id: true },
  });
  if (!existingUser) {
    return getError("User not exist");
  }
  // if (!data.name && !data.email && !data.newPassw) {
  //   return getError("Nothing to change!");
  // }
  if (session.user.isOauth) {
    if (existingUser.name === data.name) {
      return getError("The new name is the same!");
    }
    await db.user.update({
      where: { id: existingUser.id },
      data: { name: data.name },
    });
    return { status: "ok", message: "The name was changed" };
  }
  const passwMatched = await compare(data.password!, existingUser.password!);
  if (!passwMatched) {
    return getError("Wrong password!");
  }
  const newPassword = data.newPassw && (await hash(data.newPassw, 10));

  const updatedUser = await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...(newPassword && { password: newPassword }),
      ...(data.name && { name: data.name }),
      ...(data.email && { name: data.email }),
    },
    select: { name: true, email: true },
  });

  await unstable_update({ user: { ...session.user, ...updatedUser } });

  return { status: "ok", message: "Success!" };
};
