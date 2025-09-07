import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type DiyFindManyProps<T extends Prisma.DiyFindManyArgs> = Prisma.SelectSubset<T, Prisma.DiyFindManyArgs>;
export type DiyFindManyResponse<T extends Prisma.DiyFindManyArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type DiyFindFirstProps<T extends Prisma.DiyFindFirstArgs> = Prisma.SelectSubset<T, Prisma.DiyFindFirstArgs>;
export type DiyFindFirstResponse<T extends Prisma.DiyFindFirstArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type DiyFindUniqueProps<T extends Prisma.DiyFindUniqueArgs> = Prisma.SelectSubset<T, Prisma.DiyFindUniqueArgs>;
export type DiyFindUniqueResponse<T extends Prisma.DiyFindUniqueArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type DiyCountProps<T extends Prisma.DiyCountArgs> = Prisma.SelectSubset<T, Prisma.DiyCountArgs>;
export type DiyCountResponse<T extends Prisma.DiyCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.DiyCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const DiyFindManyCached = async <T extends Prisma.DiyFindManyArgs>(
    params: DiyFindManyProps<T>,
): Promise<DiyFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All diy services
        "diy",
        // All findMany services
        "findMany",
        // All diy findMany services
        "diy-findMany",
        // This specific services
        `diy-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.diy.findMany(params);
};

export const DiyFindFirstCached = async <T extends Prisma.DiyFindFirstArgs>(
    params: DiyFindFirstProps<T>,
): Promise<DiyFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All diy services
        "diy",
        // All findFirst services
        "findFirst",
        // All diy findFirst services
        "diy-findFirst",
        // This specific services
        `diy-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.diy.findFirst(params);
};

export const DiyFindUniqueCached = async <T extends Prisma.DiyFindUniqueArgs>(
    params: DiyFindUniqueProps<T>,
): Promise<DiyFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All diy services
        "diy",
        // All findUnique services
        "findUnique",
        // All diy findUnique services
        "diy-findUnique",
        // This specific services
        `diy-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.diy.findUnique(params);
};

export const DiyCountCached = async <T extends Prisma.DiyCountArgs>(
    params: DiyCountProps<T>,
): Promise<DiyCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All diy services
        "diy",
        // All count services
        "count",
        // All diy count services
        "diy-count",
        // This specific services
        `diy-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.diy.count(params);
};
