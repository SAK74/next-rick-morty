"use server";

import { db } from "@/lib/db";
import { CustomFav } from "@/types";
import { revalidateTag } from "next/cache";

export const addCustomToFav = async (user: string, person: CustomFav) => {
  
  await db.user.update({
    where: { email: user },
    data: { customs: { create: person } },
  });
  revalidateTag("custom");
};
