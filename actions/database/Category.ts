"use server";

import {
    CategoryCommon,
    CategoryId,
    CategoryType,
    CategoryUpdate,
    SelectCategoryAmountProps,
    SelectCategoryListProps,
    SelectCategoryProps,
} from "@actions/types/Category";
import {
    selectCategoryAmountSchema,
    selectCategoryListSchema,
    selectCategoryUniqueSchema,
} from "@actions/zod-sensitive/Category";
import { categoryCommonSchema, categoryIdObjectSchema, categoryUpdateSchema } from "@actions/zod/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Category mutations
 */
export type CategoryMutationResponse = {
    categoryData?: CategoryType;
    error?: string;
};

/**
 * Creates a new category
 * @param props Category properties
 * @returns Created category or null
 */
export const CreateCategory = async (props: CategoryCommon): Promise<CategoryMutationResponse> => {
    try {
        const data = categoryCommonSchema.parse(props);

        const categoryData: CategoryType = await PrismaInstance.category.create({ data });

        return { categoryData };
    } catch (error) {
        console.error("CreateCategory -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateCategory -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateCategory -> Prisma error -> " + error.message);
            throw new Error("CreateCategory -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a category
 * @param props Category ID and new data
 * @returns Updated category or null
 */
export const UpdateCategory = async (props: CategoryUpdate): Promise<CategoryMutationResponse> => {
    try {
        const { id, data } = categoryUpdateSchema.parse(props);
        const categoryData: CategoryType = await PrismaInstance.category.update({
            where: { id },
            data,
        });
        return { categoryData };
    } catch (error) {
        console.error("UpdateCategory -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateCategory -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateCategory -> Prisma error -> " + error.message);
            throw new Error("UpdateCategory -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a category
 * @param props Category ID
 * @returns Deleted category or null
 */
export const DeleteCategory = async (props: CategoryId): Promise<CategoryMutationResponse> => {
    try {
        const { id } = categoryIdObjectSchema.parse(props);
        const categoryData: CategoryType = await PrismaInstance.category.delete({
            where: { id },
        });
        return { categoryData };
    } catch (error) {
        console.error("DeleteCategory -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteCategory -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteCategory -> Prisma error -> " + error.message);
            throw new Error("DeleteCategory -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a category by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Category ID or other filter (name, description...)
 * @returns Found category or null
 */
export const SelectCategory = async (props: SelectCategoryProps): Promise<CategoryType | null> => {
    try {
        const { where, select } = selectCategoryUniqueSchema.parse(props);
        const categoryData: CategoryType | null = await PrismaInstance.category.findUnique({
            where,
            ...(select && { select }),
        });
        return categoryData;
    } catch (error) {
        console.error("SelectCategory -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectCategory -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectCategory -> Prisma error -> " + error.message);
            throw new Error("SelectCategory -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of categories with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of categories or null
 */
export const SelectCategoryList = async (props: SelectCategoryListProps): Promise<CategoryType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectCategoryListSchema.parse(props);

        const categoryDataList: CategoryType[] = await PrismaInstance.category.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return categoryDataList.length ? categoryDataList : null;
    } catch (error) {
        console.error("SelectCategoryList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectCategoryList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectCategoryList -> Prisma error -> " + error.message);
            throw new Error("SelectCategoryList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts categories with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of categories or null
 */
export const SelectCategoryAmount = async (props: SelectCategoryAmountProps): Promise<number | null> => {
    try {
        const { where } = selectCategoryAmountSchema.parse(props);

        const categoryAmount = await PrismaInstance.category.count({
            ...(where && { where }),
        });

        return categoryAmount;
    } catch (error) {
        console.error("SelectCategoryAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectCategoryAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectCategoryAmount -> Prisma error -> " + error.message);
            throw new Error("SelectCategoryAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
