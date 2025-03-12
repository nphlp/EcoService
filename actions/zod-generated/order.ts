import * as z from "zod"
import { OrderStatus, PaymentStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteQuantity, RelatedQuantityModel } from "./index"

export const OrderModel = z.object({
  id: z.string().nanoid(),
  /**
   * Order number for the customer
   */
  orderNumber: z.number().int(),
  orderStatus: z.nativeEnum(OrderStatus),
  paymentStatus: z.nativeEnum(PaymentStatus),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  User?: CompleteUser
  Quantity?: CompleteQuantity[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  User: RelatedUserModel.optional(),
  Quantity: RelatedQuantityModel.array().optional(),
}))
