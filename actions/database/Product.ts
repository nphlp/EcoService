"use server";

import {
    ProductCommon,
    ProductId,
    ProductType,
    ProductUpdate,
    SelectProductAmountProps,
    SelectProductListProps,
    SelectProductProps,
} from "@actions/types/Product";
import {
    selectProductAmountSchema,
    selectProductListSchema,
    selectProductUniqueSchema,
} from "@actions/zod-sensitive/Product";
import { productCommonSchema, productIdObjectSchema, productUpdateSchema } from "@actions/zod/Product";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Product mutations
 */
export type ProductMutationResponse = {
    productData?: ProductType;
    error?: string;
};

/**
 * Creates a new product
 * @param props Product properties
 * @returns Created product or null
 */
export const CreateProduct = async (props: ProductCommon): Promise<ProductMutationResponse> => {
    try {
        const data = productCommonSchema.parse(props);

        const productData: ProductType = await PrismaInstance.product.create({ data });

        return { productData };
    } catch (error) {
        console.error("CreateProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateProduct -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateProduct -> Prisma error -> " + error.message);
            throw new Error("CreateProduct -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a product
 * @param props Product ID and new data
 * @returns Updated product or null
 */
export const UpdateProduct = async (props: ProductUpdate): Promise<ProductMutationResponse> => {
    try {
        const { id, data } = productUpdateSchema.parse(props);
        const productData: ProductType = await PrismaInstance.product.update({
            where: { id },
            data,
        });
        return { productData };
    } catch (error) {
        console.error("UpdateProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateProduct -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateProduct -> Prisma error -> " + error.message);
            throw new Error("UpdateProduct -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a product
 * @param props Product ID
 * @returns Deleted product or null
 */
export const DeleteProduct = async (props: ProductId): Promise<ProductMutationResponse> => {
    try {
        const { id } = productIdObjectSchema.parse(props);
        const productData: ProductType = await PrismaInstance.product.delete({
            where: { id },
        });
        return { productData };
    } catch (error) {
        console.error("DeleteProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteProduct -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteProduct -> Prisma error -> " + error.message);
            throw new Error("DeleteProduct -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a product by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Product ID or other filter (name, description...)
 * @returns Found product or null
 */
export const SelectProduct = async (props: SelectProductProps): Promise<ProductType | null> => {
    try {
        const { where, select } = selectProductUniqueSchema.parse(props);
        const productData: ProductType | null = await PrismaInstance.product.findUnique({
            where,
            ...(select && { select }),
        });
        return productData;
    } catch (error) {
        console.error("SelectProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectProduct -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectProduct -> Prisma error -> " + error.message);
            throw new Error("SelectProduct -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of products with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of products or null
 */
export const SelectProductList = async (props: SelectProductListProps): Promise<ProductType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectProductListSchema.parse(props);

        const productDataList: ProductType[] = await PrismaInstance.product.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return productDataList.length ? productDataList : null;
    } catch (error) {
        console.error("SelectProductList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectProductList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectProductList -> Prisma error -> " + error.message);
            throw new Error("SelectProductList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts products with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of products or null
 */
export const SelectProductAmount = async (props: SelectProductAmountProps): Promise<number | null> => {
    try {
        const { where } = selectProductAmountSchema.parse(props);

        const productAmount = await PrismaInstance.product.count({
            ...(where && { where }),
        });

        return productAmount;
    } catch (error) {
        console.error("SelectProductAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectProductAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectProductAmount -> Prisma error -> " + error.message);
            throw new Error("SelectProductAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
