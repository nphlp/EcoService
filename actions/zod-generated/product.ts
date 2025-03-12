import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteQuantity, RelatedQuantityModel, CompleteCategory, RelatedCategoryModel } from "./index"

export const ProductModel = z.object({
  id: z.string().nanoid(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
  stock: z.number().int(),
  vendorId: z.string(),
  categoryId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  Vendor?: CompleteUser
  Quantity?: CompleteQuantity[]
  Category?: CompleteCategory | null
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  Vendor: RelatedUserModel.optional(),
  Quantity: RelatedQuantityModel.array().optional(),
  Category: RelatedCategoryModel.optional().nullable(),
}))
