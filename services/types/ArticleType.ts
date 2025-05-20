// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ArticleCreateArgsSchema, ArticleCreateManyArgsSchema, ArticleDeleteArgsSchema, ArticleDeleteManyArgsSchema, ArticleFindFirstArgsSchema, ArticleFindManyArgsSchema, ArticleFindUniqueArgsSchema, ArticleOrderByWithRelationInputSchema, ArticleSchema, ArticleUpdateArgsSchema, ArticleUpdateManyArgsSchema, ArticleUpsertArgsSchema, ArticleWhereInputSchema, ArticleWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ArticleModel = z.infer<typeof ArticleSchema>;
export type ArticleCount = number;

// ============== Props Types ============== //

// Single mutations
export type ArticleCreateProps = Prisma.ArticleCreateArgs;
export type ArticleUpsertProps = Prisma.ArticleUpsertArgs;
export type ArticleUpdateProps = Prisma.ArticleUpdateArgs;
export type ArticleDeleteProps = Prisma.ArticleDeleteArgs;

// Multiple mutations
export type ArticleCreateManyProps = Prisma.ArticleCreateManyArgs;
export type ArticleUpdateManyProps = Prisma.ArticleUpdateManyArgs;
export type ArticleDeleteManyProps = Prisma.ArticleDeleteManyArgs;

// Single queries
export type ArticleFindFirstProps = Prisma.ArticleFindFirstArgs;
export type ArticleFindUniqueProps = Prisma.ArticleFindUniqueArgs;
export type ArticleFindManyProps = Prisma.ArticleFindManyArgs;

// Multiple queries
export type ArticleCountProps = Prisma.ArticleCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const ArticleCreateSchema: ZodType<ArticleCreateProps> = ArticleCreateArgsSchema;
export const ArticleUpsertSchema: ZodType<ArticleUpsertProps> = ArticleUpsertArgsSchema;
export const ArticleUpdateSchema: ZodType<ArticleUpdateProps> = ArticleUpdateArgsSchema;
export const ArticleDeleteSchema: ZodType<ArticleDeleteProps> = ArticleDeleteArgsSchema;

// Multiple mutations
export const ArticleCreateManySchema: ZodType<ArticleCreateManyProps> = ArticleCreateManyArgsSchema;
export const ArticleUpdateManySchema: ZodType<ArticleUpdateManyProps> = ArticleUpdateManyArgsSchema;
export const ArticleDeleteManySchema: ZodType<ArticleDeleteManyProps> = ArticleDeleteManyArgsSchema;

// Single queries
export const ArticleFindFirstSchema: ZodType<ArticleFindFirstProps> = ArticleFindFirstArgsSchema;
export const ArticleFindUniqueSchema: ZodType<ArticleFindUniqueProps> = ArticleFindUniqueArgsSchema;
export const ArticleFindManySchema: ZodType<ArticleFindManyProps> = ArticleFindManyArgsSchema;

// Aggregate queries
export const ArticleCountSchema: ZodType<ArticleCountProps> =  z.object({
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
export type ArticleCreateResponse<T extends ArticleCreateProps> = Prisma.ArticleGetPayload<T>;
export type ArticleUpsertResponse<T extends ArticleUpsertProps> = Prisma.ArticleGetPayload<T>;
export type ArticleUpdateResponse<T extends ArticleUpdateProps> = Prisma.ArticleGetPayload<T>;
export type ArticleDeleteResponse<T extends ArticleDeleteProps> = Prisma.ArticleGetPayload<T>;

// Multiple mutations
export type ArticleCreateManyResponse = { count: number };
export type ArticleUpdateManyResponse = { count: number };
export type ArticleDeleteManyResponse = { count: number };

// Single queries
export type ArticleFindFirstResponse<T extends ArticleFindFirstProps> = Prisma.ArticleGetPayload<T> | null;
export type ArticleFindUniqueResponse<T extends ArticleFindUniqueProps> = Prisma.ArticleGetPayload<T> | null;
export type ArticleFindManyResponse<T extends ArticleFindManyProps> = Prisma.ArticleGetPayload<T>[];

// Aggregate queries
export type ArticleCountResponse = ArticleCount;
