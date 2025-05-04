"use server";

import SessionService from "@services/class/SessionClass";
import { CountSessionProps, CountSessionResponse, CreateSessionProps, CreateSessionResponse, DeleteSessionProps, DeleteSessionResponse, FindFirstSessionProps, FindFirstSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse, UpdateSessionProps, UpdateSessionResponse, UpsertSessionProps, UpsertSessionResponse } from "@services/types/SessionType";

export const CreateSession = async <T extends CreateSessionProps>(props: T): Promise<CreateSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateSession -> " + (error as Error).message);
    }
};

export const UpsertSession = async <T extends UpsertSessionProps>(props: T): Promise<UpsertSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertSession -> " + (error as Error).message);
    }
};

export const UpdateSession = async <T extends UpdateSessionProps>(props: T): Promise<UpdateSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateSession -> " + (error as Error).message);
    }
};

export const DeleteSession = async <T extends DeleteSessionProps>(props: T): Promise<DeleteSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteSession -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstSession = async <T extends FindFirstSessionProps>(
    props: T
): Promise<FindFirstSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstSession -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueSession = async <T extends FindUniqueSessionProps>(
    props: T
): Promise<FindUniqueSessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueSession -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectSessionList = async <T extends FindManySessionProps>(
    props: T
): Promise<FindManySessionResponse<T>> => {
    try {
        const { data, error } = await SessionService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectSessionAmount = async (props: CountSessionProps): Promise<CountSessionResponse> => {
    try {
        const { data, error } = await SessionService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectSessionAmount -> " + (error as Error).message);
    }
};
