// ============== Types ============== //

import { Prisma } from "@services/prisma";
import { ProductCreateArgsSchema, ProductDeleteArgsSchema, ProductFindManyArgsSchema, ProductFindUniqueArgsSchema, ProductOrderByWithRelationInputSchema, ProductSchema, ProductUpdateArgsSchema, ProductUpsertArgsSchema, ProductWhereInputSchema, ProductWhereUniqueInputSchema, ProductWithRelationsSchema } from "@services/schemas";
import ProductIncludeSchema from "@services/schemas/inputTypeSchemas/ProductIncludeSchema";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductRelationsOptional = z.infer<typeof ProductSchema> & z.infer<typeof ProductIncludeSchema>;
export type ProductRelationsComplete = z.infer<typeof ProductWithRelationsSchema>;
export type ProductCount = number;

// ============== Props Types ============== //

export type CreateProductProps = Prisma.ProductCreateArgs;
export type UpsertProductProps = Prisma.ProductUpsertArgs;
export type UpdateProductProps = Prisma.ProductUpdateArgs;
export type DeleteProductProps = Prisma.ProductDeleteArgs;
export type FindUniqueProductProps = Prisma.ProductFindUniqueArgs;
export type FindManyProductProps = Prisma.ProductFindManyArgs;
export type CountProductProps = Prisma.ProductCountArgs;

// ============== Schema Types ============== //

export const createProductSchema: ZodType<CreateProductProps> = ProductCreateArgsSchema;
export const upsertProductSchema: ZodType<UpsertProductProps> = ProductUpsertArgsSchema;
export const updateProductSchema: ZodType<UpdateProductProps> = ProductUpdateArgsSchema;
export const deleteProductSchema: ZodType<DeleteProductProps> = ProductDeleteArgsSchema;
export const selectProductSchema: ZodType<FindUniqueProductProps> = ProductFindUniqueArgsSchema;
export const selectManyProductSchema: ZodType<FindManyProductProps> = ProductFindManyArgsSchema;
export const countProductSchema: ZodType<CountProductProps> =  z.object({
    where: z.lazy(() => ProductWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => ProductOrderByWithRelationInputSchema),
        z.array(z.lazy(() => ProductOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== Response Types ============== //

export type CreateProductResponse<T extends CreateProductProps> = Prisma.ProductGetPayload<T>;
export type UpsertProductResponse<T extends UpsertProductProps> = Prisma.ProductGetPayload<T>;
export type UpdateProductResponse<T extends UpdateProductProps> = Prisma.ProductGetPayload<T>;
export type DeleteProductResponse<T extends DeleteProductProps> = Prisma.ProductGetPayload<T>;
export type FindUniqueProductResponse<T extends FindUniqueProductProps> = Prisma.ProductGetPayload<T> | null;
export type FindManyProductResponse<T extends FindManyProductProps> = Prisma.ProductGetPayload<T>[];
export type CountProductResponse = ProductCount;
