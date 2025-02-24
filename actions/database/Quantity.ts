"use server";

import {
    QuantityCommon,
    quantityCommonSchema,
    QuantityId,
    quantityIdObjectSchema,
    QuantityType,
    QuantityUpdate,
    quantityUpdateSchema,
    SelectQuantityAmountProps,
    selectQuantityAmountSchema,
    SelectQuantityListProps,
    selectQuantityListSchema,
} from "@actions/types/Quantity";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new quantity
 * @param props Quantity properties
 * @returns Created quantity or null
 */
export const CreateQuantity = async (
    props: QuantityCommon,
): Promise<QuantityType | null> => {
    try {
        const data = quantityCommonSchema.parse(props);

        const quantityData: QuantityType = await PrismaInstance.quantity.create({ data });

        return quantityData;
    } catch (error) {
        console.error("CreateQuantity -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a quantity by ID
 * @param props Quantity ID
 * @returns Found quantity or null
 */
export const SelectQuantity = async (
    props: QuantityId,
): Promise<QuantityType | null> => {
    try {
        const { id } = quantityIdObjectSchema.parse(props);

        const quantityData: QuantityType | null =
            await PrismaInstance.quantity.findUnique({
                where: { id },
            });

        return quantityData;
    } catch (error) {
        console.error("SelectQuantity -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of quantities with filters
 * @param props Filter and pagination options
 * @returns List of quantities or null
 */
export const SelectQuantityList = async (
    props: SelectQuantityListProps,
): Promise<QuantityType[] | null> => {
    try {
        const {
            orderBy,
            take = 10,
            skip = 0,
            where,
        } = selectQuantityListSchema.parse(props);

        const quantityDataList: QuantityType[] =
            await PrismaInstance.quantity.findMany({
                ...(orderBy && { orderBy }),
                ...(take && { take }),
                ...(skip && { skip }),
                ...(where && { where }),
            });

        return quantityDataList.length ? quantityDataList : null;
    } catch (error) {
        console.error("SelectQuantityList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts quantities with filters
 * @param props Filter options
 * @returns Count of quantities or null
 */
export const SelectQuantityAmount = async (
    props: SelectQuantityAmountProps,
): Promise<number | null> => {
    try {
        const { where } = selectQuantityAmountSchema.parse(props);

        const quantityAmount = await PrismaInstance.quantity.count({
            ...(where && { where }),
        });

        return quantityAmount;
    } catch (error) {
        console.error("SelectQuantityAmount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates a quantity
 * @param props Quantity ID and new data
 * @returns Updated quantity or null
 */
export const UpdateQuantity = async (
    props: QuantityUpdate,
): Promise<QuantityType | null> => {
    try {
        const { id, data } = quantityUpdateSchema.parse(props);

        const quantityData: QuantityType = await PrismaInstance.quantity.update(
            {
                where: { id },
                data,
            },
        );

        return quantityData;
    } catch (error) {
        console.error("UpdateQuantity -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes a quantity
 * @param props Quantity ID
 * @returns Deleted quantity or null
 */
export const DeleteQuantity = async (
    props: QuantityId,
): Promise<QuantityType | null> => {
    try {
        const { id } = quantityIdObjectSchema.parse(props);

        const quantityData: QuantityType = await PrismaInstance.quantity.delete(
            {
                where: { id },
            },
        );

        return quantityData;
    } catch (error) {
        console.error("DeleteQuantity -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
