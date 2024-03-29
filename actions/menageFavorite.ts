"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const addToFav = async (id: number) => {
  await db.favorite.upsert({ where: { id }, create: { id }, update: {} });
  revalidateTag("favorites");
};

export const removeFromFav = async (id: number) => {
  await db.favorite.delete({ where: { id } });
  revalidateTag("favorites");
};
