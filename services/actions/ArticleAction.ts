"use server";

import ArticleService from "@services/class/ArticleClass";
import { ArticleCountProps, ArticleCountResponse, ArticleCreateManyProps, ArticleCreateManyResponse, ArticleCreateProps, ArticleCreateResponse, ArticleDeleteManyProps, ArticleDeleteManyResponse, ArticleDeleteProps, ArticleDeleteResponse, ArticleFindFirstProps, ArticleFindFirstResponse, ArticleFindManyProps, ArticleFindManyResponse, ArticleFindUniqueProps, ArticleFindUniqueResponse, ArticleUpdateManyProps, ArticleUpdateManyResponse, ArticleUpdateProps, ArticleUpdateResponse, ArticleUpsertProps, ArticleUpsertResponse } from "@services/types/ArticleType";

// ========== Single mutations ========== //

export const ArticleCreate = async <T extends ArticleCreateProps>(props: T): Promise<ArticleCreateResponse<T>> => {
    try {
        const { data, error } = await ArticleService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCreate -> " + (error as Error).message);
    }
};

export const ArticleUpsert = async <T extends ArticleUpsertProps>(props: T): Promise<ArticleUpsertResponse<T>> => {
    try {
        const { data, error } = await ArticleService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpsert -> " + (error as Error).message);
    }
};

export const ArticleUpdate = async <T extends ArticleUpdateProps>(props: T): Promise<ArticleUpdateResponse<T>> => {
    try {
        const { data, error } = await ArticleService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpdate -> " + (error as Error).message);
    }
};

export const ArticleDelete = async <T extends ArticleDeleteProps>(props: T): Promise<ArticleDeleteResponse<T>> => {
    try {
        const { data, error } = await ArticleService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const ArticleCreateMany = async (props: ArticleCreateManyProps): Promise<ArticleCreateManyResponse> => {
    try {
        const { data, error } = await ArticleService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCreateMany -> " + (error as Error).message);
    }
};

export const ArticleUpdateMany = async (props: ArticleUpdateManyProps): Promise<ArticleUpdateManyResponse> => {
    try {
        const { data, error } = await ArticleService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleUpdateMany -> " + (error as Error).message);
    }
};

export const ArticleDeleteMany = async (props: ArticleDeleteManyProps): Promise<ArticleDeleteManyResponse> => {
    try {
        const { data, error } = await ArticleService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindFirst = async <T extends ArticleFindFirstProps>(
    props: T
): Promise<ArticleFindFirstResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ArticleFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindUnique = async <T extends ArticleFindUniqueProps>(
    props: T
): Promise<ArticleFindUniqueResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("ArticleFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleFindMany = async <T extends ArticleFindManyProps>(
    props: T
): Promise<ArticleFindManyResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const ArticleCount = async (props: ArticleCountProps): Promise<ArticleCountResponse> => {
    try {
        const { data, error } = await ArticleService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("ArticleCount -> " + (error as Error).message);
    }
};
