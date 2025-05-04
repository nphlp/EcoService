// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ArticleCreateArgsSchema, ArticleDeleteArgsSchema, ArticleFindFirstArgsSchema, ArticleFindManyArgsSchema, ArticleFindUniqueArgsSchema, ArticleOrderByWithRelationInputSchema, ArticleSchema, ArticleUpdateArgsSchema, ArticleUpsertArgsSchema, ArticleWhereInputSchema, ArticleWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ArticleModel = z.infer<typeof ArticleSchema>;
export type ArticleCount = number;

// ============== Props Types ============== //

export type CreateArticleProps = Prisma.ArticleCreateArgs;
export type UpsertArticleProps = Prisma.ArticleUpsertArgs;
export type UpdateArticleProps = Prisma.ArticleUpdateArgs;
export type DeleteArticleProps = Prisma.ArticleDeleteArgs;
export type FindFirstArticleProps = Prisma.ArticleFindFirstArgs;
export type FindUniqueArticleProps = Prisma.ArticleFindUniqueArgs;
export type FindManyArticleProps = Prisma.ArticleFindManyArgs;
export type CountArticleProps = Prisma.ArticleCountArgs;

// ============== Schema Types ============== //

export const createArticleSchema: ZodType<CreateArticleProps> = ArticleCreateArgsSchema;
export const upsertArticleSchema: ZodType<UpsertArticleProps> = ArticleUpsertArgsSchema;
export const updateArticleSchema: ZodType<UpdateArticleProps> = ArticleUpdateArgsSchema;
export const deleteArticleSchema: ZodType<DeleteArticleProps> = ArticleDeleteArgsSchema;
export const selectFirstArticleSchema: ZodType<FindFirstArticleProps> = ArticleFindFirstArgsSchema;
export const selectUniqueArticleSchema: ZodType<FindUniqueArticleProps> = ArticleFindUniqueArgsSchema;
export const selectManyArticleSchema: ZodType<FindManyArticleProps> = ArticleFindManyArgsSchema;
export const countArticleSchema: ZodType<CountArticleProps> =  z.object({
    where: z.lazy(() => ArticleWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ArticleOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ArticleOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ArticleWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

export type CreateArticleResponse<T extends CreateArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpsertArticleResponse<T extends UpsertArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpdateArticleResponse<T extends UpdateArticleProps> = Prisma.ArticleGetPayload<T>;
export type DeleteArticleResponse<T extends DeleteArticleProps> = Prisma.ArticleGetPayload<T>;
export type FindFirstArticleResponse<T extends FindFirstArticleProps> = Prisma.ArticleGetPayload<T> | null;
export type FindUniqueArticleResponse<T extends FindUniqueArticleProps> = Prisma.ArticleGetPayload<T> | null;
export type FindManyArticleResponse<T extends FindManyArticleProps> = Prisma.ArticleGetPayload<T>[];
export type CountArticleResponse = ArticleCount;
