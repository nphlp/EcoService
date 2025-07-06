import AccountService from "@services/class/AccountClass";
import { AccountCountProps, AccountFindFirstProps, AccountFindManyProps, AccountFindUniqueProps } from "@services/types/AccountType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const AccountFindManyCached = async <T extends AccountFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account");
    return AccountService.findMany<T>(params);
};

export const AccountFindFirstCached = async <T extends AccountFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/first");
    return AccountService.findFirst<T>(params);
};

export const AccountFindUniqueCached = async <T extends AccountFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/unique");
    return AccountService.findUnique<T>(params);
};

export const AccountCountCached = async (params: AccountCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/account/count");
    return AccountService.count(params);
};
