import { db } from "@/lib/db";

export const getUrlById = async (id: string) => {
  try {
    const data = await db.url.findFirst({ where: { id } });
    return data;
  } catch {
    return null;
  }
};
