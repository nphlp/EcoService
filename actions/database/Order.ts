"use server";

import {
    OrderCommon,
    OrderId,
    OrderType,
    OrderUpdate,
    SelectOrderAmountProps,
    SelectOrderListProps,
    SelectOrderProps,
} from "@actions/types/Order";
import {
    selectOrderAmountSchema,
    selectOrderListSchema,
    selectOrderUniqueSchema,
} from "@actions/zod-sensitive/Order";
import { orderCommonSchema, orderIdObjectSchema, orderUpdateSchema } from "@actions/zod/Order";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Order mutations
 */
export type OrderMutationResponse = {
    orderData?: OrderType;
    error?: string;
};

/**
 * Creates a new order
 * @param props Order properties
 * @returns Created order or null
 */
export const CreateOrder = async (props: OrderCommon): Promise<OrderMutationResponse> => {
    try {
        const data = orderCommonSchema.parse(props);

        const orderData: OrderType = await PrismaInstance.order.create({ data });

        return { orderData };
    } catch (error) {
        console.error("CreateOrder -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateOrder -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateOrder -> Prisma error -> " + error.message);
            throw new Error("CreateOrder -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a order
 * @param props Order ID and new data
 * @returns Updated order or null
 */
export const UpdateOrder = async (props: OrderUpdate): Promise<OrderMutationResponse> => {
    try {
        const { id, data } = orderUpdateSchema.parse(props);
        const orderData: OrderType = await PrismaInstance.order.update({
            where: { id },
            data,
        });
        return { orderData };
    } catch (error) {
        console.error("UpdateOrder -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateOrder -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateOrder -> Prisma error -> " + error.message);
            throw new Error("UpdateOrder -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a order
 * @param props Order ID
 * @returns Deleted order or null
 */
export const DeleteOrder = async (props: OrderId): Promise<OrderMutationResponse> => {
    try {
        const { id } = orderIdObjectSchema.parse(props);
        const orderData: OrderType = await PrismaInstance.order.delete({
            where: { id },
        });
        return { orderData };
    } catch (error) {
        console.error("DeleteOrder -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteOrder -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteOrder -> Prisma error -> " + error.message);
            throw new Error("DeleteOrder -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a order by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Order ID or other filter (name, description...)
 * @returns Found order or null
 */
export const SelectOrder = async (props: SelectOrderProps): Promise<OrderType | null> => {
    try {
        const { where, select } = selectOrderUniqueSchema.parse(props);
        const orderData: OrderType | null = await PrismaInstance.order.findUnique({
            where,
            ...(select && { select }),
        });
        return orderData;
    } catch (error) {
        console.error("SelectOrder -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectOrder -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectOrder -> Prisma error -> " + error.message);
            throw new Error("SelectOrder -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of orders with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of orders or null
 */
export const SelectOrderList = async (props: SelectOrderListProps): Promise<OrderType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectOrderListSchema.parse(props);

        const orderDataList: OrderType[] = await PrismaInstance.order.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return orderDataList.length ? orderDataList : null;
    } catch (error) {
        console.error("SelectOrderList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectOrderList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectOrderList -> Prisma error -> " + error.message);
            throw new Error("SelectOrderList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts orders with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of orders or null
 */
export const SelectOrderAmount = async (props: SelectOrderAmountProps): Promise<number | null> => {
    try {
        const { where } = selectOrderAmountSchema.parse(props);

        const orderAmount = await PrismaInstance.order.count({
            ...(where && { where }),
        });

        return orderAmount;
    } catch (error) {
        console.error("SelectOrderAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectOrderAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectOrderAmount -> Prisma error -> " + error.message);
            throw new Error("SelectOrderAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
