"use server";

import { db } from "@/lib/db";

export const deleteUser = async (id: string) => {
  await db.$transaction(async (prisma) => {
    await prisma.user.delete({ where: { id } });
    const emptyFavorites = (
      await prisma.favorite.findMany({ where: { NOT: { User: { some: {} } } } })
    ).map((fav) => fav.id);
    await prisma.favorite.deleteMany({ where: { id: { in: emptyFavorites } } });
  });
};
