"use server";

import {
    FruitCommon,
    FruitId,
    FruitType,
    FruitUpdate,
    SelectFruitAmountProps,
    SelectFruitListProps,
    SelectFruitProps,
} from "@actions/types/Fruit";
import {
    selectFruitAmountSchema,
    selectFruitListSchema,
    selectFruitUniqueSchema,
} from "@actions/zod-sensitive/Fruit";
import { fruitCommonSchema, fruitIdObjectSchema, fruitUpdateSchema } from "@actions/zod/Fruit";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Fruit mutations
 */
export type FruitMutationResponse = {
    fruitData?: FruitType;
    error?: string;
};

/**
 * Creates a new fruit
 * @param props Fruit properties
 * @returns Created fruit or null
 */
export const CreateFruit = async (props: FruitCommon): Promise<FruitMutationResponse> => {
    try {
        const data = fruitCommonSchema.parse(props);

        const fruitData: FruitType = await PrismaInstance.fruit.create({ data });

        return { fruitData };
    } catch (error) {
        console.error("CreateFruit -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateFruit -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateFruit -> Prisma error -> " + error.message);
            throw new Error("CreateFruit -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a fruit
 * @param props Fruit ID and new data
 * @returns Updated fruit or null
 */
export const UpdateFruit = async (props: FruitUpdate): Promise<FruitMutationResponse> => {
    try {
        const { id, data } = fruitUpdateSchema.parse(props);
        const fruitData: FruitType = await PrismaInstance.fruit.update({
            where: { id },
            data,
        });
        return { fruitData };
    } catch (error) {
        console.error("UpdateFruit -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateFruit -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateFruit -> Prisma error -> " + error.message);
            throw new Error("UpdateFruit -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a fruit
 * @param props Fruit ID
 * @returns Deleted fruit or null
 */
export const DeleteFruit = async (props: FruitId): Promise<FruitMutationResponse> => {
    try {
        const { id } = fruitIdObjectSchema.parse(props);
        const fruitData: FruitType = await PrismaInstance.fruit.delete({
            where: { id },
        });
        return { fruitData };
    } catch (error) {
        console.error("DeleteFruit -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteFruit -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteFruit -> Prisma error -> " + error.message);
            throw new Error("DeleteFruit -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a fruit by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Fruit ID or other filter (name, description...)
 * @returns Found fruit or null
 */
export const SelectFruit = async (props: SelectFruitProps): Promise<FruitType | null> => {
    try {
        const { where, select } = selectFruitUniqueSchema.parse(props);
        const fruitData: FruitType | null = await PrismaInstance.fruit.findUnique({
            where,
            ...(select && { select }),
        });
        return fruitData;
    } catch (error) {
        console.error("SelectFruit -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectFruit -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectFruit -> Prisma error -> " + error.message);
            throw new Error("SelectFruit -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of fruits with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of fruits or null
 */
export const SelectFruitList = async (props: SelectFruitListProps): Promise<FruitType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectFruitListSchema.parse(props);

        const fruitDataList: FruitType[] = await PrismaInstance.fruit.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return fruitDataList.length ? fruitDataList : null;
    } catch (error) {
        console.error("SelectFruitList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectFruitList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectFruitList -> Prisma error -> " + error.message);
            throw new Error("SelectFruitList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts fruits with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of fruits or null
 */
export const SelectFruitAmount = async (props: SelectFruitAmountProps): Promise<number | null> => {
    try {
        const { where } = selectFruitAmountSchema.parse(props);

        const fruitAmount = await PrismaInstance.fruit.count({
            ...(where && { where }),
        });

        return fruitAmount;
    } catch (error) {
        console.error("SelectFruitAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectFruitAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectFruitAmount -> Prisma error -> " + error.message);
            throw new Error("SelectFruitAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
