"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import FruitService from "@services/class/FruitClass";
import { FruitCountProps, FruitCountResponse, FruitCreateManyProps, FruitCreateManyResponse, FruitCreateProps, FruitCreateResponse, FruitDeleteManyProps, FruitDeleteManyResponse, FruitDeleteProps, FruitDeleteResponse, FruitFindFirstProps, FruitFindFirstResponse, FruitFindManyProps, FruitFindManyResponse, FruitFindUniqueProps, FruitFindUniqueResponse, FruitUpdateManyProps, FruitUpdateManyResponse, FruitUpdateProps, FruitUpdateResponse, FruitUpsertProps, FruitUpsertResponse } from "@services/types/FruitType";

// ========== Single mutations ========== //

export const FruitCreateAction = async <T extends FruitCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<FruitCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitCreateAction", "Fruit", "create");
        const { data, error } = await FruitService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCreateAction -> " + (error as Error).message);
    }
};

export const FruitUpsertAction = async <T extends FruitUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<FruitUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitUpsertAction", "Fruit", "upsert");
        const { data, error } = await FruitService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpsertAction -> " + (error as Error).message);
    }
};

export const FruitUpdateAction = async <T extends FruitUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<FruitUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitUpdateAction", "Fruit", "update");
        const { data, error } = await FruitService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpdateAction -> " + (error as Error).message);
    }
};

export const FruitDeleteAction = async <T extends FruitDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<FruitDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitDeleteAction", "Fruit", "delete");
        const { data, error } = await FruitService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const FruitCreateManyAction = async (props: FruitCreateManyProps, disableSafeMessage: boolean = false): Promise<FruitCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitCreateManyAction", "Fruit", "createMany");
        const { data, error } = await FruitService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCreateManyAction -> " + (error as Error).message);
    }
};

export const FruitUpdateManyAction = async (props: FruitUpdateManyProps, disableSafeMessage: boolean = false): Promise<FruitUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitUpdateManyAction", "Fruit", "updateMany");
        const { data, error } = await FruitService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitUpdateManyAction -> " + (error as Error).message);
    }
};

export const FruitDeleteManyAction = async (props: FruitDeleteManyProps, disableSafeMessage: boolean = false): Promise<FruitDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitDeleteManyAction", "Fruit", "deleteMany");
        const { data, error } = await FruitService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindFirstAction = async <T extends FruitFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<FruitFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitFindFirstAction", "Fruit", "findFirst");
        const { data, error } = await FruitService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("FruitFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindUniqueAction = async <T extends FruitFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<FruitFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitFindUniqueAction", "Fruit", "findUnique");
        const { data, error } = await FruitService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("FruitFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitFindManyAction = async <T extends FruitFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<FruitFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitFindManyAction", "Fruit", "findMany");
        const { data, error } = await FruitService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const FruitCountAction = async (props: FruitCountProps, disableSafeMessage: boolean = false): Promise<FruitCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "FruitCountAction", "Fruit", "count");
        const { data, error } = await FruitService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("FruitCountAction -> " + (error as Error).message);
    }
};
