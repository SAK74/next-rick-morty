import { Gender, HeroStatus } from "@prisma/client";
import { z } from "zod";

// export const STATUSES=['Alive','Dead','unknown'] as const;
// export const GENDERES:Custom['gender'][]=['Male','Female','Genderless','unknown']

export const customFavoriteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string(), //to do optional
  species: z.string().min(1, "Species is required"),
  status: z.optional(z.nativeEnum(HeroStatus)),
  gender: z.optional(z.nativeEnum(Gender)),
  // created
});
