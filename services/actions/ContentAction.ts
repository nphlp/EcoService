"use server";

import { requiresSafeMessage } from "@permissions/requiresSafeMessage";
import ContentService from "@services/class/ContentClass";
import { ContentCountProps, ContentCountResponse, ContentCreateManyProps, ContentCreateManyResponse, ContentCreateProps, ContentCreateResponse, ContentDeleteManyProps, ContentDeleteManyResponse, ContentDeleteProps, ContentDeleteResponse, ContentFindFirstProps, ContentFindFirstResponse, ContentFindManyProps, ContentFindManyResponse, ContentFindUniqueProps, ContentFindUniqueResponse, ContentUpdateManyProps, ContentUpdateManyResponse, ContentUpdateProps, ContentUpdateResponse, ContentUpsertProps, ContentUpsertResponse } from "@services/types/ContentType";

// ========== Single mutations ========== //

export const ContentCreateAction = async <T extends ContentCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<ContentCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentCreateAction", "Content", "create");
        const { data, error } = await ContentService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCreateAction -> " + (error as Error).message);
    }
};

export const ContentUpsertAction = async <T extends ContentUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<ContentUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentUpsertAction", "Content", "upsert");
        const { data, error } = await ContentService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpsertAction -> " + (error as Error).message);
    }
};

export const ContentUpdateAction = async <T extends ContentUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<ContentUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentUpdateAction", "Content", "update");
        const { data, error } = await ContentService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpdateAction -> " + (error as Error).message);
    }
};

export const ContentDeleteAction = async <T extends ContentDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<ContentDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentDeleteAction", "Content", "delete");
        const { data, error } = await ContentService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ContentCreateManyAction = async (props: ContentCreateManyProps, disableSafeMessage: boolean = false): Promise<ContentCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentCreateManyAction", "Content", "createMany");
        const { data, error } = await ContentService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCreateManyAction -> " + (error as Error).message);
    }
};

export const ContentUpdateManyAction = async (props: ContentUpdateManyProps, disableSafeMessage: boolean = false): Promise<ContentUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentUpdateManyAction", "Content", "updateMany");
        const { data, error } = await ContentService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentUpdateManyAction -> " + (error as Error).message);
    }
};

export const ContentDeleteManyAction = async (props: ContentDeleteManyProps, disableSafeMessage: boolean = false): Promise<ContentDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentDeleteManyAction", "Content", "deleteMany");
        const { data, error } = await ContentService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindFirstAction = async <T extends ContentFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ContentFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentFindFirstAction", "Content", "findFirst");
        const { data, error } = await ContentService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ContentFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindUniqueAction = async <T extends ContentFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ContentFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentFindUniqueAction", "Content", "findUnique");
        const { data, error } = await ContentService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ContentFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentFindManyAction = async <T extends ContentFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ContentFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentFindManyAction", "Content", "findMany");
        const { data, error } = await ContentService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ContentCountAction = async (props: ContentCountProps, disableSafeMessage: boolean = false): Promise<ContentCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ContentCountAction", "Content", "count");
        const { data, error } = await ContentService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ContentCountAction -> " + (error as Error).message);
    }
};
