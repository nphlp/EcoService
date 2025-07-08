"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import AccountService from "@services/class/AccountClass";
import { AccountCountProps, AccountCountResponse, AccountCreateManyProps, AccountCreateManyResponse, AccountCreateProps, AccountCreateResponse, AccountDeleteManyProps, AccountDeleteManyResponse, AccountDeleteProps, AccountDeleteResponse, AccountFindFirstProps, AccountFindFirstResponse, AccountFindManyProps, AccountFindManyResponse, AccountFindUniqueProps, AccountFindUniqueResponse, AccountUpdateManyProps, AccountUpdateManyResponse, AccountUpdateProps, AccountUpdateResponse, AccountUpsertProps, AccountUpsertResponse } from "@services/types/AccountType";

// ========== Single mutations ========== //

export const AccountCreateAction = async <T extends AccountCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<AccountCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountCreateAction", "Account", "create");
        const { data, error } = await AccountService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCreateAction -> " + (error as Error).message);
    }
};

export const AccountUpsertAction = async <T extends AccountUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<AccountUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountUpsertAction", "Account", "upsert");
        const { data, error } = await AccountService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpsertAction -> " + (error as Error).message);
    }
};

export const AccountUpdateAction = async <T extends AccountUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<AccountUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountUpdateAction", "Account", "update");
        const { data, error } = await AccountService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpdateAction -> " + (error as Error).message);
    }
};

export const AccountDeleteAction = async <T extends AccountDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<AccountDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountDeleteAction", "Account", "delete");
        const { data, error } = await AccountService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const AccountCreateManyAction = async (props: AccountCreateManyProps, disableSafeMessage: boolean = false): Promise<AccountCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountCreateManyAction", "Account", "createMany");
        const { data, error } = await AccountService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCreateManyAction -> " + (error as Error).message);
    }
};

export const AccountUpdateManyAction = async (props: AccountUpdateManyProps, disableSafeMessage: boolean = false): Promise<AccountUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountUpdateManyAction", "Account", "updateMany");
        const { data, error } = await AccountService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountUpdateManyAction -> " + (error as Error).message);
    }
};

export const AccountDeleteManyAction = async (props: AccountDeleteManyProps, disableSafeMessage: boolean = false): Promise<AccountDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountDeleteManyAction", "Account", "deleteMany");
        const { data, error } = await AccountService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindFirstAction = async <T extends AccountFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AccountFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountFindFirstAction", "Account", "findFirst");
        const { data, error } = await AccountService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AccountFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindUniqueAction = async <T extends AccountFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AccountFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountFindUniqueAction", "Account", "findUnique");
        const { data, error } = await AccountService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("AccountFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountFindManyAction = async <T extends AccountFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<AccountFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountFindManyAction", "Account", "findMany");
        const { data, error } = await AccountService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const AccountCountAction = async (props: AccountCountProps, disableSafeMessage: boolean = false): Promise<AccountCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "AccountCountAction", "Account", "count");
        const { data, error } = await AccountService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("AccountCountAction -> " + (error as Error).message);
    }
};
