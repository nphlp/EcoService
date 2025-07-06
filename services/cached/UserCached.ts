import UserService from "@services/class/UserClass";
import { UserCountProps, UserFindFirstProps, UserFindManyProps, UserFindUniqueProps } from "@services/types/UserType";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const UserFindManyCached = async <T extends UserFindManyProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user");
    return UserService.findMany<T>(params);
};

export const UserFindFirstCached = async <T extends UserFindFirstProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/first");
    return UserService.findFirst<T>(params);
};

export const UserFindUniqueCached = async <T extends UserFindUniqueProps>(params: T) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/unique");
    return UserService.findUnique<T>(params);
};

export const UserCountCached = async (params: UserCountProps) => {
    "use cache";
    cacheLife(cacheLifeApi);
    cacheTag("/api/user/count");
    return UserService.count(params);
};
