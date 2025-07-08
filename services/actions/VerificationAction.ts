"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import VerificationService from "@services/class/VerificationClass";
import { VerificationCountProps, VerificationCountResponse, VerificationCreateManyProps, VerificationCreateManyResponse, VerificationCreateProps, VerificationCreateResponse, VerificationDeleteManyProps, VerificationDeleteManyResponse, VerificationDeleteProps, VerificationDeleteResponse, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindUniqueProps, VerificationFindUniqueResponse, VerificationUpdateManyProps, VerificationUpdateManyResponse, VerificationUpdateProps, VerificationUpdateResponse, VerificationUpsertProps, VerificationUpsertResponse } from "@services/types/VerificationType";

// ========== Single mutations ========== //

export const VerificationCreateAction = async <T extends VerificationCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<VerificationCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationCreateAction", "Verification", "create");
        const { data, error } = await VerificationService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCreateAction -> " + (error as Error).message);
    }
};

export const VerificationUpsertAction = async <T extends VerificationUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<VerificationUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationUpsertAction", "Verification", "upsert");
        const { data, error } = await VerificationService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpsertAction -> " + (error as Error).message);
    }
};

export const VerificationUpdateAction = async <T extends VerificationUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<VerificationUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationUpdateAction", "Verification", "update");
        const { data, error } = await VerificationService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpdateAction -> " + (error as Error).message);
    }
};

export const VerificationDeleteAction = async <T extends VerificationDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<VerificationDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationDeleteAction", "Verification", "delete");
        const { data, error } = await VerificationService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const VerificationCreateManyAction = async (props: VerificationCreateManyProps, disableSafeMessage: boolean = false): Promise<VerificationCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationCreateManyAction", "Verification", "createMany");
        const { data, error } = await VerificationService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCreateManyAction -> " + (error as Error).message);
    }
};

export const VerificationUpdateManyAction = async (props: VerificationUpdateManyProps, disableSafeMessage: boolean = false): Promise<VerificationUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationUpdateManyAction", "Verification", "updateMany");
        const { data, error } = await VerificationService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationUpdateManyAction -> " + (error as Error).message);
    }
};

export const VerificationDeleteManyAction = async (props: VerificationDeleteManyProps, disableSafeMessage: boolean = false): Promise<VerificationDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationDeleteManyAction", "Verification", "deleteMany");
        const { data, error } = await VerificationService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindFirstAction = async <T extends VerificationFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<VerificationFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationFindFirstAction", "Verification", "findFirst");
        const { data, error } = await VerificationService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("VerificationFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindUniqueAction = async <T extends VerificationFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<VerificationFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationFindUniqueAction", "Verification", "findUnique");
        const { data, error } = await VerificationService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("VerificationFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationFindManyAction = async <T extends VerificationFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<VerificationFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationFindManyAction", "Verification", "findMany");
        const { data, error } = await VerificationService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const VerificationCountAction = async (props: VerificationCountProps, disableSafeMessage: boolean = false): Promise<VerificationCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "VerificationCountAction", "Verification", "count");
        const { data, error } = await VerificationService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("VerificationCountAction -> " + (error as Error).message);
    }
};
