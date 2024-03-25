"use server";

import { db } from "@/lib/db";

export const addToFav = async (id: number) => {
  await db.favorite.upsert({ where: { id }, create: { id }, update: {} });
};

export const removeFromFav = async (id: number) => {
  await db.favorite.delete({ where: { id } });
};
