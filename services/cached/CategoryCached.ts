import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type CategoryFindManyProps<T extends Prisma.CategoryFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindManyArgs
>;
export type CategoryFindManyResponse<T extends Prisma.CategoryFindManyArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type CategoryFindFirstProps<T extends Prisma.CategoryFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindFirstArgs
>;
export type CategoryFindFirstResponse<T extends Prisma.CategoryFindFirstArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type CategoryFindUniqueProps<T extends Prisma.CategoryFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindUniqueArgs
>;
export type CategoryFindUniqueResponse<T extends Prisma.CategoryFindUniqueArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type CategoryCountProps<T extends Prisma.CategoryCountArgs> = Prisma.SelectSubset<T, Prisma.CategoryCountArgs>;
export type CategoryCountResponse<T extends Prisma.CategoryCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.CategoryCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const CategoryFindManyCached = async <T extends Prisma.CategoryFindManyArgs>(
    params: CategoryFindManyProps<T>,
): Promise<CategoryFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All category services
        "category",
        // All findMany services
        "findMany",
        // All category findMany services
        "category-findMany",
        // This specific services
        `category-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.category.findMany(params);
};

export const CategoryFindFirstCached = async <T extends Prisma.CategoryFindFirstArgs>(
    params: CategoryFindFirstProps<T>,
): Promise<CategoryFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All category services
        "category",
        // All findFirst services
        "findFirst",
        // All category findFirst services
        "category-findFirst",
        // This specific services
        `category-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.category.findFirst(params);
};

export const CategoryFindUniqueCached = async <T extends Prisma.CategoryFindUniqueArgs>(
    params: CategoryFindUniqueProps<T>,
): Promise<CategoryFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All category services
        "category",
        // All findUnique services
        "findUnique",
        // All category findUnique services
        "category-findUnique",
        // This specific services
        `category-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.category.findUnique(params);
};

export const CategoryCountCached = async <T extends Prisma.CategoryCountArgs>(
    params: CategoryCountProps<T>,
): Promise<CategoryCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All category services
        "category",
        // All count services
        "count",
        // All category count services
        "category-count",
        // This specific services
        `category-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.category.count(params);
};
