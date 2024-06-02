import { db } from "@/lib/db";

export const getUserById = async (id: string) =>
  db.user.findUnique({ where: { id } });
