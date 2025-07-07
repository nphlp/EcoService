"use server";

import QuantityService from "@services/class/QuantityClass";
import { QuantityCountProps, QuantityCountResponse, QuantityCreateManyProps, QuantityCreateManyResponse, QuantityCreateProps, QuantityCreateResponse, QuantityDeleteManyProps, QuantityDeleteManyResponse, QuantityDeleteProps, QuantityDeleteResponse, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindUniqueProps, QuantityFindUniqueResponse, QuantityUpdateManyProps, QuantityUpdateManyResponse, QuantityUpdateProps, QuantityUpdateResponse, QuantityUpsertProps, QuantityUpsertResponse } from "@services/types/QuantityType";

// ========== Single mutations ========== //

export const QuantityCreateAction = async <T extends QuantityCreateProps>(props: T): Promise<QuantityCreateResponse<T>> => {
    try {
        const { data, error } = await QuantityService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCreate -> " + (error as Error).message);
    }
};

export const QuantityUpsertAction = async <T extends QuantityUpsertProps>(props: T): Promise<QuantityUpsertResponse<T>> => {
    try {
        const { data, error } = await QuantityService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpsert -> " + (error as Error).message);
    }
};

export const QuantityUpdateAction = async <T extends QuantityUpdateProps>(props: T): Promise<QuantityUpdateResponse<T>> => {
    try {
        const { data, error } = await QuantityService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpdate -> " + (error as Error).message);
    }
};

export const QuantityDeleteAction = async <T extends QuantityDeleteProps>(props: T): Promise<QuantityDeleteResponse<T>> => {
    try {
        const { data, error } = await QuantityService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const QuantityCreateManyAction = async (props: QuantityCreateManyProps): Promise<QuantityCreateManyResponse> => {
    try {
        const { data, error } = await QuantityService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCreateMany -> " + (error as Error).message);
    }
};

export const QuantityUpdateManyAction = async (props: QuantityUpdateManyProps): Promise<QuantityUpdateManyResponse> => {
    try {
        const { data, error } = await QuantityService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpdateMany -> " + (error as Error).message);
    }
};

export const QuantityDeleteManyAction = async (props: QuantityDeleteManyProps): Promise<QuantityDeleteManyResponse> => {
    try {
        const { data, error } = await QuantityService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindFirstAction = async <T extends QuantityFindFirstProps>(
    props: T
): Promise<QuantityFindFirstResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("QuantityFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindUniqueAction = async <T extends QuantityFindUniqueProps>(
    props: T
): Promise<QuantityFindUniqueResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("QuantityFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindManyAction = async <T extends QuantityFindManyProps>(
    props: T
): Promise<QuantityFindManyResponse<T>> => {
    try {
        const { data, error } = await QuantityService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityCountAction = async (props: QuantityCountProps): Promise<QuantityCountResponse> => {
    try {
        const { data, error } = await QuantityService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCount -> " + (error as Error).message);
    }
};
