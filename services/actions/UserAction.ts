"use server";

import UserService from "@services/class/UserClass";
import { CountUserProps, CountUserResponse, CreateUserProps, CreateUserResponse, DeleteUserProps, DeleteUserResponse, FindFirstUserProps, FindFirstUserResponse, FindManyUserProps, FindManyUserResponse, FindUniqueUserProps, FindUniqueUserResponse, UpdateUserProps, UpdateUserResponse, UpsertUserProps, UpsertUserResponse } from "@services/types/UserType";

export const CreateUser = async <T extends CreateUserProps>(props: T): Promise<CreateUserResponse<T>> => {
    try {
        const { data, error } = await UserService.create(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("CreateUser -> " + (error as Error).message);
    }
};

export const UpsertUser = async <T extends UpsertUserProps>(props: T): Promise<UpsertUserResponse<T>> => {
    try {
        const { data, error } = await UserService.upsert(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpsertUser -> " + (error as Error).message);
    }
};

export const UpdateUser = async <T extends UpdateUserProps>(props: T): Promise<UpdateUserResponse<T>> => {
    try {
        const { data, error } = await UserService.update(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("UpdateUser -> " + (error as Error).message);
    }
};

export const DeleteUser = async <T extends DeleteUserProps>(props: T): Promise<DeleteUserResponse<T>> => {
    try {
        const { data, error } = await UserService.delete(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("DeleteUser -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectFirstUser = async <T extends FindFirstUserProps>(
    props: T
): Promise<FindFirstUserResponse<T>> => {
    try {
        const { data, error } = await UserService.findFirst(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectFirstUser -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUniqueUser = async <T extends FindUniqueUserProps>(
    props: T
): Promise<FindUniqueUserResponse<T>> => {
    try {
        const { data, error } = await UserService.findUnique(props);
        if (error) throw new Error(error);
        return data ?? null;
    } catch (error) {
        throw new Error("SelectUniqueUser -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUserList = async <T extends FindManyUserProps>(
    props: T
): Promise<FindManyUserResponse<T>> => {
    try {
        const { data, error } = await UserService.findMany(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectUserList -> " + (error as Error).message);
    }
};

/**
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 */
export const SelectUserAmount = async (props: CountUserProps): Promise<CountUserResponse> => {
    try {
        const { data, error } = await UserService.count(props);
        if (!data || error) throw new Error(error);
        return data;
    } catch (error) {
        throw new Error("SelectUserAmount -> " + (error as Error).message);
    }
};
