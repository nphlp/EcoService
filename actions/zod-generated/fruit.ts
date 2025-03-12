import * as z from "zod"

export const FruitModel = z.object({
  id: z.string().nanoid(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
