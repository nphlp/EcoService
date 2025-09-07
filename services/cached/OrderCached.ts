import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type OrderFindManyProps<T extends Prisma.OrderFindManyArgs> = Prisma.SelectSubset<T, Prisma.OrderFindManyArgs>;
export type OrderFindManyResponse<T extends Prisma.OrderFindManyArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type OrderFindFirstProps<T extends Prisma.OrderFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindFirstArgs
>;
export type OrderFindFirstResponse<T extends Prisma.OrderFindFirstArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type OrderFindUniqueProps<T extends Prisma.OrderFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindUniqueArgs
>;
export type OrderFindUniqueResponse<T extends Prisma.OrderFindUniqueArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type OrderCountProps<T extends Prisma.OrderCountArgs> = Prisma.SelectSubset<T, Prisma.OrderCountArgs>;
export type OrderCountResponse<T extends Prisma.OrderCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.OrderCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const OrderFindManyCached = async <T extends Prisma.OrderFindManyArgs>(
    params: OrderFindManyProps<T>,
): Promise<OrderFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All order services
        "order",
        // All findMany services
        "findMany",
        // All order findMany services
        "order-findMany",
        // This specific services
        `order-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.order.findMany(params);
};

export const OrderFindFirstCached = async <T extends Prisma.OrderFindFirstArgs>(
    params: OrderFindFirstProps<T>,
): Promise<OrderFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All order services
        "order",
        // All findFirst services
        "findFirst",
        // All order findFirst services
        "order-findFirst",
        // This specific services
        `order-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.order.findFirst(params);
};

export const OrderFindUniqueCached = async <T extends Prisma.OrderFindUniqueArgs>(
    params: OrderFindUniqueProps<T>,
): Promise<OrderFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All order services
        "order",
        // All findUnique services
        "findUnique",
        // All order findUnique services
        "order-findUnique",
        // This specific services
        `order-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.order.findUnique(params);
};

export const OrderCountCached = async <T extends Prisma.OrderCountArgs>(
    params: OrderCountProps<T>,
): Promise<OrderCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All order services
        "order",
        // All count services
        "count",
        // All order count services
        "order-count",
        // This specific services
        `order-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.order.count(params);
};
