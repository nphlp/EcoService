"use server";

import ContentService from "@services/class/ContentClass";
import { ContentCountProps, ContentCountResponse, ContentCreateManyProps, ContentCreateManyResponse, ContentCreateProps, ContentCreateResponse, ContentDeleteManyProps, ContentDeleteManyResponse, ContentDeleteProps, ContentDeleteResponse, ContentFindFirstProps, ContentFindFirstResponse, ContentFindManyProps, ContentFindManyResponse, ContentFindUniqueProps, ContentFindUniqueResponse, ContentUpdateManyProps, ContentUpdateManyResponse, ContentUpdateProps, ContentUpdateResponse, ContentUpsertProps, ContentUpsertResponse } from "@services/types/ContentType";

// ========== Single mutations ========== //

export const ContentCreate = async <T extends ContentCreateProps>(props: T): Promise<ContentCreateResponse<T>> => {
    try {
        const { data, error } = await ContentService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCreate -> " + (error as Error).message);
    }
};

export const ContentUpsert = async <T extends ContentUpsertProps>(props: T): Promise<ContentUpsertResponse<T>> => {
    try {
        const { data, error } = await ContentService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpsert -> " + (error as Error).message);
    }
};

export const ContentUpdate = async <T extends ContentUpdateProps>(props: T): Promise<ContentUpdateResponse<T>> => {
    try {
        const { data, error } = await ContentService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpdate -> " + (error as Error).message);
    }
};

export const ContentDelete = async <T extends ContentDeleteProps>(props: T): Promise<ContentDeleteResponse<T>> => {
    try {
        const { data, error } = await ContentService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ContentCreateMany = async (props: ContentCreateManyProps): Promise<ContentCreateManyResponse> => {
    try {
        const { data, error } = await ContentService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCreateMany -> " + (error as Error).message);
    }
};

export const ContentUpdateMany = async (props: ContentUpdateManyProps): Promise<ContentUpdateManyResponse> => {
    try {
        const { data, error } = await ContentService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpdateMany -> " + (error as Error).message);
    }
};

export const ContentDeleteMany = async (props: ContentDeleteManyProps): Promise<ContentDeleteManyResponse> => {
    try {
        const { data, error } = await ContentService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindFirst = async <T extends ContentFindFirstProps>(
    props: T
): Promise<ContentFindFirstResponse<T>> => {
    try {
        const { data, error } = await ContentService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ContentFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindUnique = async <T extends ContentFindUniqueProps>(
    props: T
): Promise<ContentFindUniqueResponse<T>> => {
    try {
        const { data, error } = await ContentService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ContentFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindMany = async <T extends ContentFindManyProps>(
    props: T
): Promise<ContentFindManyResponse<T>> => {
    try {
        const { data, error } = await ContentService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentCount = async (props: ContentCountProps): Promise<ContentCountResponse> => {
    try {
        const { data, error } = await ContentService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCount -> " + (error as Error).message);
    }
};
