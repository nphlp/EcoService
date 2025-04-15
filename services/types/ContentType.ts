// ============== Types ============== //

import { Prisma } from "@services/prisma";
import { ContentCreateArgsSchema, ContentDeleteArgsSchema, ContentFindManyArgsSchema, ContentFindUniqueArgsSchema, ContentOrderByWithRelationInputSchema, ContentSchema, ContentUpdateArgsSchema, ContentUpsertArgsSchema, ContentWhereInputSchema, ContentWhereUniqueInputSchema, ContentWithRelationsSchema } from "@services/schemas";
import ContentIncludeSchema from "@services/schemas/inputTypeSchemas/ContentIncludeSchema";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ContentModel = z.infer<typeof ContentSchema>;
export type ContentRelationsOptional = z.infer<typeof ContentSchema> & z.infer<typeof ContentIncludeSchema>;
export type ContentRelationsComplete = z.infer<typeof ContentWithRelationsSchema>;
export type ContentCount = number;

// ============== Props Types ============== //

export type CreateContentProps = Prisma.ContentCreateArgs;
export type UpsertContentProps = Prisma.ContentUpsertArgs;
export type UpdateContentProps = Prisma.ContentUpdateArgs;
export type DeleteContentProps = Prisma.ContentDeleteArgs;
export type FindUniqueContentProps = Prisma.ContentFindUniqueArgs;
export type FindManyContentProps = Prisma.ContentFindManyArgs;
export type CountContentProps = Prisma.ContentCountArgs;

// ============== Schema Types ============== //

export const createContentSchema: ZodType<CreateContentProps> = ContentCreateArgsSchema;
export const upsertContentSchema: ZodType<UpsertContentProps> = ContentUpsertArgsSchema;
export const updateContentSchema: ZodType<UpdateContentProps> = ContentUpdateArgsSchema;
export const deleteContentSchema: ZodType<DeleteContentProps> = ContentDeleteArgsSchema;
export const selectContentSchema: ZodType<FindUniqueContentProps> = ContentFindUniqueArgsSchema;
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
export type FindUniqueContentResponse<T extends FindUniqueContentProps> = Prisma.ContentGetPayload<T> | null;
export type FindManyContentResponse<T extends FindManyContentProps> = Prisma.ContentGetPayload<T>[];
export type CountContentResponse = ContentCount;
