"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import OrderService from "@services/class/OrderClass";
import { OrderCountProps, OrderCountResponse, OrderCreateManyProps, OrderCreateManyResponse, OrderCreateProps, OrderCreateResponse, OrderDeleteManyProps, OrderDeleteManyResponse, OrderDeleteProps, OrderDeleteResponse, OrderFindFirstProps, OrderFindFirstResponse, OrderFindManyProps, OrderFindManyResponse, OrderFindUniqueProps, OrderFindUniqueResponse, OrderUpdateManyProps, OrderUpdateManyResponse, OrderUpdateProps, OrderUpdateResponse, OrderUpsertProps, OrderUpsertResponse } from "@services/types/OrderType";

// ========== Single mutations ========== //

export const OrderCreateAction = async <T extends OrderCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<OrderCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderCreateAction", "Order", "create");
        const { data, error } = await OrderService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCreateAction -> " + (error as Error).message);
    }
};

export const OrderUpsertAction = async <T extends OrderUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<OrderUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderUpsertAction", "Order", "upsert");
        const { data, error } = await OrderService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpsertAction -> " + (error as Error).message);
    }
};

export const OrderUpdateAction = async <T extends OrderUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<OrderUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderUpdateAction", "Order", "update");
        const { data, error } = await OrderService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpdateAction -> " + (error as Error).message);
    }
};

export const OrderDeleteAction = async <T extends OrderDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<OrderDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderDeleteAction", "Order", "delete");
        const { data, error } = await OrderService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const OrderCreateManyAction = async (props: OrderCreateManyProps, disableSafeMessage: boolean = false): Promise<OrderCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderCreateManyAction", "Order", "createMany");
        const { data, error } = await OrderService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCreateManyAction -> " + (error as Error).message);
    }
};

export const OrderUpdateManyAction = async (props: OrderUpdateManyProps, disableSafeMessage: boolean = false): Promise<OrderUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderUpdateManyAction", "Order", "updateMany");
        const { data, error } = await OrderService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpdateManyAction -> " + (error as Error).message);
    }
};

export const OrderDeleteManyAction = async (props: OrderDeleteManyProps, disableSafeMessage: boolean = false): Promise<OrderDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderDeleteManyAction", "Order", "deleteMany");
        const { data, error } = await OrderService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindFirstAction = async <T extends OrderFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<OrderFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderFindFirstAction", "Order", "findFirst");
        const { data, error } = await OrderService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("OrderFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindUniqueAction = async <T extends OrderFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<OrderFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderFindUniqueAction", "Order", "findUnique");
        const { data, error } = await OrderService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("OrderFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindManyAction = async <T extends OrderFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<OrderFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderFindManyAction", "Order", "findMany");
        const { data, error } = await OrderService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderCountAction = async (props: OrderCountProps, disableSafeMessage: boolean = false): Promise<OrderCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "OrderCountAction", "Order", "count");
        const { data, error } = await OrderService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCountAction -> " + (error as Error).message);
    }
};
