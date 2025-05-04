// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ContentCreateArgsSchema, ContentDeleteArgsSchema, ContentFindFirstArgsSchema, ContentFindManyArgsSchema, ContentFindUniqueArgsSchema, ContentOrderByWithRelationInputSchema, ContentSchema, ContentUpdateArgsSchema, ContentUpsertArgsSchema, ContentWhereInputSchema, ContentWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;
export type ContentCount = number;

// ============== Props Types ============== //

export type CreateContentProps = Prisma.ContentCreateArgs;
export type UpsertContentProps = Prisma.ContentUpsertArgs;
export type UpdateContentProps = Prisma.ContentUpdateArgs;
export type DeleteContentProps = Prisma.ContentDeleteArgs;
export type FindFirstContentProps = Prisma.ContentFindFirstArgs;
export type FindUniqueContentProps = Prisma.ContentFindUniqueArgs;
export type FindManyContentProps = Prisma.ContentFindManyArgs;
export type CountContentProps = Prisma.ContentCountArgs;

// ============== Schema Types ============== //

export const createContentSchema: ZodType<CreateContentProps> = ContentCreateArgsSchema;
export const upsertContentSchema: ZodType<UpsertContentProps> = ContentUpsertArgsSchema;
export const updateContentSchema: ZodType<UpdateContentProps> = ContentUpdateArgsSchema;
export const deleteContentSchema: ZodType<DeleteContentProps> = ContentDeleteArgsSchema;
export const selectFirstContentSchema: ZodType<FindFirstContentProps> = ContentFindFirstArgsSchema;
export const selectUniqueContentSchema: ZodType<FindUniqueContentProps> = ContentFindUniqueArgsSchema;
export const selectManyContentSchema: ZodType<FindManyContentProps> = ContentFindManyArgsSchema;
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

export type CreateContentResponse<T extends CreateContentProps> = Prisma.ContentGetPayload<T>;
export type UpsertContentResponse<T extends UpsertContentProps> = Prisma.ContentGetPayload<T>;
export type UpdateContentResponse<T extends UpdateContentProps> = Prisma.ContentGetPayload<T>;
export type DeleteContentResponse<T extends DeleteContentProps> = Prisma.ContentGetPayload<T>;
export type FindFirstContentResponse<T extends FindFirstContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindUniqueContentResponse<T extends FindUniqueContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindManyContentResponse<T extends FindManyContentProps> = Prisma.ContentGetPayload<T>[];
export type CountContentResponse = ContentCount;
