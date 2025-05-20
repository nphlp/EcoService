// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { CategoryCreateArgsSchema, CategoryCreateManyArgsSchema, CategoryDeleteArgsSchema, CategoryDeleteManyArgsSchema, CategoryFindFirstArgsSchema, CategoryFindManyArgsSchema, CategoryFindUniqueArgsSchema, CategoryOrderByWithRelationInputSchema, CategorySchema, CategoryUpdateArgsSchema, CategoryUpdateManyArgsSchema, CategoryUpsertArgsSchema, CategoryWhereInputSchema, CategoryWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;
export type CategoryCount = number;

// ============== Props Types ============== //

// Single mutations
export type CategoryCreateProps = Prisma.CategoryCreateArgs;
export type CategoryUpsertProps = Prisma.CategoryUpsertArgs;
export type CategoryUpdateProps = Prisma.CategoryUpdateArgs;
export type CategoryDeleteProps = Prisma.CategoryDeleteArgs;

// Multiple mutations
export type CategoryCreateManyProps = Prisma.CategoryCreateManyArgs;
export type CategoryUpdateManyProps = Prisma.CategoryUpdateManyArgs;
export type CategoryDeleteManyProps = Prisma.CategoryDeleteManyArgs;

// Single queries
export type CategoryFindFirstProps = Prisma.CategoryFindFirstArgs;
export type CategoryFindUniqueProps = Prisma.CategoryFindUniqueArgs;
export type CategoryFindManyProps = Prisma.CategoryFindManyArgs;

// Multiple queries
export type CategoryCountProps = Prisma.CategoryCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const CategoryCreateSchema: ZodType<CategoryCreateProps> = CategoryCreateArgsSchema;
export const CategoryUpsertSchema: ZodType<CategoryUpsertProps> = CategoryUpsertArgsSchema;
export const CategoryUpdateSchema: ZodType<CategoryUpdateProps> = CategoryUpdateArgsSchema;
export const CategoryDeleteSchema: ZodType<CategoryDeleteProps> = CategoryDeleteArgsSchema;

// Multiple mutations
export const CategoryCreateManySchema: ZodType<CategoryCreateManyProps> = CategoryCreateManyArgsSchema;
export const CategoryUpdateManySchema: ZodType<CategoryUpdateManyProps> = CategoryUpdateManyArgsSchema;
export const CategoryDeleteManySchema: ZodType<CategoryDeleteManyProps> = CategoryDeleteManyArgsSchema;

// Single queries
export const CategoryFindFirstSchema: ZodType<CategoryFindFirstProps> = CategoryFindFirstArgsSchema;
export const CategoryFindUniqueSchema: ZodType<CategoryFindUniqueProps> = CategoryFindUniqueArgsSchema;
export const CategoryFindManySchema: ZodType<CategoryFindManyProps> = CategoryFindManyArgsSchema;

// Aggregate queries
export const CategoryCountSchema: ZodType<CategoryCountProps> =  z.object({
    where: z.lazy(() => CategoryWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => CategoryOrderByWithRelationInputSchema),
        z.array(z.lazy(() => CategoryOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type CategoryCreateResponse<T extends CategoryCreateProps> = Prisma.CategoryGetPayload<T>;
export type CategoryUpsertResponse<T extends CategoryUpsertProps> = Prisma.CategoryGetPayload<T>;
export type CategoryUpdateResponse<T extends CategoryUpdateProps> = Prisma.CategoryGetPayload<T>;
export type CategoryDeleteResponse<T extends CategoryDeleteProps> = Prisma.CategoryGetPayload<T>;

// Multiple mutations
export type CategoryCreateManyResponse = { count: number };
export type CategoryUpdateManyResponse = { count: number };
export type CategoryDeleteManyResponse = { count: number };

// Single queries
export type CategoryFindFirstResponse<T extends CategoryFindFirstProps> = Prisma.CategoryGetPayload<T> | null;
export type CategoryFindUniqueResponse<T extends CategoryFindUniqueProps> = Prisma.CategoryGetPayload<T> | null;
export type CategoryFindManyResponse<T extends CategoryFindManyProps> = Prisma.CategoryGetPayload<T>[];

// Aggregate queries
export type CategoryCountResponse = CategoryCount;
