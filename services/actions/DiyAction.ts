"use server";

import DiyService from "@services/class/DiyClass";
import { DiyCountProps, DiyCountResponse, DiyCreateManyProps, DiyCreateManyResponse, DiyCreateProps, DiyCreateResponse, DiyDeleteManyProps, DiyDeleteManyResponse, DiyDeleteProps, DiyDeleteResponse, DiyFindFirstProps, DiyFindFirstResponse, DiyFindManyProps, DiyFindManyResponse, DiyFindUniqueProps, DiyFindUniqueResponse, DiyUpdateManyProps, DiyUpdateManyResponse, DiyUpdateProps, DiyUpdateResponse, DiyUpsertProps, DiyUpsertResponse } from "@services/types/DiyType";

// ========== Single mutations ========== //

export const DiyCreateAction = async <T extends DiyCreateProps>(props: T): Promise<DiyCreateResponse<T>> => {
    try {
        const { data, error } = await DiyService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCreate -> " + (error as Error).message);
    }
};

export const DiyUpsertAction = async <T extends DiyUpsertProps>(props: T): Promise<DiyUpsertResponse<T>> => {
    try {
        const { data, error } = await DiyService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpsert -> " + (error as Error).message);
    }
};

export const DiyUpdateAction = async <T extends DiyUpdateProps>(props: T): Promise<DiyUpdateResponse<T>> => {
    try {
        const { data, error } = await DiyService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpdate -> " + (error as Error).message);
    }
};

export const DiyDeleteAction = async <T extends DiyDeleteProps>(props: T): Promise<DiyDeleteResponse<T>> => {
    try {
        const { data, error } = await DiyService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const DiyCreateManyAction = async (props: DiyCreateManyProps): Promise<DiyCreateManyResponse> => {
    try {
        const { data, error } = await DiyService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCreateMany -> " + (error as Error).message);
    }
};

export const DiyUpdateManyAction = async (props: DiyUpdateManyProps): Promise<DiyUpdateManyResponse> => {
    try {
        const { data, error } = await DiyService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyUpdateMany -> " + (error as Error).message);
    }
};

export const DiyDeleteManyAction = async (props: DiyDeleteManyProps): Promise<DiyDeleteManyResponse> => {
    try {
        const { data, error } = await DiyService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindFirstAction = async <T extends DiyFindFirstProps>(
    props: T
): Promise<DiyFindFirstResponse<T>> => {
    try {
        const { data, error } = await DiyService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("DiyFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindUniqueAction = async <T extends DiyFindUniqueProps>(
    props: T
): Promise<DiyFindUniqueResponse<T>> => {
    try {
        const { data, error } = await DiyService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("DiyFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyFindManyAction = async <T extends DiyFindManyProps>(
    props: T
): Promise<DiyFindManyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const DiyCountAction = async (props: DiyCountProps): Promise<DiyCountResponse> => {
    try {
        const { data, error } = await DiyService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DiyCount -> " + (error as Error).message);
    }
};
