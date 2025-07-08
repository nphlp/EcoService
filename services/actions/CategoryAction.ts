"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import CategoryService from "@services/class/CategoryClass";
import { CategoryCountProps, CategoryCountResponse, CategoryCreateManyProps, CategoryCreateManyResponse, CategoryCreateProps, CategoryCreateResponse, CategoryDeleteManyProps, CategoryDeleteManyResponse, CategoryDeleteProps, CategoryDeleteResponse, CategoryFindFirstProps, CategoryFindFirstResponse, CategoryFindManyProps, CategoryFindManyResponse, CategoryFindUniqueProps, CategoryFindUniqueResponse, CategoryUpdateManyProps, CategoryUpdateManyResponse, CategoryUpdateProps, CategoryUpdateResponse, CategoryUpsertProps, CategoryUpsertResponse } from "@services/types/CategoryType";

// ========== Single mutations ========== //

export const CategoryCreateAction = async <T extends CategoryCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<CategoryCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryCreateAction", "Category", "create");
        const { data, error } = await CategoryService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCreateAction -> " + (error as Error).message);
    }
};

export const CategoryUpsertAction = async <T extends CategoryUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<CategoryUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryUpsertAction", "Category", "upsert");
        const { data, error } = await CategoryService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpsertAction -> " + (error as Error).message);
    }
};

export const CategoryUpdateAction = async <T extends CategoryUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<CategoryUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryUpdateAction", "Category", "update");
        const { data, error } = await CategoryService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpdateAction -> " + (error as Error).message);
    }
};

export const CategoryDeleteAction = async <T extends CategoryDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<CategoryDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryDeleteAction", "Category", "delete");
        const { data, error } = await CategoryService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CategoryCreateManyAction = async (props: CategoryCreateManyProps, disableSafeMessage: boolean = false): Promise<CategoryCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryCreateManyAction", "Category", "createMany");
        const { data, error } = await CategoryService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCreateManyAction -> " + (error as Error).message);
    }
};

export const CategoryUpdateManyAction = async (props: CategoryUpdateManyProps, disableSafeMessage: boolean = false): Promise<CategoryUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryUpdateManyAction", "Category", "updateMany");
        const { data, error } = await CategoryService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryUpdateManyAction -> " + (error as Error).message);
    }
};

export const CategoryDeleteManyAction = async (props: CategoryDeleteManyProps, disableSafeMessage: boolean = false): Promise<CategoryDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryDeleteManyAction", "Category", "deleteMany");
        const { data, error } = await CategoryService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindFirstAction = async <T extends CategoryFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<CategoryFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryFindFirstAction", "Category", "findFirst");
        const { data, error } = await CategoryService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("CategoryFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindUniqueAction = async <T extends CategoryFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<CategoryFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryFindUniqueAction", "Category", "findUnique");
        const { data, error } = await CategoryService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("CategoryFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryFindManyAction = async <T extends CategoryFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<CategoryFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryFindManyAction", "Category", "findMany");
        const { data, error } = await CategoryService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const CategoryCountAction = async (props: CategoryCountProps, disableSafeMessage: boolean = false): Promise<CategoryCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "CategoryCountAction", "Category", "count");
        const { data, error } = await CategoryService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CategoryCountAction -> " + (error as Error).message);
    }
};
