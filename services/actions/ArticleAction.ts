"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import ArticleService from "@services/class/ArticleClass";
import { ArticleCountProps, ArticleCountResponse, ArticleCreateManyProps, ArticleCreateManyResponse, ArticleCreateProps, ArticleCreateResponse, ArticleDeleteManyProps, ArticleDeleteManyResponse, ArticleDeleteProps, ArticleDeleteResponse, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindUniqueProps, ArticleFindUniqueResponse, ArticleUpdateManyProps, ArticleUpdateManyResponse, ArticleUpdateProps, ArticleUpdateResponse, ArticleUpsertProps, ArticleUpsertResponse } from "@services/types/ArticleType";

// ========== Single mutations ========== //

export const ArticleCreateAction = async <T extends ArticleCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<ArticleCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleCreateAction", "Article", "create");
        const { data, error } = await ArticleService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCreateAction -> " + (error as Error).message);
    }
};

export const ArticleUpsertAction = async <T extends ArticleUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<ArticleUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleUpsertAction", "Article", "upsert");
        const { data, error } = await ArticleService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpsertAction -> " + (error as Error).message);
    }
};

export const ArticleUpdateAction = async <T extends ArticleUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<ArticleUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleUpdateAction", "Article", "update");
        const { data, error } = await ArticleService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpdateAction -> " + (error as Error).message);
    }
};

export const ArticleDeleteAction = async <T extends ArticleDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<ArticleDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleDeleteAction", "Article", "delete");
        const { data, error } = await ArticleService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ArticleCreateManyAction = async (props: ArticleCreateManyProps, disableSafeMessage: boolean = false): Promise<ArticleCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleCreateManyAction", "Article", "createMany");
        const { data, error } = await ArticleService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCreateManyAction -> " + (error as Error).message);
    }
};

export const ArticleUpdateManyAction = async (props: ArticleUpdateManyProps, disableSafeMessage: boolean = false): Promise<ArticleUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleUpdateManyAction", "Article", "updateMany");
        const { data, error } = await ArticleService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpdateManyAction -> " + (error as Error).message);
    }
};

export const ArticleDeleteManyAction = async (props: ArticleDeleteManyProps, disableSafeMessage: boolean = false): Promise<ArticleDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleDeleteManyAction", "Article", "deleteMany");
        const { data, error } = await ArticleService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindFirstAction = async <T extends ArticleFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ArticleFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleFindFirstAction", "Article", "findFirst");
        const { data, error } = await ArticleService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ArticleFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindUniqueAction = async <T extends ArticleFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ArticleFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleFindUniqueAction", "Article", "findUnique");
        const { data, error } = await ArticleService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ArticleFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindManyAction = async <T extends ArticleFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<ArticleFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleFindManyAction", "Article", "findMany");
        const { data, error } = await ArticleService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleCountAction = async (props: ArticleCountProps, disableSafeMessage: boolean = false): Promise<ArticleCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "ArticleCountAction", "Article", "count");
        const { data, error } = await ArticleService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCountAction -> " + (error as Error).message);
    }
};
