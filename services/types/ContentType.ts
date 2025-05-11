// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ContentCreateArgsSchema, ContentCreateManyArgsSchema, ContentDeleteArgsSchema, ContentDeleteManyArgsSchema, ContentFindFirstArgsSchema, ContentFindManyArgsSchema, ContentFindUniqueArgsSchema, ContentOrderByWithRelationInputSchema, ContentSchema, ContentUpdateArgsSchema, ContentUpdateManyArgsSchema, ContentUpsertArgsSchema, ContentWhereInputSchema, ContentWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;
export type ContentCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateContentProps = Prisma.ContentCreateArgs;
export type UpsertContentProps = Prisma.ContentUpsertArgs;
export type UpdateContentProps = Prisma.ContentUpdateArgs;
export type DeleteContentProps = Prisma.ContentDeleteArgs;

// Multiple mutations
export type CreateManyContentProps = Prisma.ContentCreateManyArgs;
export type UpdateManyContentProps = Prisma.ContentUpdateManyArgs;
export type DeleteManyContentProps = Prisma.ContentDeleteManyArgs;

// Single queries
export type FindFirstContentProps = Prisma.ContentFindFirstArgs;
export type FindUniqueContentProps = Prisma.ContentFindUniqueArgs;
export type FindManyContentProps = Prisma.ContentFindManyArgs;

// Multiple queries
export type CountContentProps = Prisma.ContentCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createContentSchema: ZodType<CreateContentProps> = ContentCreateArgsSchema;
export const upsertContentSchema: ZodType<UpsertContentProps> = ContentUpsertArgsSchema;
export const updateContentSchema: ZodType<UpdateContentProps> = ContentUpdateArgsSchema;
export const deleteContentSchema: ZodType<DeleteContentProps> = ContentDeleteArgsSchema;

// Multiple mutations
export const createManyContentSchema: ZodType<CreateManyContentProps> = ContentCreateManyArgsSchema;
export const updateManyContentSchema: ZodType<UpdateManyContentProps> = ContentUpdateManyArgsSchema;
export const deleteManyContentSchema: ZodType<DeleteManyContentProps> = ContentDeleteManyArgsSchema;

// Single queries
export const selectFirstContentSchema: ZodType<FindFirstContentProps> = ContentFindFirstArgsSchema;
export const selectUniqueContentSchema: ZodType<FindUniqueContentProps> = ContentFindUniqueArgsSchema;
export const selectManyContentSchema: ZodType<FindManyContentProps> = ContentFindManyArgsSchema;

// Aggregate queries
export const countContentSchema: ZodType<CountContentProps> =  z.object({
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
export type CreateContentResponse<T extends CreateContentProps> = Prisma.ContentGetPayload<T>;
export type UpsertContentResponse<T extends UpsertContentProps> = Prisma.ContentGetPayload<T>;
export type UpdateContentResponse<T extends UpdateContentProps> = Prisma.ContentGetPayload<T>;
export type DeleteContentResponse<T extends DeleteContentProps> = Prisma.ContentGetPayload<T>;

// Multiple mutations
export type CreateManyContentResponse = { count: number };
export type UpdateManyContentResponse = { count: number };
export type DeleteManyContentResponse = { count: number };

// Single queries
export type FindFirstContentResponse<T extends FindFirstContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindUniqueContentResponse<T extends FindUniqueContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindManyContentResponse<T extends FindManyContentProps> = Prisma.ContentGetPayload<T>[];

// Aggregate queries
export type CountContentResponse = ContentCount;
