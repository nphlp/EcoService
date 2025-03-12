import * as z from "zod"
import { CompleteContent, RelatedContentModel, CompleteUser, RelatedUserModel } from "./index"

export const ArticleModel = z.object({
  id: z.string().nanoid(),
  title: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteArticle extends z.infer<typeof ArticleModel> {
  Content?: CompleteContent[]
  Author?: CompleteUser
}

/**
 * RelatedArticleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedArticleModel: z.ZodSchema<CompleteArticle> = z.lazy(() => ArticleModel.extend({
  Content: RelatedContentModel.array().optional(),
  Author: RelatedUserModel.optional(),
}))
