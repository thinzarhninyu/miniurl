import { db } from "@/lib/db";

export const getUrlByCode = async (code: string) => {
  try {
    const data = await db.url.findFirst({ where: { code } });
    return data;
  } catch {
    return null;
  }
};
