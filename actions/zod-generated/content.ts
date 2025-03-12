import * as z from "zod"
import { CompleteArticle, RelatedArticleModel, CompleteDoItYourself, RelatedDoItYourselfModel } from "./index"

export const ContentModel = z.object({
  id: z.string().nanoid(),
  content: z.string(),
  image: z.string(),
  articleId: z.string().nullable(),
  doItYourselfId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteContent extends z.infer<typeof ContentModel> {
  Article?: CompleteArticle | null
  DoItYourself?: CompleteDoItYourself | null
}

/**
 * RelatedContentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedContentModel: z.ZodSchema<CompleteContent> = z.lazy(() => ContentModel.extend({
  Article: RelatedArticleModel.optional().nullable(),
  DoItYourself: RelatedDoItYourselfModel.optional().nullable(),
}))
