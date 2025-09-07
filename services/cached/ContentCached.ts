import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type ContentFindManyProps<T extends Prisma.ContentFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindManyArgs
>;
export type ContentFindManyResponse<T extends Prisma.ContentFindManyArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ContentFindFirstProps<T extends Prisma.ContentFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindFirstArgs
>;
export type ContentFindFirstResponse<T extends Prisma.ContentFindFirstArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ContentFindUniqueProps<T extends Prisma.ContentFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ContentFindUniqueArgs
>;
export type ContentFindUniqueResponse<T extends Prisma.ContentFindUniqueArgs> = GetResult<
    Prisma.$ContentPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ContentCountProps<T extends Prisma.ContentCountArgs> = Prisma.SelectSubset<T, Prisma.ContentCountArgs>;
export type ContentCountResponse<T extends Prisma.ContentCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ContentCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const ContentFindManyCached = async <T extends Prisma.ContentFindManyArgs>(
    params: ContentFindManyProps<T>,
): Promise<ContentFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All content services
        "content",
        // All findMany services
        "findMany",
        // All content findMany services
        "content-findMany",
        // This specific services
        `content-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.content.findMany(params);
};

export const ContentFindFirstCached = async <T extends Prisma.ContentFindFirstArgs>(
    params: ContentFindFirstProps<T>,
): Promise<ContentFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All content services
        "content",
        // All findFirst services
        "findFirst",
        // All content findFirst services
        "content-findFirst",
        // This specific services
        `content-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.content.findFirst(params);
};

export const ContentFindUniqueCached = async <T extends Prisma.ContentFindUniqueArgs>(
    params: ContentFindUniqueProps<T>,
): Promise<ContentFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All content services
        "content",
        // All findUnique services
        "findUnique",
        // All content findUnique services
        "content-findUnique",
        // This specific services
        `content-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.content.findUnique(params);
};

export const ContentCountCached = async <T extends Prisma.ContentCountArgs>(
    params: ContentCountProps<T>,
): Promise<ContentCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All content services
        "content",
        // All count services
        "count",
        // All content count services
        "content-count",
        // This specific services
        `content-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.content.count(params);
};
