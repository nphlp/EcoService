// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { CategoryCreateArgsSchema, CategoryCreateManyArgsSchema, CategoryDeleteArgsSchema, CategoryDeleteManyArgsSchema, CategoryFindFirstArgsSchema, CategoryFindManyArgsSchema, CategoryFindUniqueArgsSchema, CategoryOrderByWithRelationInputSchema, CategorySchema, CategoryUpdateArgsSchema, CategoryUpdateManyArgsSchema, CategoryUpsertArgsSchema, CategoryWhereInputSchema, CategoryWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;
export type CategoryCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateCategoryProps = Prisma.CategoryCreateArgs;
export type UpsertCategoryProps = Prisma.CategoryUpsertArgs;
export type UpdateCategoryProps = Prisma.CategoryUpdateArgs;
export type DeleteCategoryProps = Prisma.CategoryDeleteArgs;

// Multiple mutations
export type CreateManyCategoryProps = Prisma.CategoryCreateManyArgs;
export type UpdateManyCategoryProps = Prisma.CategoryUpdateManyArgs;
export type DeleteManyCategoryProps = Prisma.CategoryDeleteManyArgs;

// Single queries
export type FindFirstCategoryProps = Prisma.CategoryFindFirstArgs;
export type FindUniqueCategoryProps = Prisma.CategoryFindUniqueArgs;
export type FindManyCategoryProps = Prisma.CategoryFindManyArgs;

// Multiple queries
export type CountCategoryProps = Prisma.CategoryCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createCategorySchema: ZodType<CreateCategoryProps> = CategoryCreateArgsSchema;
export const upsertCategorySchema: ZodType<UpsertCategoryProps> = CategoryUpsertArgsSchema;
export const updateCategorySchema: ZodType<UpdateCategoryProps> = CategoryUpdateArgsSchema;
export const deleteCategorySchema: ZodType<DeleteCategoryProps> = CategoryDeleteArgsSchema;

// Multiple mutations
export const createManyCategorySchema: ZodType<CreateManyCategoryProps> = CategoryCreateManyArgsSchema;
export const updateManyCategorySchema: ZodType<UpdateManyCategoryProps> = CategoryUpdateManyArgsSchema;
export const deleteManyCategorySchema: ZodType<DeleteManyCategoryProps> = CategoryDeleteManyArgsSchema;

// Single queries
export const selectFirstCategorySchema: ZodType<FindFirstCategoryProps> = CategoryFindFirstArgsSchema;
export const selectUniqueCategorySchema: ZodType<FindUniqueCategoryProps> = CategoryFindUniqueArgsSchema;
export const selectManyCategorySchema: ZodType<FindManyCategoryProps> = CategoryFindManyArgsSchema;

// Aggregate queries
export const countCategorySchema: ZodType<CountCategoryProps> =  z.object({
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
export type CreateCategoryResponse<T extends CreateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpsertCategoryResponse<T extends UpsertCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpdateCategoryResponse<T extends UpdateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type DeleteCategoryResponse<T extends DeleteCategoryProps> = Prisma.CategoryGetPayload<T>;

// Multiple mutations
export type CreateManyCategoryResponse = { count: number };
export type UpdateManyCategoryResponse = { count: number };
export type DeleteManyCategoryResponse = { count: number };

// Single queries
export type FindFirstCategoryResponse<T extends FindFirstCategoryProps> = Prisma.CategoryGetPayload<T> | null;
export type FindUniqueCategoryResponse<T extends FindUniqueCategoryProps> = Prisma.CategoryGetPayload<T> | null;
export type FindManyCategoryResponse<T extends FindManyCategoryProps> = Prisma.CategoryGetPayload<T>[];

// Aggregate queries
export type CountCategoryResponse = CategoryCount;
