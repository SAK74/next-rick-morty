import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    return await db.account.findUnique({ where: { userId } });
  } catch (err) {
    console.log({ err });
    return null;
  }
};
