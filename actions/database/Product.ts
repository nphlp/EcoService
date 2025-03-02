"use server";

import {
    ProductCommon,
    productCommonSchema,
    ProductId,
    productIdObjectSchema,
    ProductType,
    ProductUpdate,
    productUpdateSchema
} from "@actions/types/Product";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export type ProductMutationResponse = {
    productData?: ProductType;
    error?: string;
};

/**
 * Creates a new product
 * @param props Product properties
 * @returns Created product
 * @error Returns null
 */
export const CreateProduct = async (props: ProductCommon): Promise<ProductMutationResponse> => {
    try {
        const data = productCommonSchema.parse(props);

        const productData: ProductType = await PrismaInstance.product.create({
            data,
        });

        return { productData };
    } catch (error) {
        console.error("CreateProduct -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateProduct -> Invalid params -> " + error.message);
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
 * @returns Updated product
 * @error Returns null
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
            if (error instanceof ZodError) throw new Error("UpdateProduct -> Invalid params -> " + error.message);
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
 * @returns Deleted product
 * @error Returns null
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
            if (error instanceof ZodError) throw new Error("DeleteProduct -> Invalid params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteProduct -> Prisma error -> " + error.message);
            throw new Error("DeleteProduct -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a product by ID
 * @param props Product ID
 * @returns Found product or null
 */
// export const SelectProduct = async (props: ProductId): Promise<ProductType | null> => {
//     try {
//         const { id } = productIdObjectSchema.parse(props);

//         const productData: ProductType | null = await PrismaInstance.product.findUnique({
//             where: { id },
//         });

//         return productData;
//     } catch (error) {
//         console.error("SelectProduct -> " + (error as Error).message);
//         if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
//             return null;
//         }
//         throw new Error("Something went wrong...");
//     }
// };

/**
 * Retrieves a list of products with filters
 * @param props Filter and pagination options
 * @returns List of products or null
 */
// export const SelectProductList = async (props: SelectProductListProps): Promise<ProductType[] | null> => {
//     try {
//         const { orderBy, take = 10, skip = 0, where } = selectProductListSchema.parse(props);

//         const productDataList: ProductType[] = await PrismaInstance.product.findMany({
//             ...(orderBy && { orderBy }),
//             ...(take && { take }),
//             ...(skip && { skip }),
//             ...(where && { where }),
//         });

//         return productDataList.length ? productDataList : null;
//     } catch (error) {
//         console.error("SelectProductList -> " + (error as Error).message);
//         if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
//             return null;
//         }
//         throw new Error("Something went wrong...");
//     }
// };

/**
 * Counts products with filters
 * @param props Filter options
 * @returns Count of products or null
 */
// export const SelectProductAmount = async (props: SelectProductAmountProps): Promise<number | null> => {
//     try {
//         const { where } = selectProductAmountSchema.parse(props);

//         const productAmount: number | null = await PrismaInstance.product.count({
//             ...(where && { where }),
//         });

//         return productAmount ? productAmount : null;
//     } catch (error) {
//         console.error("SelectProductAmount -> " + (error as Error).message);
//         if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
//             return null;
//         }
//         throw new Error("Something went wrong...");
//     }
// };
