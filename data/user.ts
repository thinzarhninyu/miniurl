import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUrlsByUserId = async (id: string) => {
  try {
    return await db.user.findMany({
      where: { id },
      select: {
        urls: {
          select: {
            id: true,
            url: true,
            code: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
