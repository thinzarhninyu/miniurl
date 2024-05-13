"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UrlSchema } from "@/schemas";
import { z } from "zod";

export const CreateUrl = async (values: z.infer<typeof UrlSchema>) => {
  const user = await currentUser();

  const validatedFields = UrlSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { url } = validatedFields.data;

  const returnedUrl =
    (await db.url.findFirst({
      where: {
        url,
      },
    })) ??
    (await db.url.create({
      data: {
        url,
      },
    }));

  if (!returnedUrl) {
    return { error: "Failed to generate URL!" };
  }

  if (user) {
    await db.user.update({
      data: {
        urls: {
          connect: {
            id: returnedUrl.id,
          },
        },
      },
      where: {
        id: user.id,
      },
    });
  }

  return { success: "Form created!", id: returnedUrl.id };
};
