"use server";

import FruitService from "@services/class/FruitClass";
import { CountFruitProps, CountFruitResponse, CreateManyFruitProps, CreateManyFruitResponse, CreateFruitProps, CreateFruitResponse, DeleteManyFruitProps, DeleteManyFruitResponse, DeleteFruitProps, DeleteFruitResponse, FindFirstFruitProps, FindFirstFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse, UpdateManyFruitProps, UpdateManyFruitResponse, UpdateFruitProps, UpdateFruitResponse, UpsertFruitProps, UpsertFruitResponse } from "@services/types/FruitType";

// ========== Single mutations ========== //

export const CreateFruit = async <T extends CreateFruitProps>(props: T): Promise<CreateFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateFruit -> " + (error as Error).message);
    }
};

export const UpsertFruit = async <T extends UpsertFruitProps>(props: T): Promise<UpsertFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertFruit -> " + (error as Error).message);
    }
};

export const UpdateFruit = async <T extends UpdateFruitProps>(props: T): Promise<UpdateFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateFruit -> " + (error as Error).message);
    }
};

export const DeleteFruit = async <T extends DeleteFruitProps>(props: T): Promise<DeleteFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteFruit -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyFruit = async (props: CreateManyFruitProps): Promise<CreateManyFruitResponse> => {
    try {
        const { data, error } = await FruitService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyFruit -> " + (error as Error).message);
    }
};

export const UpdateManyFruit = async (props: UpdateManyFruitProps): Promise<UpdateManyFruitResponse> => {
    try {
        const { data, error } = await FruitService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyFruit -> " + (error as Error).message);
    }
};

export const DeleteManyFruit = async (props: DeleteManyFruitProps): Promise<DeleteManyFruitResponse> => {
    try {
        const { data, error } = await FruitService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyFruit -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstFruit = async <T extends FindFirstFruitProps>(
    props: T
): Promise<FindFirstFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstFruit -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueFruit = async <T extends FindUniqueFruitProps>(
    props: T
): Promise<FindUniqueFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueFruit -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFruitList = async <T extends FindManyFruitProps>(
    props: T
): Promise<FindManyFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectFruitList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFruitAmount = async (props: CountFruitProps): Promise<CountFruitResponse> => {
    try {
        const { data, error } = await FruitService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectFruitAmount -> " + (error as Error).message);
    }
};
