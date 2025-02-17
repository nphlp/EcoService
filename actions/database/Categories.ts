"use server";

import PrismaInstance from "@lib/prisma";
import {
    CategoryCommon,
    categoryCommonSchema,
    CategoryId,
    categoryIdObjectSchema,
    CategoryType,
    CategoryUpdate,
    categoryUpdateSchema,
} from "@actions/types/Category";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

/**
 * Creates a new category in the database
 * @param props - The category properties to create
 * @returns Promise resolving to the created category or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateCategory = async (
    props: CategoryCommon,
): Promise<CategoryType | null> => {
    try {
        const data = categoryCommonSchema.parse(props);
        const categoryData: CategoryType = await PrismaInstance.category.create(
            {
                data,
            },
        );
        return categoryData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateCategory -> ", error);
            return null;
        }
        throw new Error("CreateCategory -> " + (error as Error).message);
    }
};

/**
 * Retrieves a category by its ID
 * @param props - Object containing the category ID
 * @returns Promise resolving to the found category or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectCategory = async (props: {
    id: CategoryId;
}): Promise<CategoryType | null> => {
    try {
        const { id } = categoryIdObjectSchema.parse(props);
        const categoryData: CategoryType | null =
            await PrismaInstance.category.findUnique({
                where: { id },
            });
        return categoryData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectCategory -> ", error);
            return null;
        }
        throw new Error("SelectCategory -> " + (error as Error).message);
    }
};

type SelectCategoryListProps = Pick<
    Prisma.CategoryFindManyArgs,
    "orderBy" | "take" | "skip"
>;

/**
 * Retrieves all categories from the database
 * @returns Promise resolving to an array of categories or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectCategoryList = async (
    props: SelectCategoryListProps,
): Promise<CategoryType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0 } = props;
        const categoryDataList: CategoryType[] =
            await PrismaInstance.category.findMany({
                orderBy,
                take,
                skip,
            });
        return categoryDataList.length ? categoryDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectCategoryList -> ", error);
            return null;
        }
        throw new Error("SelectCategoryList -> " + (error as Error).message);
    }
};

/**
 * Retrieves the total number of categories in the database
 * @returns Promise resolving to the total number of categories or null if an error occurs
 * @throws Error if an unexpected error occurs
 */
export const SelectCategoryAmount = async (): Promise<number | null> => {
    try {
        const categoryDataList = await PrismaInstance.category.count();
        return categoryDataList;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectCategoryAmount -> ", error);
            return null;
        }
        throw new Error("SelectCategoryAmount -> " + (error as Error).message);
    }
};

/**
 * Updates a category's information in the database
 * @param props - Object containing the category ID and updated data
 * @returns Promise resolving to the updated category or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateCategory = async (
    props: CategoryUpdate,
): Promise<CategoryType | null> => {
    try {
        const { id, data } = categoryUpdateSchema.parse(props);
        const categoryData: CategoryType = await PrismaInstance.category.update(
            {
                where: { id },
                data,
            },
        );
        return categoryData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateCategory -> ", error);
            return null;
        }
        throw new Error("UpdateCategory -> " + (error as Error).message);
    }
};

/**
 * Deletes a category from the database
 * @param props - Object containing the category ID to delete
 * @returns Promise resolving to the deleted category or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteCategory = async (props: {
    id: CategoryId;
}): Promise<CategoryType | null> => {
    try {
        const { id } = categoryIdObjectSchema.parse(props);
        const categoryData: CategoryType = await PrismaInstance.category.delete(
            {
                where: { id },
            },
        );
        return categoryData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteCategory -> ", error);
            return null;
        }
        throw new Error("DeleteCategory -> " + (error as Error).message);
    }
};
