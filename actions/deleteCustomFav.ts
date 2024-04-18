"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteCustom = async (user: string, id: string) => {
  await db.user.update({
    where: { email: user },
    data: { customs: { delete: { id } } },
  });
  revalidateTag("custom");
};
