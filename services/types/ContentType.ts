// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ContentCreateArgsSchema, ContentCreateManyArgsSchema, ContentDeleteArgsSchema, ContentDeleteManyArgsSchema, ContentFindFirstArgsSchema, ContentFindManyArgsSchema, ContentFindUniqueArgsSchema, ContentOrderByWithRelationInputSchema, ContentSchema, ContentUpdateArgsSchema, ContentUpdateManyArgsSchema, ContentUpsertArgsSchema, ContentWhereInputSchema, ContentWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;
export type ContentCount = number;

// ============== Props Types ============== //

// Single mutations
export type ContentCreateProps = Prisma.ContentCreateArgs;
export type ContentUpsertProps = Prisma.ContentUpsertArgs;
export type ContentUpdateProps = Prisma.ContentUpdateArgs;
export type ContentDeleteProps = Prisma.ContentDeleteArgs;

// Multiple mutations
export type ContentCreateManyProps = Prisma.ContentCreateManyArgs;
export type ContentUpdateManyProps = Prisma.ContentUpdateManyArgs;
export type ContentDeleteManyProps = Prisma.ContentDeleteManyArgs;

// Single queries
export type ContentFindFirstProps = Prisma.ContentFindFirstArgs;
export type ContentFindUniqueProps = Prisma.ContentFindUniqueArgs;
export type ContentFindManyProps = Prisma.ContentFindManyArgs;

// Multiple queries
export type ContentCountProps = Prisma.ContentCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const ContentCreateSchema: ZodType<ContentCreateProps> = ContentCreateArgsSchema;
export const ContentUpsertSchema: ZodType<ContentUpsertProps> = ContentUpsertArgsSchema;
export const ContentUpdateSchema: ZodType<ContentUpdateProps> = ContentUpdateArgsSchema;
export const ContentDeleteSchema: ZodType<ContentDeleteProps> = ContentDeleteArgsSchema;

// Multiple mutations
export const ContentCreateManySchema: ZodType<ContentCreateManyProps> = ContentCreateManyArgsSchema;
export const ContentUpdateManySchema: ZodType<ContentUpdateManyProps> = ContentUpdateManyArgsSchema;
export const ContentDeleteManySchema: ZodType<ContentDeleteManyProps> = ContentDeleteManyArgsSchema;

// Single queries
export const ContentFindFirstSchema: ZodType<ContentFindFirstProps> = ContentFindFirstArgsSchema;
export const ContentFindUniqueSchema: ZodType<ContentFindUniqueProps> = ContentFindUniqueArgsSchema;
export const ContentFindManySchema: ZodType<ContentFindManyProps> = ContentFindManyArgsSchema;

// Aggregate queries
export const ContentCountSchema: ZodType<ContentCountProps> =  z.object({
    where: z.lazy(() => ContentWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ContentOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ContentOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ContentWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type ContentCreateResponse<T extends ContentCreateProps> = Prisma.ContentGetPayload<T>;
export type ContentUpsertResponse<T extends ContentUpsertProps> = Prisma.ContentGetPayload<T>;
export type ContentUpdateResponse<T extends ContentUpdateProps> = Prisma.ContentGetPayload<T>;
export type ContentDeleteResponse<T extends ContentDeleteProps> = Prisma.ContentGetPayload<T>;

// Multiple mutations
export type ContentCreateManyResponse = { count: number };
export type ContentUpdateManyResponse = { count: number };
export type ContentDeleteManyResponse = { count: number };

// Single queries
export type ContentFindFirstResponse<T extends ContentFindFirstProps> = Prisma.ContentGetPayload<T> | null;
export type ContentFindUniqueResponse<T extends ContentFindUniqueProps> = Prisma.ContentGetPayload<T> | null;
export type ContentFindManyResponse<T extends ContentFindManyProps> = Prisma.ContentGetPayload<T>[];

// Aggregate queries
export type ContentCountResponse = ContentCount;
