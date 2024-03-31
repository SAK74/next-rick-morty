"use server";

import { db } from "@/lib/db";
import { CustomFav } from "@/types";

export const addCustomToFav = async (person: CustomFav) => {
  await db.custom.create({
    data: {
      ...person,
    },
  });
};
