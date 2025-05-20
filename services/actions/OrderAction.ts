"use server";

import OrderService from "@services/class/OrderClass";
import { OrderCountProps, OrderCountResponse, OrderCreateManyProps, OrderCreateManyResponse, OrderCreateProps, OrderCreateResponse, OrderDeleteManyProps, OrderDeleteManyResponse, OrderDeleteProps, OrderDeleteResponse, OrderFindFirstProps, OrderFindFirstResponse, OrderFindManyProps, OrderFindManyResponse, OrderFindUniqueProps, OrderFindUniqueResponse, OrderUpdateManyProps, OrderUpdateManyResponse, OrderUpdateProps, OrderUpdateResponse, OrderUpsertProps, OrderUpsertResponse } from "@services/types/OrderType";

// ========== Single mutations ========== //

export const OrderCreate = async <T extends OrderCreateProps>(props: T): Promise<OrderCreateResponse<T>> => {
    try {
        const { data, error } = await OrderService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCreate -> " + (error as Error).message);
    }
};

export const OrderUpsert = async <T extends OrderUpsertProps>(props: T): Promise<OrderUpsertResponse<T>> => {
    try {
        const { data, error } = await OrderService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpsert -> " + (error as Error).message);
    }
};

export const OrderUpdate = async <T extends OrderUpdateProps>(props: T): Promise<OrderUpdateResponse<T>> => {
    try {
        const { data, error } = await OrderService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpdate -> " + (error as Error).message);
    }
};

export const OrderDelete = async <T extends OrderDeleteProps>(props: T): Promise<OrderDeleteResponse<T>> => {
    try {
        const { data, error } = await OrderService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const OrderCreateMany = async (props: OrderCreateManyProps): Promise<OrderCreateManyResponse> => {
    try {
        const { data, error } = await OrderService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCreateMany -> " + (error as Error).message);
    }
};

export const OrderUpdateMany = async (props: OrderUpdateManyProps): Promise<OrderUpdateManyResponse> => {
    try {
        const { data, error } = await OrderService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderUpdateMany -> " + (error as Error).message);
    }
};

export const OrderDeleteMany = async (props: OrderDeleteManyProps): Promise<OrderDeleteManyResponse> => {
    try {
        const { data, error } = await OrderService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindFirst = async <T extends OrderFindFirstProps>(
    props: T
): Promise<OrderFindFirstResponse<T>> => {
    try {
        const { data, error } = await OrderService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("OrderFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindUnique = async <T extends OrderFindUniqueProps>(
    props: T
): Promise<OrderFindUniqueResponse<T>> => {
    try {
        const { data, error } = await OrderService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("OrderFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderFindMany = async <T extends OrderFindManyProps>(
    props: T
): Promise<OrderFindManyResponse<T>> => {
    try {
        const { data, error } = await OrderService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const OrderCount = async (props: OrderCountProps): Promise<OrderCountResponse> => {
    try {
        const { data, error } = await OrderService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("OrderCount -> " + (error as Error).message);
    }
};
