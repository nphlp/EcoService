import UserService from "@services/class/UserClass";
import { UserCountProps, UserFindFirstProps, UserFindManyProps, UserFindUniqueProps } from "@services/types/UserType";

export const UserFindManyServer = async <T extends UserFindManyProps>(params: T) => {
    const { data, error } = await UserService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const UserFindFirstServer = async <T extends UserFindFirstProps>(params: T) => {
    const { data, error } = await UserService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const UserFindUniqueServer = async <T extends UserFindUniqueProps>(params: T) => {
    const { data, error } = await UserService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const UserCountServer = async (params: UserCountProps) => {
    const { data, error } = await UserService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 