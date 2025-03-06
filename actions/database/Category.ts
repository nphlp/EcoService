"use server";

import {
    CategoryCommon,
    categoryCommonSchema,
    CategoryId,
    categoryIdObjectSchema,
    CategoryType,
    CategoryUpdate,
    categoryUpdateSchema,
    SelectCategoryAmountProps,
    selectCategoryAmountSchema,
    SelectCategoryListProps,
    selectCategoryListSchema,
    selectCategoryObjectSchema,
    SelectCategoryProps,
} from "@actions/types/Category";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

// ========================== //
// ==== Mutation Methods ==== //
// ========================== //

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
            if (error instanceof ZodError) throw new Error("CreateCategory -> Invalid params -> " + error.message);
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
            if (error instanceof ZodError) throw new Error("UpdateCategory -> Invalid params -> " + error.message);
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
            if (error instanceof ZodError) throw new Error("DeleteCategory -> Invalid params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteCategory -> Prisma error -> " + error.message);
            throw new Error("DeleteCategory -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

// ======================== //
// ==== Select Methods ==== //
// ======================== //

/**
 * Retrieves a category by ID or another filter \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Category ID or other filter (name, description...)
 * @returns Found category or null
 */
export const SelectCategory = async (props: SelectCategoryProps): Promise<CategoryType | null> => {
    try {
        const { where } = selectCategoryObjectSchema.parse(props);
        const categoryData: CategoryType | null = await PrismaInstance.category.findUnique({
            where,
        });
        return categoryData;
    } catch (error) {
        console.error("SelectCategory -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of categories with filters \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of categories or null
 */
export const SelectCategoryList = async (props: SelectCategoryListProps): Promise<CategoryType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectCategoryListSchema.parse(props);

        const categoryDataList: CategoryType[] = await PrismaInstance.category.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return categoryDataList.length ? categoryDataList : null;
    } catch (error) {
        console.error("SelectCategoryList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts categories with filters \
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
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
