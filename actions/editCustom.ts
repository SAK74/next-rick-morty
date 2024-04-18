"use server";

import { db } from "@/lib/db";
import { CustomFav } from "@/types";
import { revalidateTag } from "next/cache";

export const editCustom = async (user: string, id: string, data: CustomFav) => {
  try {
    await db.user.update({
      where: { email: user },
      data: { customs: { update: { where: { id }, data } } },
    });
    revalidateTag("custom");
  } catch {}
};
