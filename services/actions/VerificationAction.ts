"use server";

import VerificationService from "@services/class/VerificationClass";
import { VerificationCountProps, VerificationCountResponse, VerificationCreateManyProps, VerificationCreateManyResponse, VerificationCreateProps, VerificationCreateResponse, VerificationDeleteManyProps, VerificationDeleteManyResponse, VerificationDeleteProps, VerificationDeleteResponse, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindUniqueProps, VerificationFindUniqueResponse, VerificationUpdateManyProps, VerificationUpdateManyResponse, VerificationUpdateProps, VerificationUpdateResponse, VerificationUpsertProps, VerificationUpsertResponse } from "@services/types/VerificationType";

// ========== Single mutations ========== //

export const VerificationCreate = async <T extends VerificationCreateProps>(props: T): Promise<VerificationCreateResponse<T>> => {
    try {
        const { data, error } = await VerificationService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCreate -> " + (error as Error).message);
    }
};

export const VerificationUpsert = async <T extends VerificationUpsertProps>(props: T): Promise<VerificationUpsertResponse<T>> => {
    try {
        const { data, error } = await VerificationService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpsert -> " + (error as Error).message);
    }
};

export const VerificationUpdate = async <T extends VerificationUpdateProps>(props: T): Promise<VerificationUpdateResponse<T>> => {
    try {
        const { data, error } = await VerificationService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpdate -> " + (error as Error).message);
    }
};

export const VerificationDelete = async <T extends VerificationDeleteProps>(props: T): Promise<VerificationDeleteResponse<T>> => {
    try {
        const { data, error } = await VerificationService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const VerificationCreateMany = async (props: VerificationCreateManyProps): Promise<VerificationCreateManyResponse> => {
    try {
        const { data, error } = await VerificationService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCreateMany -> " + (error as Error).message);
    }
};

export const VerificationUpdateMany = async (props: VerificationUpdateManyProps): Promise<VerificationUpdateManyResponse> => {
    try {
        const { data, error } = await VerificationService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpdateMany -> " + (error as Error).message);
    }
};

export const VerificationDeleteMany = async (props: VerificationDeleteManyProps): Promise<VerificationDeleteManyResponse> => {
    try {
        const { data, error } = await VerificationService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindFirst = async <T extends VerificationFindFirstProps>(
    props: T
): Promise<VerificationFindFirstResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("VerificationFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindUnique = async <T extends VerificationFindUniqueProps>(
    props: T
): Promise<VerificationFindUniqueResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("VerificationFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindMany = async <T extends VerificationFindManyProps>(
    props: T
): Promise<VerificationFindManyResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationCount = async (props: VerificationCountProps): Promise<VerificationCountResponse> => {
    try {
        const { data, error } = await VerificationService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCount -> " + (error as Error).message);
    }
};
