"use server";

import { db } from "@/lib/db";
import { CustomFav } from "@/types";
import { revalidateTag } from "next/cache";

export const addCustomToFav = async (person: CustomFav) => {
  await db.custom.create({
    data: {
      ...person,
    },
  });
  revalidateTag("custom");
};
