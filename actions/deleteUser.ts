"use server";

import { db } from "@/lib/db";

export const deleteUser = async (id: string) => {
  await db.user.delete({ where: { id } });
};
