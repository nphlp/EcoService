import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type ProductFindManyProps<T extends Prisma.ProductFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindManyArgs
>;
export type ProductFindManyResponse<T extends Prisma.ProductFindManyArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ProductFindFirstProps<T extends Prisma.ProductFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindFirstArgs
>;
export type ProductFindFirstResponse<T extends Prisma.ProductFindFirstArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ProductFindUniqueProps<T extends Prisma.ProductFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindUniqueArgs
>;
export type ProductFindUniqueResponse<T extends Prisma.ProductFindUniqueArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ProductCountProps<T extends Prisma.ProductCountArgs> = Prisma.SelectSubset<T, Prisma.ProductCountArgs>;
export type ProductCountResponse<T extends Prisma.ProductCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ProductCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const ProductFindManyCached = async <T extends Prisma.ProductFindManyArgs>(
    params: ProductFindManyProps<T>,
): Promise<ProductFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All product services
        "product",
        // All findMany services
        "findMany",
        // All product findMany services
        "product-findMany",
        // This specific services
        `product-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.product.findMany(params);
};

export const ProductFindFirstCached = async <T extends Prisma.ProductFindFirstArgs>(
    params: ProductFindFirstProps<T>,
): Promise<ProductFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All product services
        "product",
        // All findFirst services
        "findFirst",
        // All product findFirst services
        "product-findFirst",
        // This specific services
        `product-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.product.findFirst(params);
};

export const ProductFindUniqueCached = async <T extends Prisma.ProductFindUniqueArgs>(
    params: ProductFindUniqueProps<T>,
): Promise<ProductFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All product services
        "product",
        // All findUnique services
        "findUnique",
        // All product findUnique services
        "product-findUnique",
        // This specific services
        `product-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.product.findUnique(params);
};

export const ProductCountCached = async <T extends Prisma.ProductCountArgs>(
    params: ProductCountProps<T>,
): Promise<ProductCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All product services
        "product",
        // All count services
        "count",
        // All product count services
        "product-count",
        // This specific services
        `product-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.product.count(params);
};
