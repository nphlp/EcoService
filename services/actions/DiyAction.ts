"use server";

import DiyService from "@services/class/DiyClass";
import { CountDiyProps, CountDiyResponse, CreateManyDiyProps, CreateManyDiyResponse, CreateDiyProps, CreateDiyResponse, DeleteManyDiyProps, DeleteManyDiyResponse, DeleteDiyProps, DeleteDiyResponse, FindFirstDiyProps, FindFirstDiyResponse, FindManyDiyProps, FindManyDiyResponse, FindUniqueDiyProps, FindUniqueDiyResponse, UpdateManyDiyProps, UpdateManyDiyResponse, UpdateDiyProps, UpdateDiyResponse, UpsertDiyProps, UpsertDiyResponse } from "@services/types/DiyType";

// ========== Single mutations ========== //

export const CreateDiy = async <T extends CreateDiyProps>(props: T): Promise<CreateDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateDiy -> " + (error as Error).message);
    }
};

export const UpsertDiy = async <T extends UpsertDiyProps>(props: T): Promise<UpsertDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertDiy -> " + (error as Error).message);
    }
};

export const UpdateDiy = async <T extends UpdateDiyProps>(props: T): Promise<UpdateDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateDiy -> " + (error as Error).message);
    }
};

export const DeleteDiy = async <T extends DeleteDiyProps>(props: T): Promise<DeleteDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteDiy -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyDiy = async (props: CreateManyDiyProps): Promise<CreateManyDiyResponse> => {
    try {
        const { data, error } = await DiyService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyDiy -> " + (error as Error).message);
    }
};

export const UpdateManyDiy = async (props: UpdateManyDiyProps): Promise<UpdateManyDiyResponse> => {
    try {
        const { data, error } = await DiyService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyDiy -> " + (error as Error).message);
    }
};

export const DeleteManyDiy = async (props: DeleteManyDiyProps): Promise<DeleteManyDiyResponse> => {
    try {
        const { data, error } = await DiyService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyDiy -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstDiy = async <T extends FindFirstDiyProps>(
    props: T
): Promise<FindFirstDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstDiy -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueDiy = async <T extends FindUniqueDiyProps>(
    props: T
): Promise<FindUniqueDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueDiy -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectDiyList = async <T extends FindManyDiyProps>(
    props: T
): Promise<FindManyDiyResponse<T>> => {
    try {
        const { data, error } = await DiyService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectDiyAmount = async (props: CountDiyProps): Promise<CountDiyResponse> => {
    try {
        const { data, error } = await DiyService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectDiyAmount -> " + (error as Error).message);
    }
};
