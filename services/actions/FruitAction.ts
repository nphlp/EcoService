"use server";

import FruitService from "@services/class/FruitClass";
import { CountFruitProps, CountFruitResponse, CreateFruitProps, CreateFruitResponse, DeleteFruitProps, DeleteFruitResponse, FindManyFruitProps, FindManyFruitResponse, FindUniqueFruitProps, FindUniqueFruitResponse, UpdateFruitProps, UpdateFruitResponse, UpsertFruitProps, UpsertFruitResponse } from "@services/types/FruitType";

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

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFruit = async <T extends FindUniqueFruitProps>(
    props: T
): Promise<FindUniqueFruitResponse<T>> => {
    try {
        const { data, error } = await FruitService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFruit -> " + (error as Error).message);
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
