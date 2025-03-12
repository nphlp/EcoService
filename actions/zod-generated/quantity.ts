import * as z from "zod"
import { CompleteProduct, RelatedProductModel, CompleteOrder, RelatedOrderModel } from "./index"

export const QuantityModel = z.object({
  id: z.string().nanoid(),
  quantity: z.number().int(),
  productId: z.string(),
  orderId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteQuantity extends z.infer<typeof QuantityModel> {
  product?: CompleteProduct
  Order?: CompleteOrder
}

/**
 * RelatedQuantityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuantityModel: z.ZodSchema<CompleteQuantity> = z.lazy(() => QuantityModel.extend({
  product: RelatedProductModel.optional(),
  Order: RelatedOrderModel.optional(),
}))
