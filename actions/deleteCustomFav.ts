"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteCustom = async (id: string) => {
  await db.custom.delete({ where: { id } });
  revalidateTag("custom");
};
