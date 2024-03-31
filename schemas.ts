import { Gender, HeroStatus } from "@prisma/client";
import { z } from "zod";

export const customFavoriteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.optional(z.string()),
  species: z.string().min(1, "Species is required"),
  status: z.optional(z.nativeEnum(HeroStatus)),
  gender: z.optional(z.nativeEnum(Gender)),
});
