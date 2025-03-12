"use server";

import {
    QuantityCommon,
    QuantityId,
    QuantityType,
    QuantityUpdate,
    SelectQuantityAmountProps,
    SelectQuantityListProps,
    SelectQuantityProps,
} from "@actions/types/Quantity";
import {
    selectQuantityAmountSchema,
    selectQuantityListSchema,
    selectQuantityUniqueSchema,
} from "@actions/zod-sensitive/Quantity";
import { quantityCommonSchema, quantityIdObjectSchema, quantityUpdateSchema } from "@actions/zod/Quantity";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Quantity mutations
 */
export type QuantityMutationResponse = {
    quantityData?: QuantityType;
    error?: string;
};

/**
 * Creates a new quantity
 * @param props Quantity properties
 * @returns Created quantity or null
 */
export const CreateQuantity = async (props: QuantityCommon): Promise<QuantityMutationResponse> => {
    try {
        const data = quantityCommonSchema.parse(props);

        const quantityData: QuantityType = await PrismaInstance.quantity.create({ data });

        return { quantityData };
    } catch (error) {
        console.error("CreateQuantity -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateQuantity -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateQuantity -> Prisma error -> " + error.message);
            throw new Error("CreateQuantity -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a quantity
 * @param props Quantity ID and new data
 * @returns Updated quantity or null
 */
export const UpdateQuantity = async (props: QuantityUpdate): Promise<QuantityMutationResponse> => {
    try {
        const { id, data } = quantityUpdateSchema.parse(props);
        const quantityData: QuantityType = await PrismaInstance.quantity.update({
            where: { id },
            data,
        });
        return { quantityData };
    } catch (error) {
        console.error("UpdateQuantity -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateQuantity -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateQuantity -> Prisma error -> " + error.message);
            throw new Error("UpdateQuantity -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a quantity
 * @param props Quantity ID
 * @returns Deleted quantity or null
 */
export const DeleteQuantity = async (props: QuantityId): Promise<QuantityMutationResponse> => {
    try {
        const { id } = quantityIdObjectSchema.parse(props);
        const quantityData: QuantityType = await PrismaInstance.quantity.delete({
            where: { id },
        });
        return { quantityData };
    } catch (error) {
        console.error("DeleteQuantity -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteQuantity -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteQuantity -> Prisma error -> " + error.message);
            throw new Error("DeleteQuantity -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a quantity by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Quantity ID or other filter (name, description...)
 * @returns Found quantity or null
 */
export const SelectQuantity = async (props: SelectQuantityProps): Promise<QuantityType | null> => {
    try {
        const { where, select } = selectQuantityUniqueSchema.parse(props);
        const quantityData: QuantityType | null = await PrismaInstance.quantity.findUnique({
            where,
            ...(select && { select }),
        });
        return quantityData;
    } catch (error) {
        console.error("SelectQuantity -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectQuantity -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectQuantity -> Prisma error -> " + error.message);
            throw new Error("SelectQuantity -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of quantities with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of quantities or null
 */
export const SelectQuantityList = async (props: SelectQuantityListProps): Promise<QuantityType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectQuantityListSchema.parse(props);

        const quantityDataList: QuantityType[] = await PrismaInstance.quantity.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return quantityDataList.length ? quantityDataList : null;
    } catch (error) {
        console.error("SelectQuantityList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectQuantityList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectQuantityList -> Prisma error -> " + error.message);
            throw new Error("SelectQuantityList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts quantities with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of quantities or null
 */
export const SelectQuantityAmount = async (props: SelectQuantityAmountProps): Promise<number | null> => {
    try {
        const { where } = selectQuantityAmountSchema.parse(props);

        const quantityAmount = await PrismaInstance.quantity.count({
            ...(where && { where }),
        });

        return quantityAmount;
    } catch (error) {
        console.error("SelectQuantityAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectQuantityAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectQuantityAmount -> Prisma error -> " + error.message);
            throw new Error("SelectQuantityAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
