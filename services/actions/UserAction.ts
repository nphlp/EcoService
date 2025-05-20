"use server";

import UserService from "@services/class/UserClass";
import { UserCountProps, UserCountResponse, UserCreateManyProps, UserCreateManyResponse, UserCreateProps, UserCreateResponse, UserDeleteManyProps, UserDeleteManyResponse, UserDeleteProps, UserDeleteResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse, UserUpdateManyProps, UserUpdateManyResponse, UserUpdateProps, UserUpdateResponse, UserUpsertProps, UserUpsertResponse } from "@services/types/UserType";

// ========== Single mutations ========== //

export const UserCreate = async <T extends UserCreateProps>(props: T): Promise<UserCreateResponse<T>> => {
    try {
        const { data, error } = await UserService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreate -> " + (error as Error).message);
    }
};

export const UserUpsert = async <T extends UserUpsertProps>(props: T): Promise<UserUpsertResponse<T>> => {
    try {
        const { data, error } = await UserService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpsert -> " + (error as Error).message);
    }
};

export const UserUpdate = async <T extends UserUpdateProps>(props: T): Promise<UserUpdateResponse<T>> => {
    try {
        const { data, error } = await UserService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdate -> " + (error as Error).message);
    }
};

export const UserDelete = async <T extends UserDeleteProps>(props: T): Promise<UserDeleteResponse<T>> => {
    try {
        const { data, error } = await UserService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const UserCreateMany = async (props: UserCreateManyProps): Promise<UserCreateManyResponse> => {
    try {
        const { data, error } = await UserService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreateMany -> " + (error as Error).message);
    }
};

export const UserUpdateMany = async (props: UserUpdateManyProps): Promise<UserUpdateManyResponse> => {
    try {
        const { data, error } = await UserService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdateMany -> " + (error as Error).message);
    }
};

export const UserDeleteMany = async (props: UserDeleteManyProps): Promise<UserDeleteManyResponse> => {
    try {
        const { data, error } = await UserService.deleteMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserDeleteMany -> " + (error as Error).message);
    }
};

// ========== Single queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindFirst = async <T extends UserFindFirstProps>(
    props: T
): Promise<UserFindFirstResponse<T>> => {
    try {
        const { data, error } = await UserService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("UserFindFirst -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindUnique = async <T extends UserFindUniqueProps>(
    props: T
): Promise<UserFindUniqueResponse<T>> => {
    try {
        const { data, error } = await UserService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("UserFindUnique -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserFindMany = async <T extends UserFindManyProps>(
    props: T
): Promise<UserFindManyResponse<T>> => {
    try {
        const { data, error } = await UserService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserFindMany -> " + (error as Error).message);
    }
};

// ========== Aggregate queries ========== //

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const UserCount = async (props: UserCountProps): Promise<UserCountResponse> => {
    try {
        const { data, error } = await UserService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCount -> " + (error as Error).message);
    }
};
