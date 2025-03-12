import * as z from "zod"
import { CompleteProduct, RelatedProductModel } from "./index"

export const CategoryModel = z.object({
  id: z.string().nanoid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModel> {
  Products?: CompleteProduct[]
}

/**
 * RelatedCategoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModel: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModel.extend({
  Products: RelatedProductModel.array().optional(),
}))
