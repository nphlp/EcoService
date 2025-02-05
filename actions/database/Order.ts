"use server";

import Prisma from "@lib/prisma";
import {
    OrderId,
    OrderCommon,
    OrderType,
    orderCommonSchema,
    orderUpdateSchema,
    orderIdObjectSchema,
    OrderUpdate,
} from "@actions/types/Order";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new order in the database
 * @param props - The order properties to create
 * @returns Promise resolving to the created order or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateOrder = async (
    props: OrderCommon
): Promise<OrderType | null> => {
    try {
        const data = orderCommonSchema.parse(props);

        const orderData: OrderType = await Prisma.order.create({ data });

        return orderData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateOrder -> ", error);
            return null;
        }
        throw new Error("CreateOrder -> " + (error as Error).message);
    }
};

/**
 * Retrieves an order by its ID
 * @param props - Object containing the order ID
 * @returns Promise resolving to the found order or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectOrder = async (props: {
    id: OrderId;
}): Promise<OrderType | null> => {
    try {
        const { id } = orderIdObjectSchema.parse(props);

        const orderData: OrderType | null = await Prisma.order.findUnique({
            where: { id },
        });

        return orderData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectOrder -> ", error);
            return null;
        }
        throw new Error("SelectOrder -> " + (error as Error).message);
    }
};

/**
 * Retrieves all orders from the database
 * @returns Promise resolving to an array of orders or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectOrderList = async (): Promise<OrderType[] | null> => {
    try {
        const orderDataList: OrderType[] = await Prisma.order.findMany();

        return orderDataList.length ? orderDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectOrderList -> ", error);
            return null;
        }
        throw new Error("SelectOrderList -> " + (error as Error).message);
    }
};

/**
 * Updates an order's information in the database
 * @param props - Object containing the order ID and updated data
 * @returns Promise resolving to the updated order or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateOrder = async (
    props: OrderUpdate
): Promise<OrderType | null> => {
    try {
        const { id, data } = orderUpdateSchema.parse(props);

        const orderData: OrderType = await Prisma.order.update({
            where: { id },
            data,
        });

        return orderData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateOrder -> ", error);
            return null;
        }
        throw new Error("UpdateOrder -> " + (error as Error).message);
    }
};

/**
 * Deletes an order from the database
 * @param props - Object containing the order ID to delete
 * @returns Promise resolving to the deleted order or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteOrder = async (props: {
    id: OrderId;
}): Promise<OrderType | null> => {
    try {
        const { id } = orderIdObjectSchema.parse(props);

        const orderData: OrderType = await Prisma.order.delete({
            where: { id },
        });

        return orderData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteOrder -> ", error);
            return null;
        }
        throw new Error("DeleteOrder -> " + (error as Error).message);
    }
};
