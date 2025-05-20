// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { ProductCreateArgsSchema, ProductCreateManyArgsSchema, ProductDeleteArgsSchema, ProductDeleteManyArgsSchema, ProductFindFirstArgsSchema, ProductFindManyArgsSchema, ProductFindUniqueArgsSchema, ProductOrderByWithRelationInputSchema, ProductSchema, ProductUpdateArgsSchema, ProductUpdateManyArgsSchema, ProductUpsertArgsSchema, ProductWhereInputSchema, ProductWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductCount = number;

// ============== Props Types ============== //

// Single mutations
export type ProductCreateProps = Prisma.ProductCreateArgs;
export type ProductUpsertProps = Prisma.ProductUpsertArgs;
export type ProductUpdateProps = Prisma.ProductUpdateArgs;
export type ProductDeleteProps = Prisma.ProductDeleteArgs;

// Multiple mutations
export type ProductCreateManyProps = Prisma.ProductCreateManyArgs;
export type ProductUpdateManyProps = Prisma.ProductUpdateManyArgs;
export type ProductDeleteManyProps = Prisma.ProductDeleteManyArgs;

// Single queries
export type ProductFindFirstProps = Prisma.ProductFindFirstArgs;
export type ProductFindUniqueProps = Prisma.ProductFindUniqueArgs;
export type ProductFindManyProps = Prisma.ProductFindManyArgs;

// Multiple queries
export type ProductCountProps = Prisma.ProductCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const ProductCreateSchema: ZodType<ProductCreateProps> = ProductCreateArgsSchema;
export const ProductUpsertSchema: ZodType<ProductUpsertProps> = ProductUpsertArgsSchema;
export const ProductUpdateSchema: ZodType<ProductUpdateProps> = ProductUpdateArgsSchema;
export const ProductDeleteSchema: ZodType<ProductDeleteProps> = ProductDeleteArgsSchema;

// Multiple mutations
export const ProductCreateManySchema: ZodType<ProductCreateManyProps> = ProductCreateManyArgsSchema;
export const ProductUpdateManySchema: ZodType<ProductUpdateManyProps> = ProductUpdateManyArgsSchema;
export const ProductDeleteManySchema: ZodType<ProductDeleteManyProps> = ProductDeleteManyArgsSchema;

// Single queries
export const ProductFindFirstSchema: ZodType<ProductFindFirstProps> = ProductFindFirstArgsSchema;
export const ProductFindUniqueSchema: ZodType<ProductFindUniqueProps> = ProductFindUniqueArgsSchema;
export const ProductFindManySchema: ZodType<ProductFindManyProps> = ProductFindManyArgsSchema;

// Aggregate queries
export const ProductCountSchema: ZodType<ProductCountProps> =  z.object({
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
export type ProductCreateResponse<T extends ProductCreateProps> = Prisma.ProductGetPayload<T>;
export type ProductUpsertResponse<T extends ProductUpsertProps> = Prisma.ProductGetPayload<T>;
export type ProductUpdateResponse<T extends ProductUpdateProps> = Prisma.ProductGetPayload<T>;
export type ProductDeleteResponse<T extends ProductDeleteProps> = Prisma.ProductGetPayload<T>;

// Multiple mutations
export type ProductCreateManyResponse = { count: number };
export type ProductUpdateManyResponse = { count: number };
export type ProductDeleteManyResponse = { count: number };

// Single queries
export type ProductFindFirstResponse<T extends ProductFindFirstProps> = Prisma.ProductGetPayload<T> | null;
export type ProductFindUniqueResponse<T extends ProductFindUniqueProps> = Prisma.ProductGetPayload<T> | null;
export type ProductFindManyResponse<T extends ProductFindManyProps> = Prisma.ProductGetPayload<T>[];

// Aggregate queries
export type ProductCountResponse = ProductCount;
