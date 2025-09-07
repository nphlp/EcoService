import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type QuantityFindManyProps<T extends Prisma.QuantityFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindManyArgs
>;
export type QuantityFindManyResponse<T extends Prisma.QuantityFindManyArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type QuantityFindFirstProps<T extends Prisma.QuantityFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindFirstArgs
>;
export type QuantityFindFirstResponse<T extends Prisma.QuantityFindFirstArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type QuantityFindUniqueProps<T extends Prisma.QuantityFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindUniqueArgs
>;
export type QuantityFindUniqueResponse<T extends Prisma.QuantityFindUniqueArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type QuantityCountProps<T extends Prisma.QuantityCountArgs> = Prisma.SelectSubset<T, Prisma.QuantityCountArgs>;
export type QuantityCountResponse<T extends Prisma.QuantityCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.QuantityCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const QuantityFindManyCached = async <T extends Prisma.QuantityFindManyArgs>(
    params: QuantityFindManyProps<T>,
): Promise<QuantityFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All quantity services
        "quantity",
        // All findMany services
        "findMany",
        // All quantity findMany services
        "quantity-findMany",
        // This specific services
        `quantity-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.quantity.findMany(params);
};

export const QuantityFindFirstCached = async <T extends Prisma.QuantityFindFirstArgs>(
    params: QuantityFindFirstProps<T>,
): Promise<QuantityFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All quantity services
        "quantity",
        // All findFirst services
        "findFirst",
        // All quantity findFirst services
        "quantity-findFirst",
        // This specific services
        `quantity-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.quantity.findFirst(params);
};

export const QuantityFindUniqueCached = async <T extends Prisma.QuantityFindUniqueArgs>(
    params: QuantityFindUniqueProps<T>,
): Promise<QuantityFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All quantity services
        "quantity",
        // All findUnique services
        "findUnique",
        // All quantity findUnique services
        "quantity-findUnique",
        // This specific services
        `quantity-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.quantity.findUnique(params);
};

export const QuantityCountCached = async <T extends Prisma.QuantityCountArgs>(
    params: QuantityCountProps<T>,
): Promise<QuantityCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All quantity services
        "quantity",
        // All count services
        "count",
        // All quantity count services
        "quantity-count",
        // This specific services
        `quantity-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.quantity.count(params);
};
