"use server";

import OrderService from "@services/class/OrderClass";
import { CountOrderProps, CountOrderResponse, CreateManyOrderProps, CreateManyOrderResponse, CreateOrderProps, CreateOrderResponse, DeleteManyOrderProps, DeleteManyOrderResponse, DeleteOrderProps, DeleteOrderResponse, FindFirstOrderProps, FindFirstOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse, UpdateManyOrderProps, UpdateManyOrderResponse, UpdateOrderProps, UpdateOrderResponse, UpsertOrderProps, UpsertOrderResponse } from "@services/types/OrderType";

// ========== Single mutations ========== //

export const CreateOrder = async <T extends CreateOrderProps>(props: T): Promise<CreateOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateOrder -> " + (error as Error).message);
    }
};

export const UpsertOrder = async <T extends UpsertOrderProps>(props: T): Promise<UpsertOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertOrder -> " + (error as Error).message);
    }
};

export const UpdateOrder = async <T extends UpdateOrderProps>(props: T): Promise<UpdateOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateOrder -> " + (error as Error).message);
    }
};

export const DeleteOrder = async <T extends DeleteOrderProps>(props: T): Promise<DeleteOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteOrder -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyOrder = async (props: CreateManyOrderProps): Promise<CreateManyOrderResponse> => {
    try {
        const { data, error } = await OrderService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyOrder -> " + (error as Error).message);
    }
};

export const UpdateManyOrder = async (props: UpdateManyOrderProps): Promise<UpdateManyOrderResponse> => {
    try {
        const { data, error } = await OrderService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyOrder -> " + (error as Error).message);
    }
};

export const DeleteManyOrder = async (props: DeleteManyOrderProps): Promise<DeleteManyOrderResponse> => {
    try {
        const { data, error } = await OrderService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyOrder -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstOrder = async <T extends FindFirstOrderProps>(
    props: T
): Promise<FindFirstOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstOrder -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueOrder = async <T extends FindUniqueOrderProps>(
    props: T
): Promise<FindUniqueOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueOrder -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectOrderList = async <T extends FindManyOrderProps>(
    props: T
): Promise<FindManyOrderResponse<T>> => {
    try {
        const { data, error } = await OrderService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectOrderList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectOrderAmount = async (props: CountOrderProps): Promise<CountOrderResponse> => {
    try {
        const { data, error } = await OrderService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectOrderAmount -> " + (error as Error).message);
    }
};
