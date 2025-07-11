"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import QuantityService from "@services/class/QuantityClass";
import { QuantityCountProps, QuantityCountResponse, QuantityCreateManyProps, QuantityCreateManyResponse, QuantityCreateProps, QuantityCreateResponse, QuantityDeleteManyProps, QuantityDeleteManyResponse, QuantityDeleteProps, QuantityDeleteResponse, QuantityFindFirstProps, QuantityFindFirstResponse, QuantityFindManyProps, QuantityFindManyResponse, QuantityFindUniqueProps, QuantityFindUniqueResponse, QuantityUpdateManyProps, QuantityUpdateManyResponse, QuantityUpdateProps, QuantityUpdateResponse, QuantityUpsertProps, QuantityUpsertResponse } from "@services/types/QuantityType";

// ========== Single mutations ========== //

export const QuantityCreateAction = async <T extends QuantityCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<QuantityCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityCreateAction", "Quantity", "create");
        const { data, error } = await QuantityService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCreateAction -> " + (error as Error).message);
    }
};

export const QuantityUpsertAction = async <T extends QuantityUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<QuantityUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityUpsertAction", "Quantity", "upsert");
        const { data, error } = await QuantityService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpsertAction -> " + (error as Error).message);
    }
};

export const QuantityUpdateAction = async <T extends QuantityUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<QuantityUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityUpdateAction", "Quantity", "update");
        const { data, error } = await QuantityService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpdateAction -> " + (error as Error).message);
    }
};

export const QuantityDeleteAction = async <T extends QuantityDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<QuantityDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityDeleteAction", "Quantity", "delete");
        const { data, error } = await QuantityService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const QuantityCreateManyAction = async (props: QuantityCreateManyProps, disableSafeMessage: boolean = false): Promise<QuantityCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityCreateManyAction", "Quantity", "createMany");
        const { data, error } = await QuantityService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCreateManyAction -> " + (error as Error).message);
    }
};

export const QuantityUpdateManyAction = async (props: QuantityUpdateManyProps, disableSafeMessage: boolean = false): Promise<QuantityUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityUpdateManyAction", "Quantity", "updateMany");
        const { data, error } = await QuantityService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityUpdateManyAction -> " + (error as Error).message);
    }
};

export const QuantityDeleteManyAction = async (props: QuantityDeleteManyProps, disableSafeMessage: boolean = false): Promise<QuantityDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityDeleteManyAction", "Quantity", "deleteMany");
        const { data, error } = await QuantityService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindFirstAction = async <T extends QuantityFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<QuantityFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityFindFirstAction", "Quantity", "findFirst");
        const { data, error } = await QuantityService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("QuantityFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindUniqueAction = async <T extends QuantityFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<QuantityFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityFindUniqueAction", "Quantity", "findUnique");
        const { data, error } = await QuantityService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("QuantityFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityFindManyAction = async <T extends QuantityFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<QuantityFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityFindManyAction", "Quantity", "findMany");
        const { data, error } = await QuantityService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const QuantityCountAction = async (props: QuantityCountProps, disableSafeMessage: boolean = false): Promise<QuantityCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "QuantityCountAction", "Quantity", "count");
        const { data, error } = await QuantityService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("QuantityCountAction -> " + (error as Error).message);
    }
};
