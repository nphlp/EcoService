"use server";

import VerificationService from "@services/class/VerificationClass";
import { CountVerificationProps, CountVerificationResponse, CreateManyVerificationProps, CreateManyVerificationResponse, CreateVerificationProps, CreateVerificationResponse, DeleteManyVerificationProps, DeleteManyVerificationResponse, DeleteVerificationProps, DeleteVerificationResponse, FindFirstVerificationProps, FindFirstVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse, UpdateManyVerificationProps, UpdateManyVerificationResponse, UpdateVerificationProps, UpdateVerificationResponse, UpsertVerificationProps, UpsertVerificationResponse } from "@services/types/VerificationType";

// ========== Single mutations ========== //

export const CreateVerification = async <T extends CreateVerificationProps>(props: T): Promise<CreateVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateVerification -> " + (error as Error).message);
    }
};

export const UpsertVerification = async <T extends UpsertVerificationProps>(props: T): Promise<UpsertVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertVerification -> " + (error as Error).message);
    }
};

export const UpdateVerification = async <T extends UpdateVerificationProps>(props: T): Promise<UpdateVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateVerification -> " + (error as Error).message);
    }
};

export const DeleteVerification = async <T extends DeleteVerificationProps>(props: T): Promise<DeleteVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteVerification -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyVerification = async (props: CreateManyVerificationProps): Promise<CreateManyVerificationResponse> => {
    try {
        const { data, error } = await VerificationService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyVerification -> " + (error as Error).message);
    }
};

export const UpdateManyVerification = async (props: UpdateManyVerificationProps): Promise<UpdateManyVerificationResponse> => {
    try {
        const { data, error } = await VerificationService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyVerification -> " + (error as Error).message);
    }
};

export const DeleteManyVerification = async (props: DeleteManyVerificationProps): Promise<DeleteManyVerificationResponse> => {
    try {
        const { data, error } = await VerificationService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyVerification -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstVerification = async <T extends FindFirstVerificationProps>(
    props: T
): Promise<FindFirstVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstVerification -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueVerification = async <T extends FindUniqueVerificationProps>(
    props: T
): Promise<FindUniqueVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueVerification -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectVerificationList = async <T extends FindManyVerificationProps>(
    props: T
): Promise<FindManyVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectVerificationList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectVerificationAmount = async (props: CountVerificationProps): Promise<CountVerificationResponse> => {
    try {
        const { data, error } = await VerificationService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectVerificationAmount -> " + (error as Error).message);
    }
};
