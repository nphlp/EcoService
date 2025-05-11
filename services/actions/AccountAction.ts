"use server";

import AccountService from "@services/class/AccountClass";
import { CountAccountProps, CountAccountResponse, CreateManyAccountProps, CreateManyAccountResponse, CreateAccountProps, CreateAccountResponse, DeleteManyAccountProps, DeleteManyAccountResponse, DeleteAccountProps, DeleteAccountResponse, FindFirstAccountProps, FindFirstAccountResponse, FindManyAccountProps, FindManyAccountResponse, FindUniqueAccountProps, FindUniqueAccountResponse, UpdateManyAccountProps, UpdateManyAccountResponse, UpdateAccountProps, UpdateAccountResponse, UpsertAccountProps, UpsertAccountResponse } from "@services/types/AccountType";

// ========== Single mutations ========== //

export const CreateAccount = async <T extends CreateAccountProps>(props: T): Promise<CreateAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateAccount -> " + (error as Error).message);
    }
};

export const UpsertAccount = async <T extends UpsertAccountProps>(props: T): Promise<UpsertAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertAccount -> " + (error as Error).message);
    }
};

export const UpdateAccount = async <T extends UpdateAccountProps>(props: T): Promise<UpdateAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateAccount -> " + (error as Error).message);
    }
};

export const DeleteAccount = async <T extends DeleteAccountProps>(props: T): Promise<DeleteAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteAccount -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const CreateManyAccount = async (props: CreateManyAccountProps): Promise<CreateManyAccountResponse> => {
    try {
        const { data, error } = await AccountService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateManyAccount -> " + (error as Error).message);
    }
};

export const UpdateManyAccount = async (props: UpdateManyAccountProps): Promise<UpdateManyAccountResponse> => {
    try {
        const { data, error } = await AccountService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateManyAccount -> " + (error as Error).message);
    }
};

export const DeleteManyAccount = async (props: DeleteManyAccountProps): Promise<DeleteManyAccountResponse> => {
    try {
        const { data, error } = await AccountService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteManyAccount -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstAccount = async <T extends FindFirstAccountProps>(
    props: T
): Promise<FindFirstAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstAccount -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueAccount = async <T extends FindUniqueAccountProps>(
    props: T
): Promise<FindUniqueAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueAccount -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAccountList = async <T extends FindManyAccountProps>(
    props: T
): Promise<FindManyAccountResponse<T>> => {
    try {
        const { data, error } = await AccountService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountList -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectAccountAmount = async (props: CountAccountProps): Promise<CountAccountResponse> => {
    try {
        const { data, error } = await AccountService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectAccountAmount -> " + (error as Error).message);
    }
};
