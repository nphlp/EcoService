"use server";

import UserService from "@services/class/UserClass";
import { UserCountProps, UserCountResponse, UserCreateManyProps, UserCreateManyResponse, UserCreateProps, UserCreateResponse, UserDeleteManyProps, UserDeleteManyResponse, UserDeleteProps, UserDeleteResponse, UserFindFirstProps, UserFindFirstResponse, UserFindManyProps, UserFindManyResponse, UserFindUniqueProps, UserFindUniqueResponse, UserUpdateManyProps, UserUpdateManyResponse, UserUpdateProps, UserUpdateResponse, UserUpsertProps, UserUpsertResponse } from "@services/types/UserType";

// ========== Single mutations ========== //

export const UserCreateAction = async <T extends UserCreateProps>(props: T): Promise<UserCreateResponse<T>> => {
    try {
        const { data, error } = await UserService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreate -> " + (error as Error).message);
    }
};

export const UserUpsertAction = async <T extends UserUpsertProps>(props: T): Promise<UserUpsertResponse<T>> => {
    try {
        const { data, error } = await UserService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpsert -> " + (error as Error).message);
    }
};

export const UserUpdateAction = async <T extends UserUpdateProps>(props: T): Promise<UserUpdateResponse<T>> => {
    try {
        const { data, error } = await UserService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdate -> " + (error as Error).message);
    }
};

export const UserDeleteAction = async <T extends UserDeleteProps>(props: T): Promise<UserDeleteResponse<T>> => {
    try {
        const { data, error } = await UserService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserDelete -> " + (error as Error).message);
    }
};

// ========== Multiple mutations ========== //

export const UserCreateManyAction = async (props: UserCreateManyProps): Promise<UserCreateManyResponse> => {
    try {
        const { data, error } = await UserService.createMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCreateMany -> " + (error as Error).message);
    }
};

export const UserUpdateManyAction = async (props: UserUpdateManyProps): Promise<UserUpdateManyResponse> => {
    try {
        const { data, error } = await UserService.updateMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserUpdateMany -> " + (error as Error).message);
    }
};

export const UserDeleteManyAction = async (props: UserDeleteManyProps): Promise<UserDeleteManyResponse> => {
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
export const UserFindFirstAction = async <T extends UserFindFirstProps>(
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
export const UserFindUniqueAction = async <T extends UserFindUniqueProps>(
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
export const UserFindManyAction = async <T extends UserFindManyProps>(
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
export const UserCountAction = async (props: UserCountProps): Promise<UserCountResponse> => {
    try {
        const { data, error } = await UserService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UserCount -> " + (error as Error).message);
    }
};
