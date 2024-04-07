"use server";

import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const addToFav = async (user: string, id: number) => {
  await db.favorite.upsert({
    where: { id },
    create: { id, User: { connect: { email: user } } },
    update: { User: { connect: { email: user } } },
  });
  revalidateTag("favorites");
};

export const removeFromFav = async (user: string, id: number) => {
  const fav = await db.favorite.update({
    where: { id },
    data: { User: { disconnect: { email: user } } },
    select: { User: true },
  });
  if (!fav.User.length) {
    await db.favorite.delete({ where: { id } });
  }
  revalidateTag("favorites");
};
