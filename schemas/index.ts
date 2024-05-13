import * as z from "zod";

export const UrlSchema = z.object({
  url: z.string(),
  shortUrl: z.string().optional(),
});
