"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import SessionService from "@services/class/SessionClass";
import { SessionCountProps, SessionCountResponse, SessionCreateManyProps, SessionCreateManyResponse, SessionCreateProps, SessionCreateResponse, SessionDeleteManyProps, SessionDeleteManyResponse, SessionDeleteProps, SessionDeleteResponse, SessionFindFirstProps, SessionFindFirstResponse, SessionFindManyProps, SessionFindManyResponse, SessionFindUniqueProps, SessionFindUniqueResponse, SessionUpdateManyProps, SessionUpdateManyResponse, SessionUpdateProps, SessionUpdateResponse, SessionUpsertProps, SessionUpsertResponse } from "@services/types/SessionType";

// ========== Single mutations ========== //

export const SessionCreateAction = async <T extends SessionCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<SessionCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionCreateAction", "Session", "create");
        const { data, error } = await SessionService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCreateAction -> " + (error as Error).message);
    }
};

export const SessionUpsertAction = async <T extends SessionUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<SessionUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionUpsertAction", "Session", "upsert");
        const { data, error } = await SessionService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpsertAction -> " + (error as Error).message);
    }
};

export const SessionUpdateAction = async <T extends SessionUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<SessionUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionUpdateAction", "Session", "update");
        const { data, error } = await SessionService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpdateAction -> " + (error as Error).message);
    }
};

export const SessionDeleteAction = async <T extends SessionDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<SessionDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionDeleteAction", "Session", "delete");
        const { data, error } = await SessionService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const SessionCreateManyAction = async (props: SessionCreateManyProps, disableSafeMessage: boolean = false): Promise<SessionCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionCreateManyAction", "Session", "createMany");
        const { data, error } = await SessionService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCreateManyAction -> " + (error as Error).message);
    }
};

export const SessionUpdateManyAction = async (props: SessionUpdateManyProps, disableSafeMessage: boolean = false): Promise<SessionUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionUpdateManyAction", "Session", "updateMany");
        const { data, error } = await SessionService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpdateManyAction -> " + (error as Error).message);
    }
};

export const SessionDeleteManyAction = async (props: SessionDeleteManyProps, disableSafeMessage: boolean = false): Promise<SessionDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionDeleteManyAction", "Session", "deleteMany");
        const { data, error } = await SessionService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindFirstAction = async <T extends SessionFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<SessionFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionFindFirstAction", "Session", "findFirst");
        const { data, error } = await SessionService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SessionFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindUniqueAction = async <T extends SessionFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<SessionFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionFindUniqueAction", "Session", "findUnique");
        const { data, error } = await SessionService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SessionFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindManyAction = async <T extends SessionFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<SessionFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionFindManyAction", "Session", "findMany");
        const { data, error } = await SessionService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionCountAction = async (props: SessionCountProps, disableSafeMessage: boolean = false): Promise<SessionCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "SessionCountAction", "Session", "count");
        const { data, error } = await SessionService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCountAction -> " + (error as Error).message);
    }
};
