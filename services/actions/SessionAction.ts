"use server";

import SessionService from "@services/class/SessionClass";
import { SessionCountProps, SessionCountResponse, SessionCreateManyProps, SessionCreateManyResponse, SessionCreateProps, SessionCreateResponse, SessionDeleteManyProps, SessionDeleteManyResponse, SessionDeleteProps, SessionDeleteResponse, SessionFindFirstProps, SessionFindFirstResponse, SessionFindManyProps, SessionFindManyResponse, SessionFindUniqueProps, SessionFindUniqueResponse, SessionUpdateManyProps, SessionUpdateManyResponse, SessionUpdateProps, SessionUpdateResponse, SessionUpsertProps, SessionUpsertResponse } from "@services/types/SessionType";

// ========== Single mutations ========== //

export const SessionCreate = async <T extends SessionCreateProps>(props: T): Promise<SessionCreateResponse<T>> => {
    try {
        const { data, error } = await SessionService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCreate -> " + (error as Error).message);
    }
};

export const SessionUpsert = async <T extends SessionUpsertProps>(props: T): Promise<SessionUpsertResponse<T>> => {
    try {
        const { data, error } = await SessionService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpsert -> " + (error as Error).message);
    }
};

export const SessionUpdate = async <T extends SessionUpdateProps>(props: T): Promise<SessionUpdateResponse<T>> => {
    try {
        const { data, error } = await SessionService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpdate -> " + (error as Error).message);
    }
};

export const SessionDelete = async <T extends SessionDeleteProps>(props: T): Promise<SessionDeleteResponse<T>> => {
    try {
        const { data, error } = await SessionService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const SessionCreateMany = async (props: SessionCreateManyProps): Promise<SessionCreateManyResponse> => {
    try {
        const { data, error } = await SessionService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCreateMany -> " + (error as Error).message);
    }
};

export const SessionUpdateMany = async (props: SessionUpdateManyProps): Promise<SessionUpdateManyResponse> => {
    try {
        const { data, error } = await SessionService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionUpdateMany -> " + (error as Error).message);
    }
};

export const SessionDeleteMany = async (props: SessionDeleteManyProps): Promise<SessionDeleteManyResponse> => {
    try {
        const { data, error } = await SessionService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindFirst = async <T extends SessionFindFirstProps>(
    props: T
): Promise<SessionFindFirstResponse<T>> => {
    try {
        const { data, error } = await SessionService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SessionFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindUnique = async <T extends SessionFindUniqueProps>(
    props: T
): Promise<SessionFindUniqueResponse<T>> => {
    try {
        const { data, error } = await SessionService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SessionFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionFindMany = async <T extends SessionFindManyProps>(
    props: T
): Promise<SessionFindManyResponse<T>> => {
    try {
        const { data, error } = await SessionService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SessionCount = async (props: SessionCountProps): Promise<SessionCountResponse> => {
    try {
        const { data, error } = await SessionService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SessionCount -> " + (error as Error).message);
    }
};
