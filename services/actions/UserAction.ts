"use server";

import { requiresSafeMessage } from "@permissions/SafeMessage";
import UserService from "@services/class/UserClass";
import { UserCountProps, UserCountResponse, UserCreateManyProps, UserCreateManyResponse, UserCreateProps, UserCreateResponse, UserDeleteManyProps, UserDeleteManyResponse, UserDeleteProps, UserDeleteResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse, UserUpdateManyProps, UserUpdateManyResponse, UserUpdateProps, UserUpdateResponse, UserUpsertProps, UserUpsertResponse } from "@services/types/UserType";

// ========== Single mutations ========== //

export const UserCreateAction = async <T extends UserCreateProps>(props: T, disableSafeMessage: boolean = false): Promise<UserCreateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserCreateAction", "User", "create");
        const { data, error } = await UserService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreateAction -> " + (error as Error).message);
    }
};

export const UserUpsertAction = async <T extends UserUpsertProps>(props: T, disableSafeMessage: boolean = false): Promise<UserUpsertResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserUpsertAction", "User", "upsert");
        const { data, error } = await UserService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpsertAction -> " + (error as Error).message);
    }
};

export const UserUpdateAction = async <T extends UserUpdateProps>(props: T, disableSafeMessage: boolean = false): Promise<UserUpdateResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserUpdateAction", "User", "update");
        const { data, error } = await UserService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdateAction -> " + (error as Error).message);
    }
};

export const UserDeleteAction = async <T extends UserDeleteProps>(props: T, disableSafeMessage: boolean = false): Promise<UserDeleteResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserDeleteAction", "User", "delete");
        const { data, error } = await UserService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserDeleteAction -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const UserCreateManyAction = async (props: UserCreateManyProps, disableSafeMessage: boolean = false): Promise<UserCreateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserCreateManyAction", "User", "createMany");
        const { data, error } = await UserService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreateManyAction -> " + (error as Error).message);
    }
};

export const UserUpdateManyAction = async (props: UserUpdateManyProps, disableSafeMessage: boolean = false): Promise<UserUpdateManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserUpdateManyAction", "User", "updateMany");
        const { data, error } = await UserService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdateManyAction -> " + (error as Error).message);
    }
};

export const UserDeleteManyAction = async (props: UserDeleteManyProps, disableSafeMessage: boolean = false): Promise<UserDeleteManyResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserDeleteManyAction", "User", "deleteMany");
        const { data, error } = await UserService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserDeleteManyAction -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindFirstAction = async <T extends UserFindFirstProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<UserFindFirstResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserFindFirstAction", "User", "findFirst");
        const { data, error } = await UserService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("UserFindFirstAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindUniqueAction = async <T extends UserFindUniqueProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<UserFindUniqueResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserFindUniqueAction", "User", "findUnique");
        const { data, error } = await UserService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("UserFindUniqueAction -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindManyAction = async <T extends UserFindManyProps>(
    props: T,
    disableSafeMessage: boolean = false
): Promise<UserFindManyResponse<T>> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserFindManyAction", "User", "findMany");
        const { data, error } = await UserService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserFindManyAction -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserCountAction = async (props: UserCountProps, disableSafeMessage: boolean = false): Promise<UserCountResponse> => {
    try {
        await requiresSafeMessage(disableSafeMessage, "UserCountAction", "User", "count");
        const { data, error } = await UserService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCountAction -> " + (error as Error).message);
    }
};
