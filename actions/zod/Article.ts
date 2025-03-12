import { ArticleCommon, ArticleId, ArticleTimestamps, ArticleUpdate } from "@actions/types/Article";
import { ArticleModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const articleIdSchema: ZodString = z.string().nanoid();

export const articleIdObjectSchema: ZodType<ArticleId> = strictObject({
    id: z.string().nanoid(),
});

export const articleCommonSchema: ZodType<ArticleCommon> = ArticleModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const articleTimestampsSchema: ZodType<ArticleTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const articleUpdateSchema: ZodType<ArticleUpdate> = strictObject({
    id: articleIdSchema,
    data: articleCommonSchema,
});
