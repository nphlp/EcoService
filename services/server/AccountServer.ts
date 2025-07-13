import AccountService from "@services/class/AccountClass";
import { AccountCountProps, AccountFindFirstProps, AccountFindManyProps, AccountFindUniqueProps } from "@services/types/AccountType";

export const AccountFindManyServer = async <T extends AccountFindManyProps>(params: T) => {
    const { data, error } = await AccountService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AccountFindFirstServer = async <T extends AccountFindFirstProps>(params: T) => {
    const { data, error } = await AccountService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AccountFindUniqueServer = async <T extends AccountFindUniqueProps>(params: T) => {
    const { data, error } = await AccountService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const AccountCountServer = async (params: AccountCountProps) => {
    const { data, error } = await AccountService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 