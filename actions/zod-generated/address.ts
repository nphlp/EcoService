import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const AddressModel = z.object({
  id: z.string().nanoid(),
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  country: z.string(),
  isDefault: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteAddress extends z.infer<typeof AddressModel> {
  User?: CompleteUser
}

/**
 * RelatedAddressModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAddressModel: z.ZodSchema<CompleteAddress> = z.lazy(() => AddressModel.extend({
  User: RelatedUserModel.optional(),
}))
