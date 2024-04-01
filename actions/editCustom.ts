"use server";

import { db } from "@/lib/db";
import { CustomFav } from "@/types";
import { revalidateTag } from "next/cache";

export const editCustom = async (id: string, data: CustomFav) => {
  try {
    await db.custom.update({ where: { id }, data });
    revalidateTag("custom");
  } catch {}
};
