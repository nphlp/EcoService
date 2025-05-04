"use server";

import QuantityService from "@services/class/QuantityClass";
import { CountQuantityProps, CountQuantityResponse, CreateQuantityProps, CreateQuantityResponse, DeleteQuantityProps, DeleteQuantityResponse, FindFirstQuantityProps, FindFirstQuantityResponse, FindManyQuantityProps, FindManyQuantityResponse, FindUniqueQuantityProps, FindUniqueQuantityResponse, UpdateQuantityProps, UpdateQuantityResponse, UpsertQuantityProps, UpsertQuantityResponse } from "@services/types/QuantityType";

export const CreateQuantity = async <T extends CreateQuantityProps>(props: T): Promise<CreateQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateQuantity -> " + (error as Error).message);
    }
};

export const UpsertQuantity = async <T extends UpsertQuantityProps>(props: T): Promise<UpsertQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertQuantity -> " + (error as Error).message);
    }
};

export const UpdateQuantity = async <T extends UpdateQuantityProps>(props: T): Promise<UpdateQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateQuantity -> " + (error as Error).message);
    }
};

export const DeleteQuantity = async <T extends DeleteQuantityProps>(props: T): Promise<DeleteQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteQuantity -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstQuantity = async <T extends FindFirstQuantityProps>(
    props: T
): Promise<FindFirstQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstQuantity -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueQuantity = async <T extends FindUniqueQuantityProps>(
    props: T
): Promise<FindUniqueQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueQuantity -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectQuantityList = async <T extends FindManyQuantityProps>(
    props: T
): Promise<FindManyQuantityResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectQuantityList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectQuantityAmount = async (props: CountQuantityProps): Promise<CountQuantityResponse> => {
    try {
        const { data, error } = await QuantityService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectQuantityAmount -> " + (error as Error).message);
    }
};
