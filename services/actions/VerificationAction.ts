"use server";

import VerificationService from "@services/class/VerificationClass";
import { CountVerificationProps, CountVerificationResponse, CreateVerificationProps, CreateVerificationResponse, DeleteVerificationProps, DeleteVerificationResponse, FindManyVerificationProps, FindManyVerificationResponse, FindUniqueVerificationProps, FindUniqueVerificationResponse, UpdateVerificationProps, UpdateVerificationResponse, UpsertVerificationProps, UpsertVerificationResponse } from "@services/types/VerificationType";

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

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectVerification = async <T extends FindUniqueVerificationProps>(
    props: T
): Promise<FindUniqueVerificationResponse<T>> => {
    try {
        const { data, error } = await VerificationService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectVerification -> " + (error as Error).message);
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
