import { Gender, HeroStatus } from "@prisma/client";
import { z } from "zod";

export const customFavoriteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.optional(z.string()),
  species: z.string().min(1, "Species is required"),
  status: z.optional(z.nativeEnum(HeroStatus)),
  gender: z.optional(z.nativeEnum(Gender)),
});

export const userCredentialsSchema = z.object({
  email: z.string().min(1, "Email is required").email("Wrong e-mail format"),
  password: z.coerce.string().min(1, "Password is required"),
});
