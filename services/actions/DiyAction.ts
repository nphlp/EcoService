"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import DiyService from "@services/class/DiyClass";
import { DiyCountProps, DiyCountResponse, DiyCreateManyProps, DiyCreateManyResponse, DiyCreateProps, DiyCreateResponse, DiyDeleteManyProps, DiyDeleteManyResponse, DiyDeleteProps, DiyDeleteResponse, DiyFindFirstProps, DiyFindFirstResponse, DiyFindManyProps, DiyFindManyResponse, DiyFindUniqueProps, DiyFindUniqueResponse, DiyUpdateManyProps, DiyUpdateManyResponse, DiyUpdateProps, DiyUpdateResponse, DiyUpsertProps, DiyUpsertResponse } from "@services/types/DiyType";

// ========== Single mutations ========== //

export const DiyCreateAction = async <T extends DiyCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<DiyCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyCreateAction", "Diy", "create");
        const { data, error } = await DiyService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCreateAction -> " + (error as Error).message);
    }
};

export const DiyUpsertAction = async <T extends DiyUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<DiyUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyUpsertAction", "Diy", "upsert");
        const { data, error } = await DiyService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpsertAction -> " + (error as Error).message);
    }
};

export const DiyUpdateAction = async <T extends DiyUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<DiyUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyUpdateAction", "Diy", "update");
        const { data, error } = await DiyService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpdateAction -> " + (error as Error).message);
    }
};

export const DiyDeleteAction = async <T extends DiyDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<DiyDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyDeleteAction", "Diy", "delete");
        const { data, error } = await DiyService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const DiyCreateManyAction = async (props: DiyCreateManyProps, disableSafeMessage: boolean = false): Promise<DiyCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyCreateManyAction", "Diy", "createMany");
        const { data, error } = await DiyService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCreateManyAction -> " + (error as Error).message);
    }
};

export const DiyUpdateManyAction = async (props: DiyUpdateManyProps, disableSafeMessage: boolean = false): Promise<DiyUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyUpdateManyAction", "Diy", "updateMany");
        const { data, error } = await DiyService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpdateManyAction -> " + (error as Error).message);
    }
};

export const DiyDeleteManyAction = async (props: DiyDeleteManyProps, disableSafeMessage: boolean = false): Promise<DiyDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyDeleteManyAction", "Diy", "deleteMany");
        const { data, error } = await DiyService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindFirstAction = async <T extends DiyFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<DiyFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyFindFirstAction", "Diy", "findFirst");
        const { data, error } = await DiyService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("DiyFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindUniqueAction = async <T extends DiyFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<DiyFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyFindUniqueAction", "Diy", "findUnique");
        const { data, error } = await DiyService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("DiyFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindManyAction = async <T extends DiyFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<DiyFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyFindManyAction", "Diy", "findMany");
        const { data, error } = await DiyService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyCountAction = async (props: DiyCountProps, disableSafeMessage: boolean = false): Promise<DiyCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "DiyCountAction", "Diy", "count");
        const { data, error } = await DiyService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCountAction -> " + (error as Error).message);
    }
};
