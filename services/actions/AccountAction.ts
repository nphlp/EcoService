"use server";

import AccountService from "@services/class/AccountClass";
import { AccountCountProps, AccountCountResponse, AccountCreateManyProps, AccountCreateManyResponse, AccountCreateProps, AccountCreateResponse, AccountDeleteManyProps, AccountDeleteManyResponse, AccountDeleteProps, AccountDeleteResponse, AccountFindFirstProps, AccountFindFirstResponse, AccountFindManyProps, AccountFindManyResponse, AccountFindUniqueProps, AccountFindUniqueResponse, AccountUpdateManyProps, AccountUpdateManyResponse, AccountUpdateProps, AccountUpdateResponse, AccountUpsertProps, AccountUpsertResponse } from "@services/types/AccountType";

// ========== Single mutations ========== //

export const AccountCreateAction = async <T extends AccountCreateProps>(props: T): Promise<AccountCreateResponse<T>> => {
    try {
        const { data, error } = await AccountService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCreate -> " + (error as Error).message);
    }
};

export const AccountUpsertAction = async <T extends AccountUpsertProps>(props: T): Promise<AccountUpsertResponse<T>> => {
    try {
        const { data, error } = await AccountService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpsert -> " + (error as Error).message);
    }
};

export const AccountUpdateAction = async <T extends AccountUpdateProps>(props: T): Promise<AccountUpdateResponse<T>> => {
    try {
        const { data, error } = await AccountService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpdate -> " + (error as Error).message);
    }
};

export const AccountDeleteAction = async <T extends AccountDeleteProps>(props: T): Promise<AccountDeleteResponse<T>> => {
    try {
        const { data, error } = await AccountService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const AccountCreateManyAction = async (props: AccountCreateManyProps): Promise<AccountCreateManyResponse> => {
    try {
        const { data, error } = await AccountService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCreateMany -> " + (error as Error).message);
    }
};

export const AccountUpdateManyAction = async (props: AccountUpdateManyProps): Promise<AccountUpdateManyResponse> => {
    try {
        const { data, error } = await AccountService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpdateMany -> " + (error as Error).message);
    }
};

export const AccountDeleteManyAction = async (props: AccountDeleteManyProps): Promise<AccountDeleteManyResponse> => {
    try {
        const { data, error } = await AccountService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindFirstAction = async <T extends AccountFindFirstProps>(
    props: T
): Promise<AccountFindFirstResponse<T>> => {
    try {
        const { data, error } = await AccountService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AccountFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindUniqueAction = async <T extends AccountFindUniqueProps>(
    props: T
): Promise<AccountFindUniqueResponse<T>> => {
    try {
        const { data, error } = await AccountService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AccountFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindManyAction = async <T extends AccountFindManyProps>(
    props: T
): Promise<AccountFindManyResponse<T>> => {
    try {
        const { data, error } = await AccountService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountCountAction = async (props: AccountCountProps): Promise<AccountCountResponse> => {
    try {
        const { data, error } = await AccountService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCount -> " + (error as Error).message);
    }
};
