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

  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let inviteCode = "";
    for (let i = 0; i < 6; i++) {
      inviteCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return inviteCode;
  };

  let code = generateCode();

  const existingUrls = await db.url.findMany();

  for (let i = 0; i < existingUrls.length; i++) {
    if (existingUrls[i].code === code) {
      code = generateCode();
      i = 0;
    }
  }

  const returnedUrl =
    (await db.url.findFirst({
      where: {
        url,
      },
    })) ??
    (await db.url.create({
      data: {
        url,
        code,
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

  return {
    success: "Form created!",
    id: returnedUrl.id,
    code: returnedUrl.code,
  };
};
