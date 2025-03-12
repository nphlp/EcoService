import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteArticle, RelatedArticleModel, CompleteDoItYourself, RelatedDoItYourselfModel, CompleteAddress, RelatedAddressModel, CompleteOrder, RelatedOrderModel, CompleteProduct, RelatedProductModel, CompleteSession, RelatedSessionModel, CompleteAccount, RelatedAccountModel } from "./index"

export const UserModel = z.object({
  id: z.string().nanoid(),
  /**
   * Firstname Lastname
   */
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.nativeEnum(Role),
  phone: z.string().nullable(),
  /**
   * Regular Stripe Customer ID
   */
  stripeId: z.string().nullable(),
  /**
   * Stripe Connect Account ID
   */
  stripeConnectId: z.string().nullable(),
  /**
   * Track if seller has completed Stripe onboarding
   */
  isOnboarded: z.boolean(),
  /**
   * Track if user wants to be a seller
   */
  isSeller: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Article?: CompleteArticle[]
  DoItYourself?: CompleteDoItYourself[]
  Adress?: CompleteAddress[]
  Order?: CompleteOrder[]
  Product?: CompleteProduct[]
  Session?: CompleteSession[]
  Account?: CompleteAccount[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Article: RelatedArticleModel.array().optional(),
  DoItYourself: RelatedDoItYourselfModel.array().optional(),
  Adress: RelatedAddressModel.array().optional(),
  Order: RelatedOrderModel.array().optional(),
  Product: RelatedProductModel.array().optional(),
  Session: RelatedSessionModel.array().optional(),
  Account: RelatedAccountModel.array().optional(),
}))
