import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type UserFindManyProps<T extends Prisma.UserFindManyArgs> = Prisma.SelectSubset<T, Prisma.UserFindManyArgs>;
export type UserFindManyResponse<T extends Prisma.UserFindManyArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type UserFindFirstProps<T extends Prisma.UserFindFirstArgs> = Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>;
export type UserFindFirstResponse<T extends Prisma.UserFindFirstArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type UserFindUniqueProps<T extends Prisma.UserFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.UserFindUniqueArgs
>;
export type UserFindUniqueResponse<T extends Prisma.UserFindUniqueArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type UserCountProps<T extends Prisma.UserCountArgs> = Prisma.SelectSubset<T, Prisma.UserCountArgs>;
export type UserCountResponse<T extends Prisma.UserCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.UserCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const UserFindManyCached = async <T extends Prisma.UserFindManyArgs>(
    params: UserFindManyProps<T>,
): Promise<UserFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All user services
        "user",
        // All findMany services
        "findMany",
        // All user findMany services
        "user-findMany",
        // This specific services
        `user-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.user.findMany(params);
};

export const UserFindFirstCached = async <T extends Prisma.UserFindFirstArgs>(
    params: UserFindFirstProps<T>,
): Promise<UserFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All user services
        "user",
        // All findFirst services
        "findFirst",
        // All user findFirst services
        "user-findFirst",
        // This specific services
        `user-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.user.findFirst(params);
};

export const UserFindUniqueCached = async <T extends Prisma.UserFindUniqueArgs>(
    params: UserFindUniqueProps<T>,
): Promise<UserFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All user services
        "user",
        // All findUnique services
        "findUnique",
        // All user findUnique services
        "user-findUnique",
        // This specific services
        `user-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.user.findUnique(params);
};

export const UserCountCached = async <T extends Prisma.UserCountArgs>(
    params: UserCountProps<T>,
): Promise<UserCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All user services
        "user",
        // All count services
        "count",
        // All user count services
        "user-count",
        // This specific services
        `user-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.user.count(params);
};
