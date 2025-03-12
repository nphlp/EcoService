import * as z from "zod"
import { CompleteContent, RelatedContentModel, CompleteUser, RelatedUserModel } from "./index"

export const DoItYourselfModel = z.object({
  id: z.string().nanoid(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDoItYourself extends z.infer<typeof DoItYourselfModel> {
  Content?: CompleteContent[]
  Author?: CompleteUser
}

/**
 * RelatedDoItYourselfModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDoItYourselfModel: z.ZodSchema<CompleteDoItYourself> = z.lazy(() => DoItYourselfModel.extend({
  Content: RelatedContentModel.array().optional(),
  Author: RelatedUserModel.optional(),
}))
