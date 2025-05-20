"use server";

import CategoryService from "@services/class/CategoryClass";
import { CategoryCountProps, CategoryCountResponse, CategoryCreateManyProps, CategoryCreateManyResponse, CategoryCreateProps, CategoryCreateResponse, CategoryDeleteManyProps, CategoryDeleteManyResponse, CategoryDeleteProps, CategoryDeleteResponse, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindUniqueProps, CategoryFindUniqueResponse, CategoryUpdateManyProps, CategoryUpdateManyResponse, CategoryUpdateProps, CategoryUpdateResponse, CategoryUpsertProps, CategoryUpsertResponse } from "@services/types/CategoryType";

// ========== Single mutations ========== //

export const CategoryCreate = async <T extends CategoryCreateProps>(props: T): Promise<CategoryCreateResponse<T>> => {
    try {
        const { data, error } = await CategoryService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCreate -> " + (error as Error).message);
    }
};

export const CategoryUpsert = async <T extends CategoryUpsertProps>(props: T): Promise<CategoryUpsertResponse<T>> => {
    try {
        const { data, error } = await CategoryService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpsert -> " + (error as Error).message);
    }
};

export const CategoryUpdate = async <T extends CategoryUpdateProps>(props: T): Promise<CategoryUpdateResponse<T>> => {
    try {
        const { data, error } = await CategoryService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpdate -> " + (error as Error).message);
    }
};

export const CategoryDelete = async <T extends CategoryDeleteProps>(props: T): Promise<CategoryDeleteResponse<T>> => {
    try {
        const { data, error } = await CategoryService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CategoryCreateMany = async (props: CategoryCreateManyProps): Promise<CategoryCreateManyResponse> => {
    try {
        const { data, error } = await CategoryService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCreateMany -> " + (error as Error).message);
    }
};

export const CategoryUpdateMany = async (props: CategoryUpdateManyProps): Promise<CategoryUpdateManyResponse> => {
    try {
        const { data, error } = await CategoryService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpdateMany -> " + (error as Error).message);
    }
};

export const CategoryDeleteMany = async (props: CategoryDeleteManyProps): Promise<CategoryDeleteManyResponse> => {
    try {
        const { data, error } = await CategoryService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindFirst = async <T extends CategoryFindFirstProps>(
    props: T
): Promise<CategoryFindFirstResponse<T>> => {
    try {
        const { data, error } = await CategoryService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("CategoryFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindUnique = async <T extends CategoryFindUniqueProps>(
    props: T
): Promise<CategoryFindUniqueResponse<T>> => {
    try {
        const { data, error } = await CategoryService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("CategoryFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindMany = async <T extends CategoryFindManyProps>(
    props: T
): Promise<CategoryFindManyResponse<T>> => {
    try {
        const { data, error } = await CategoryService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryCount = async (props: CategoryCountProps): Promise<CategoryCountResponse> => {
    try {
        const { data, error } = await CategoryService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCount -> " + (error as Error).message);
    }
};
