// ============== Types ============== //

import { Prisma } from "@services/prisma";
import { CategoryCreateArgsSchema, CategoryDeleteArgsSchema, CategoryFindManyArgsSchema, CategoryFindUniqueArgsSchema, CategoryOrderByWithRelationInputSchema, CategorySchema, CategoryUpdateArgsSchema, CategoryUpsertArgsSchema, CategoryWhereInputSchema, CategoryWhereUniqueInputSchema, CategoryWithRelationsSchema } from "@services/schemas";
import CategoryIncludeSchema from "@services/schemas/inputTypeSchemas/CategoryIncludeSchema";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type CategoryModel = z.infer<typeof CategorySchema>;
export type CategoryRelationsOptional = z.infer<typeof CategorySchema> & z.infer<typeof CategoryIncludeSchema>;
export type CategoryRelationsComplete = z.infer<typeof CategoryWithRelationsSchema>;
export type CategoryCount = number;

// ============== Props Types ============== //

export type CreateCategoryProps = Prisma.CategoryCreateArgs;
export type UpsertCategoryProps = Prisma.CategoryUpsertArgs;
export type UpdateCategoryProps = Prisma.CategoryUpdateArgs;
export type DeleteCategoryProps = Prisma.CategoryDeleteArgs;
export type FindUniqueCategoryProps = Prisma.CategoryFindUniqueArgs;
export type FindManyCategoryProps = Prisma.CategoryFindManyArgs;
export type CountCategoryProps = Prisma.CategoryCountArgs;

// ============== Schema Types ============== //

export const createCategorySchema: ZodType<CreateCategoryProps> = CategoryCreateArgsSchema;
export const upsertCategorySchema: ZodType<UpsertCategoryProps> = CategoryUpsertArgsSchema;
export const updateCategorySchema: ZodType<UpdateCategoryProps> = CategoryUpdateArgsSchema;
export const deleteCategorySchema: ZodType<DeleteCategoryProps> = CategoryDeleteArgsSchema;
export const selectCategorySchema: ZodType<FindUniqueCategoryProps> = CategoryFindUniqueArgsSchema;
export const selectManyCategorySchema: ZodType<FindManyCategoryProps> = CategoryFindManyArgsSchema;
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

export type CreateCategoryResponse<T extends CreateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpsertCategoryResponse<T extends UpsertCategoryProps> = Prisma.CategoryGetPayload<T>;
export type UpdateCategoryResponse<T extends UpdateCategoryProps> = Prisma.CategoryGetPayload<T>;
export type DeleteCategoryResponse<T extends DeleteCategoryProps> = Prisma.CategoryGetPayload<T>;
export type FindUniqueCategoryResponse<T extends FindUniqueCategoryProps> = Prisma.CategoryGetPayload<T> | null;
export type FindManyCategoryResponse<T extends FindManyCategoryProps> = Prisma.CategoryGetPayload<T>[];
export type CountCategoryResponse = CategoryCount;
