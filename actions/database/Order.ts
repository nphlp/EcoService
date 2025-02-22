"use server";

import {
    OrderCommon,
    orderCommonSchema,
    OrderId,
    orderIdObjectSchema,
    OrderType,
    OrderUpdate,
    orderUpdateSchema,
    SelectOrderAmountProps,
    selectOrderAmountSchema,
    SelectOrderListProps,
    selectOrderListSchema,
} from "@actions/types/Order";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new order
 * @param props Order properties
 * @returns Created order or null
 */
export const CreateOrder = async (
    props: OrderCommon
): Promise<OrderType | null> => {
    try {
        const data = orderCommonSchema.parse(props);

        const orderData: OrderType = await PrismaInstance.order.create({ data });

        return orderData;
    } catch (error) {
        console.error("CreateOrder -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves an order by ID
 * @param props Order ID
 * @returns Found order or null
 */
export const SelectOrder = async (props: OrderId): Promise<OrderType | null> => {
    try {
        const { id } = orderIdObjectSchema.parse(props);

        const orderData: OrderType | null = await PrismaInstance.order.findUnique({
            where: { id },
        });

        return orderData;
    } catch (error) {
        console.error("SelectOrder -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of orders with filters
 * @param props Filter and pagination options
 * @returns List of orders or null
 */
export const SelectOrderList = async (
    props: SelectOrderListProps
): Promise<OrderType[] | null> => {
    try {
        const {
            orderBy,
            take = 10,
            skip = 0,
            where,
        } = selectOrderListSchema.parse(props);

        const orderDataList: OrderType[] = await PrismaInstance.order.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return orderDataList.length ? orderDataList : null;
    } catch (error) {
        console.error("SelectOrderList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts orders with filters
 * @param props Filter options
 * @returns Count of orders or null
 */
export const SelectOrderAmount = async (
    props: SelectOrderAmountProps
): Promise<number | null> => {
    try {
        const { where } = selectOrderAmountSchema.parse(props);

        const orderAmount = await PrismaInstance.order.count({
            ...(where && { where }),
        });

        return orderAmount;
    } catch (error) {
        console.error("SelectOrderAmount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates an order
 * @param props Order ID and new data
 * @returns Updated order or null
 */
export const UpdateOrder = async (
    props: OrderUpdate
): Promise<OrderType | null> => {
    try {
        const { id, data } = orderUpdateSchema.parse(props);

        const orderData: OrderType = await PrismaInstance.order.update({
            where: { id },
            data,
        });

        return orderData;
    } catch (error) {
        console.error("UpdateOrder -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes an order
 * @param props Order ID
 * @returns Deleted order or null
 */
export const DeleteOrder = async (props: OrderId): Promise<OrderType | null> => {
    try {
        const { id } = orderIdObjectSchema.parse(props);

        const orderData: OrderType = await PrismaInstance.order.delete({
            where: { id },
        });

        return orderData;
    } catch (error) {
        console.error("DeleteOrder -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
