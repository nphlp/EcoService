// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ArticleCreateArgsSchema, ArticleCreateManyArgsSchema, ArticleDeleteArgsSchema, ArticleDeleteManyArgsSchema, ArticleFindFirstArgsSchema, ArticleFindManyArgsSchema, ArticleFindUniqueArgsSchema, ArticleOrderByWithRelationInputSchema, ArticleSchema, ArticleUpdateArgsSchema, ArticleUpdateManyArgsSchema, ArticleUpsertArgsSchema, ArticleWhereInputSchema, ArticleWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ArticleModel = z.infer<typeof ArticleSchema>;
export type ArticleCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateArticleProps = Prisma.ArticleCreateArgs;
export type UpsertArticleProps = Prisma.ArticleUpsertArgs;
export type UpdateArticleProps = Prisma.ArticleUpdateArgs;
export type DeleteArticleProps = Prisma.ArticleDeleteArgs;

// Multiple mutations
export type CreateManyArticleProps = Prisma.ArticleCreateManyArgs;
export type UpdateManyArticleProps = Prisma.ArticleUpdateManyArgs;
export type DeleteManyArticleProps = Prisma.ArticleDeleteManyArgs;

// Single queries
export type FindFirstArticleProps = Prisma.ArticleFindFirstArgs;
export type FindUniqueArticleProps = Prisma.ArticleFindUniqueArgs;
export type FindManyArticleProps = Prisma.ArticleFindManyArgs;

// Multiple queries
export type CountArticleProps = Prisma.ArticleCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createArticleSchema: ZodType<CreateArticleProps> = ArticleCreateArgsSchema;
export const upsertArticleSchema: ZodType<UpsertArticleProps> = ArticleUpsertArgsSchema;
export const updateArticleSchema: ZodType<UpdateArticleProps> = ArticleUpdateArgsSchema;
export const deleteArticleSchema: ZodType<DeleteArticleProps> = ArticleDeleteArgsSchema;

// Multiple mutations
export const createManyArticleSchema: ZodType<CreateManyArticleProps> = ArticleCreateManyArgsSchema;
export const updateManyArticleSchema: ZodType<UpdateManyArticleProps> = ArticleUpdateManyArgsSchema;
export const deleteManyArticleSchema: ZodType<DeleteManyArticleProps> = ArticleDeleteManyArgsSchema;

// Single queries
export const selectFirstArticleSchema: ZodType<FindFirstArticleProps> = ArticleFindFirstArgsSchema;
export const selectUniqueArticleSchema: ZodType<FindUniqueArticleProps> = ArticleFindUniqueArgsSchema;
export const selectManyArticleSchema: ZodType<FindManyArticleProps> = ArticleFindManyArgsSchema;

// Aggregate queries
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

// Single mutations
export type CreateArticleResponse<T extends CreateArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpsertArticleResponse<T extends UpsertArticleProps> = Prisma.ArticleGetPayload<T>;
export type UpdateArticleResponse<T extends UpdateArticleProps> = Prisma.ArticleGetPayload<T>;
export type DeleteArticleResponse<T extends DeleteArticleProps> = Prisma.ArticleGetPayload<T>;

// Multiple mutations
export type CreateManyArticleResponse = { count: number };
export type UpdateManyArticleResponse = { count: number };
export type DeleteManyArticleResponse = { count: number };

// Single queries
export type FindFirstArticleResponse<T extends FindFirstArticleProps> = Prisma.ArticleGetPayload<T> | null;
export type FindUniqueArticleResponse<T extends FindUniqueArticleProps> = Prisma.ArticleGetPayload<T> | null;
export type FindManyArticleResponse<T extends FindManyArticleProps> = Prisma.ArticleGetPayload<T>[];

// Aggregate queries
export type CountArticleResponse = ArticleCount;
