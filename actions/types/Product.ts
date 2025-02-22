import { Prisma, Product } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Product Types ==== //
// ======================= //

/** Represents a complete product entity */
export type ProductType = Product;

/** Represents the product's unique identifier */
export type ProductId = Pick<Product, "id">;

/** Represents common product properties without system-managed fields */
export type ProductCommon = Omit<Product, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a product */
export type ProductUpdate = {
    id: Product["id"];
    data: ProductCommon;
};

/** Represents system-managed timestamp fields */
export type ProductTimestamps = Pick<Product, "createdAt" | "updatedAt">;

/** Find many options for products */
export type SelectProductListProps = Pick<
    Prisma.ProductFindManyArgs,
    "orderBy" | "take" | "skip" | "where"
>;

/** Count options for products */
export type SelectProductAmountProps = Pick<Prisma.ProductCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const productIdSchema: ZodString = z.string().nanoid();

export const productIdObjectSchema: ZodType<ProductId> = z.object({
    id: z.string().nanoid(),
});

export const productCommonSchema: ZodType<ProductCommon> = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    price: z.number(),
    stock: z.number(),
    vendorId: z.string(),
    categoryId: z.string(),
});

export const productTimestampsSchema: ZodType<ProductTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const productUpdateSchema: ZodType<ProductUpdate> = z.object({
    id: productIdSchema,
    data: productCommonSchema,
});

export const selectProductListSchema: ZodType<SelectProductListProps> =
    z.object({
        orderBy: z
            .object({
                price: z.enum(["asc", "desc"]),
            })
            .optional(),
        take: z.number().min(1).max(100).optional(),
        skip: z.number().min(0).optional(),
        where: z
            .object({
                categoryId: z.string().optional(),
                name: z.object({
                    contains: z.string(),
                }).optional(),
            })
            .optional(),
    });

export const selectProductAmountSchema: ZodType<SelectProductAmountProps> =
    z.object({
        where: z
            .object({
                categoryId: z.string().optional(),
                name: z.object({
                    contains: z.string(),
                }).optional(),
            })
            .optional(),
    });
