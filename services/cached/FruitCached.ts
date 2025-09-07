import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type FruitFindManyProps<T extends Prisma.FruitFindManyArgs> = Prisma.SelectSubset<T, Prisma.FruitFindManyArgs>;
export type FruitFindManyResponse<T extends Prisma.FruitFindManyArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type FruitFindFirstProps<T extends Prisma.FruitFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindFirstArgs
>;
export type FruitFindFirstResponse<T extends Prisma.FruitFindFirstArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type FruitFindUniqueProps<T extends Prisma.FruitFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindUniqueArgs
>;
export type FruitFindUniqueResponse<T extends Prisma.FruitFindUniqueArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type FruitCountProps<T extends Prisma.FruitCountArgs> = Prisma.SelectSubset<T, Prisma.FruitCountArgs>;
export type FruitCountResponse<T extends Prisma.FruitCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.FruitCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const FruitFindManyCached = async <T extends Prisma.FruitFindManyArgs>(
    params: FruitFindManyProps<T>,
): Promise<FruitFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All fruit services
        "fruit",
        // All findMany services
        "findMany",
        // All fruit findMany services
        "fruit-findMany",
        // This specific services
        `fruit-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.fruit.findMany(params);
};

export const FruitFindFirstCached = async <T extends Prisma.FruitFindFirstArgs>(
    params: FruitFindFirstProps<T>,
): Promise<FruitFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All fruit services
        "fruit",
        // All findFirst services
        "findFirst",
        // All fruit findFirst services
        "fruit-findFirst",
        // This specific services
        `fruit-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.fruit.findFirst(params);
};

export const FruitFindUniqueCached = async <T extends Prisma.FruitFindUniqueArgs>(
    params: FruitFindUniqueProps<T>,
): Promise<FruitFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All fruit services
        "fruit",
        // All findUnique services
        "findUnique",
        // All fruit findUnique services
        "fruit-findUnique",
        // This specific services
        `fruit-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.fruit.findUnique(params);
};

export const FruitCountCached = async <T extends Prisma.FruitCountArgs>(
    params: FruitCountProps<T>,
): Promise<FruitCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All fruit services
        "fruit",
        // All count services
        "count",
        // All fruit count services
        "fruit-count",
        // This specific services
        `fruit-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.fruit.count(params);
};
