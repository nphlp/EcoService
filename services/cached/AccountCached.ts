import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type AccountFindManyProps<T extends Prisma.AccountFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindManyArgs
>;
export type AccountFindManyResponse<T extends Prisma.AccountFindManyArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AccountFindFirstProps<T extends Prisma.AccountFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindFirstArgs
>;
export type AccountFindFirstResponse<T extends Prisma.AccountFindFirstArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AccountFindUniqueProps<T extends Prisma.AccountFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindUniqueArgs
>;
export type AccountFindUniqueResponse<T extends Prisma.AccountFindUniqueArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AccountCountProps<T extends Prisma.AccountCountArgs> = Prisma.SelectSubset<T, Prisma.AccountCountArgs>;
export type AccountCountResponse<T extends Prisma.AccountCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AccountCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const AccountFindManyCached = async <T extends Prisma.AccountFindManyArgs>(
    params: AccountFindManyProps<T>,
): Promise<AccountFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All account services
        "account",
        // All findMany services
        "findMany",
        // All account findMany services
        "account-findMany",
        // This specific services
        `account-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.account.findMany(params);
};

export const AccountFindFirstCached = async <T extends Prisma.AccountFindFirstArgs>(
    params: AccountFindFirstProps<T>,
): Promise<AccountFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All account services
        "account",
        // All findFirst services
        "findFirst",
        // All account findFirst services
        "account-findFirst",
        // This specific services
        `account-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.account.findFirst(params);
};

export const AccountFindUniqueCached = async <T extends Prisma.AccountFindUniqueArgs>(
    params: AccountFindUniqueProps<T>,
): Promise<AccountFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All account services
        "account",
        // All findUnique services
        "findUnique",
        // All account findUnique services
        "account-findUnique",
        // This specific services
        `account-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.account.findUnique(params);
};

export const AccountCountCached = async <T extends Prisma.AccountCountArgs>(
    params: AccountCountProps<T>,
): Promise<AccountCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All account services
        "account",
        // All count services
        "count",
        // All account count services
        "account-count",
        // This specific services
        `account-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.account.count(params);
};
