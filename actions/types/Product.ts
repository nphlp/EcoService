import { RelatedProductModel } from "@actions/zod-generated";
import { Prisma, Product } from "@prisma/client";
import { z } from "zod";

/** Represents the Product's model with relations */
export type ProductType = z.infer<typeof RelatedProductModel>;

/** Represents the Product's unique identifier */
export type ProductId = Pick<Product, "id">;

/** Represents common Product properties without system-managed fields */
export type ProductCommon = Omit<Product, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Product */
export type ProductUpdate = {
    id: Product["id"];
    data: ProductCommon;
};

/** Represents system-managed timestamp fields */
export type ProductTimestamps = Pick<Product, "createdAt" | "updatedAt">;

/** Find one options for Products */
export type SelectProductProps = Pick<Prisma.ProductFindUniqueArgs, "where" | "select">;

/** Find many options for Products */
export type SelectProductListProps = Pick<Prisma.ProductFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Products */
export type SelectProductAmountProps = Pick<Prisma.ProductCountArgs, "where">;
