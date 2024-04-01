import { db } from "@/lib/db";

export const getCustomFavById = async (id: string) => {
  try {
    const hero = await db.custom.findUnique({ where: { id } });
    return hero || undefined;
  } catch {}
};
