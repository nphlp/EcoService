// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ProductCreateArgsSchema, ProductCreateManyArgsSchema, ProductDeleteArgsSchema, ProductDeleteManyArgsSchema, ProductFindFirstArgsSchema, ProductFindManyArgsSchema, ProductFindUniqueArgsSchema, ProductOrderByWithRelationInputSchema, ProductSchema, ProductUpdateArgsSchema, ProductUpdateManyArgsSchema, ProductUpsertArgsSchema, ProductWhereInputSchema, ProductWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateProductProps = Prisma.ProductCreateArgs;
export type UpsertProductProps = Prisma.ProductUpsertArgs;
export type UpdateProductProps = Prisma.ProductUpdateArgs;
export type DeleteProductProps = Prisma.ProductDeleteArgs;

// Multiple mutations
export type CreateManyProductProps = Prisma.ProductCreateManyArgs;
export type UpdateManyProductProps = Prisma.ProductUpdateManyArgs;
export type DeleteManyProductProps = Prisma.ProductDeleteManyArgs;

// Single queries
export type FindFirstProductProps = Prisma.ProductFindFirstArgs;
export type FindUniqueProductProps = Prisma.ProductFindUniqueArgs;
export type FindManyProductProps = Prisma.ProductFindManyArgs;

// Multiple queries
export type CountProductProps = Prisma.ProductCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createProductSchema: ZodType<CreateProductProps> = ProductCreateArgsSchema;
export const upsertProductSchema: ZodType<UpsertProductProps> = ProductUpsertArgsSchema;
export const updateProductSchema: ZodType<UpdateProductProps> = ProductUpdateArgsSchema;
export const deleteProductSchema: ZodType<DeleteProductProps> = ProductDeleteArgsSchema;

// Multiple mutations
export const createManyProductSchema: ZodType<CreateManyProductProps> = ProductCreateManyArgsSchema;
export const updateManyProductSchema: ZodType<UpdateManyProductProps> = ProductUpdateManyArgsSchema;
export const deleteManyProductSchema: ZodType<DeleteManyProductProps> = ProductDeleteManyArgsSchema;

// Single queries
export const selectFirstProductSchema: ZodType<FindFirstProductProps> = ProductFindFirstArgsSchema;
export const selectUniqueProductSchema: ZodType<FindUniqueProductProps> = ProductFindUniqueArgsSchema;
export const selectManyProductSchema: ZodType<FindManyProductProps> = ProductFindManyArgsSchema;

// Aggregate queries
export const countProductSchema: ZodType<CountProductProps> =  z.object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ProductOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ProductOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type CreateProductResponse<T extends CreateProductProps> = Prisma.ProductGetPayload<T>;
export type UpsertProductResponse<T extends UpsertProductProps> = Prisma.ProductGetPayload<T>;
export type UpdateProductResponse<T extends UpdateProductProps> = Prisma.ProductGetPayload<T>;
export type DeleteProductResponse<T extends DeleteProductProps> = Prisma.ProductGetPayload<T>;

// Multiple mutations
export type CreateManyProductResponse = { count: number };
export type UpdateManyProductResponse = { count: number };
export type DeleteManyProductResponse = { count: number };

// Single queries
export type FindFirstProductResponse<T extends FindFirstProductProps> = Prisma.ProductGetPayload<T> | null;
export type FindUniqueProductResponse<T extends FindUniqueProductProps> = Prisma.ProductGetPayload<T> | null;
export type FindManyProductResponse<T extends FindManyProductProps> = Prisma.ProductGetPayload<T>[];

// Aggregate queries
export type CountProductResponse = ProductCount;
