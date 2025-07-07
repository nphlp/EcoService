"use server";

import FruitService from "@services/class/FruitClass";
import { FruitCountProps, FruitCountResponse, FruitCreateManyProps, FruitCreateManyResponse, FruitCreateProps, FruitCreateResponse, FruitDeleteManyProps, FruitDeleteManyResponse, FruitDeleteProps, FruitDeleteResponse, FruitFindFirstProps, FruitFindFirstResponse, FruitFindManyProps, FruitFindManyResponse, FruitFindUniqueProps, FruitFindUniqueResponse, FruitUpdateManyProps, FruitUpdateManyResponse, FruitUpdateProps, FruitUpdateResponse, FruitUpsertProps, FruitUpsertResponse } from "@services/types/FruitType";

// ========== Single mutations ========== //

export const FruitCreateAction = async <T extends FruitCreateProps>(props: T): Promise<FruitCreateResponse<T>> => {
    try {
        const { data, error } = await FruitService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCreate -> " + (error as Error).message);
    }
};

export const FruitUpsertAction = async <T extends FruitUpsertProps>(props: T): Promise<FruitUpsertResponse<T>> => {
    try {
        const { data, error } = await FruitService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpsert -> " + (error as Error).message);
    }
};

export const FruitUpdateAction = async <T extends FruitUpdateProps>(props: T): Promise<FruitUpdateResponse<T>> => {
    try {
        const { data, error } = await FruitService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpdate -> " + (error as Error).message);
    }
};

export const FruitDeleteAction = async <T extends FruitDeleteProps>(props: T): Promise<FruitDeleteResponse<T>> => {
    try {
        const { data, error } = await FruitService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const FruitCreateManyAction = async (props: FruitCreateManyProps): Promise<FruitCreateManyResponse> => {
    try {
        const { data, error } = await FruitService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCreateMany -> " + (error as Error).message);
    }
};

export const FruitUpdateManyAction = async (props: FruitUpdateManyProps): Promise<FruitUpdateManyResponse> => {
    try {
        const { data, error } = await FruitService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpdateMany -> " + (error as Error).message);
    }
};

export const FruitDeleteManyAction = async (props: FruitDeleteManyProps): Promise<FruitDeleteManyResponse> => {
    try {
        const { data, error } = await FruitService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindFirstAction = async <T extends FruitFindFirstProps>(
    props: T
): Promise<FruitFindFirstResponse<T>> => {
    try {
        const { data, error } = await FruitService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("FruitFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindUniqueAction = async <T extends FruitFindUniqueProps>(
    props: T
): Promise<FruitFindUniqueResponse<T>> => {
    try {
        const { data, error } = await FruitService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("FruitFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindManyAction = async <T extends FruitFindManyProps>(
    props: T
): Promise<FruitFindManyResponse<T>> => {
    try {
        const { data, error } = await FruitService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitCountAction = async (props: FruitCountProps): Promise<FruitCountResponse> => {
    try {
        const { data, error } = await FruitService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCount -> " + (error as Error).message);
    }
};
