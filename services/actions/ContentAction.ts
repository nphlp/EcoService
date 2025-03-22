"use server";

import ContentService from "@services/class/ContentClass";
import { CountContentProps, CountContentResponse, CreateContentProps, CreateContentResponse, DeleteContentProps, DeleteContentResponse, FindManyContentProps, FindManyContentResponse, FindUniqueContentProps, FindUniqueContentResponse, UpdateContentProps, UpdateContentResponse, UpsertContentProps, UpsertContentResponse } from "@services/types/ContentType";

export const CreateContent = async <T extends CreateContentProps>(props: T): Promise<CreateContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateContent -> " + (error as Error).message);
    }
};

export const UpsertContent = async <T extends UpsertContentProps>(props: T): Promise<UpsertContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertContent -> " + (error as Error).message);
    }
};

export const UpdateContent = async <T extends UpdateContentProps>(props: T): Promise<UpdateContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateContent -> " + (error as Error).message);
    }
};

export const DeleteContent = async <T extends DeleteContentProps>(props: T): Promise<DeleteContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteContent -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectContent = async <T extends FindUniqueContentProps>(
    props: T
): Promise<FindUniqueContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectContent -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectContentList = async <T extends FindManyContentProps>(
    props: T
): Promise<FindManyContentResponse<T>> => {
    try {
        const { data, error } = await ContentService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectContentList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectContentAmount = async (props: CountContentProps): Promise<CountContentResponse> => {
    try {
        const { data, error } = await ContentService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectContentAmount -> " + (error as Error).message);
    }
};
