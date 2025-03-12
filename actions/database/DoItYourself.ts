"use server";

import {
    DoItYourselfCommon,
    DoItYourselfId,
    DoItYourselfType,
    DoItYourselfUpdate,
    SelectDoItYourselfAmountProps,
    SelectDoItYourselfListProps,
    SelectDoItYourselfProps,
} from "@actions/types/DoItYourself";
import {
    selectDoItYourselfAmountSchema,
    selectDoItYourselfListSchema,
    selectDoItYourselfUniqueSchema,
} from "@actions/zod-sensitive/DoItYourself";
import { doItYourselfCommonSchema, doItYourselfIdObjectSchema, doItYourselfUpdateSchema } from "@actions/zod/DoItYourself";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for DoItYourself mutations
 */
export type DoItYourselfMutationResponse = {
    doItYourselfData?: DoItYourselfType;
    error?: string;
};

/**
 * Creates a new doItYourself
 * @param props DoItYourself properties
 * @returns Created doItYourself or null
 */
export const CreateDoItYourself = async (props: DoItYourselfCommon): Promise<DoItYourselfMutationResponse> => {
    try {
        const data = doItYourselfCommonSchema.parse(props);

        const doItYourselfData: DoItYourselfType = await PrismaInstance.doItYourself.create({ data });

        return { doItYourselfData };
    } catch (error) {
        console.error("CreateDoItYourself -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateDoItYourself -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateDoItYourself -> Prisma error -> " + error.message);
            throw new Error("CreateDoItYourself -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a doItYourself
 * @param props DoItYourself ID and new data
 * @returns Updated doItYourself or null
 */
export const UpdateDoItYourself = async (props: DoItYourselfUpdate): Promise<DoItYourselfMutationResponse> => {
    try {
        const { id, data } = doItYourselfUpdateSchema.parse(props);
        const doItYourselfData: DoItYourselfType = await PrismaInstance.doItYourself.update({
            where: { id },
            data,
        });
        return { doItYourselfData };
    } catch (error) {
        console.error("UpdateDoItYourself -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateDoItYourself -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateDoItYourself -> Prisma error -> " + error.message);
            throw new Error("UpdateDoItYourself -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a doItYourself
 * @param props DoItYourself ID
 * @returns Deleted doItYourself or null
 */
export const DeleteDoItYourself = async (props: DoItYourselfId): Promise<DoItYourselfMutationResponse> => {
    try {
        const { id } = doItYourselfIdObjectSchema.parse(props);
        const doItYourselfData: DoItYourselfType = await PrismaInstance.doItYourself.delete({
            where: { id },
        });
        return { doItYourselfData };
    } catch (error) {
        console.error("DeleteDoItYourself -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteDoItYourself -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteDoItYourself -> Prisma error -> " + error.message);
            throw new Error("DeleteDoItYourself -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a doItYourself by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props DoItYourself ID or other filter (name, description...)
 * @returns Found doItYourself or null
 */
export const SelectDoItYourself = async (props: SelectDoItYourselfProps): Promise<DoItYourselfType | null> => {
    try {
        const { where, select } = selectDoItYourselfUniqueSchema.parse(props);
        const doItYourselfData: DoItYourselfType | null = await PrismaInstance.doItYourself.findUnique({
            where,
            ...(select && { select }),
        });
        return doItYourselfData;
    } catch (error) {
        console.error("SelectDoItYourself -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectDoItYourself -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectDoItYourself -> Prisma error -> " + error.message);
            throw new Error("SelectDoItYourself -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of doItYourselves with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of doItYourselves or null
 */
export const SelectDoItYourselfList = async (props: SelectDoItYourselfListProps): Promise<DoItYourselfType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectDoItYourselfListSchema.parse(props);

        const doItYourselfDataList: DoItYourselfType[] = await PrismaInstance.doItYourself.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return doItYourselfDataList.length ? doItYourselfDataList : null;
    } catch (error) {
        console.error("SelectDoItYourselfList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectDoItYourselfList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectDoItYourselfList -> Prisma error -> " + error.message);
            throw new Error("SelectDoItYourselfList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts doItYourselves with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of doItYourselves or null
 */
export const SelectDoItYourselfAmount = async (props: SelectDoItYourselfAmountProps): Promise<number | null> => {
    try {
        const { where } = selectDoItYourselfAmountSchema.parse(props);

        const doItYourselfAmount = await PrismaInstance.doItYourself.count({
            ...(where && { where }),
        });

        return doItYourselfAmount;
    } catch (error) {
        console.error("SelectDoItYourselfAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectDoItYourselfAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectDoItYourselfAmount -> Prisma error -> " + error.message);
            throw new Error("SelectDoItYourselfAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
