"use server";

import ArticleService from "@services/class/ArticleClass";
import { CountArticleProps, CountArticleResponse, CreateArticleProps, CreateArticleResponse, DeleteArticleProps, DeleteArticleResponse, FindFirstArticleProps, FindFirstArticleResponse, FindManyArticleProps, FindManyArticleResponse, FindUniqueArticleProps, FindUniqueArticleResponse, UpdateArticleProps, UpdateArticleResponse, UpsertArticleProps, UpsertArticleResponse } from "@services/types/ArticleType";

export const CreateArticle = async <T extends CreateArticleProps>(props: T): Promise<CreateArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateArticle -> " + (error as Error).message);
    }
};

export const UpsertArticle = async <T extends UpsertArticleProps>(props: T): Promise<UpsertArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertArticle -> " + (error as Error).message);
    }
};

export const UpdateArticle = async <T extends UpdateArticleProps>(props: T): Promise<UpdateArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateArticle -> " + (error as Error).message);
    }
};

export const DeleteArticle = async <T extends DeleteArticleProps>(props: T): Promise<DeleteArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteArticle -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstArticle = async <T extends FindFirstArticleProps>(
    props: T
): Promise<FindFirstArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstArticle -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueArticle = async <T extends FindUniqueArticleProps>(
    props: T
): Promise<FindUniqueArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueArticle -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectArticleList = async <T extends FindManyArticleProps>(
    props: T
): Promise<FindManyArticleResponse<T>> => {
    try {
        const { data, error } = await ArticleService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectArticleList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectArticleAmount = async (props: CountArticleProps): Promise<CountArticleResponse> => {
    try {
        const { data, error } = await ArticleService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectArticleAmount -> " + (error as Error).message);
    }
};
