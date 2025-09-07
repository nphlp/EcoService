import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type AddressFindManyProps<T extends Prisma.AddressFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindManyArgs
>;
export type AddressFindManyResponse<T extends Prisma.AddressFindManyArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AddressFindFirstProps<T extends Prisma.AddressFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindFirstArgs
>;
export type AddressFindFirstResponse<T extends Prisma.AddressFindFirstArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AddressFindUniqueProps<T extends Prisma.AddressFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindUniqueArgs
>;
export type AddressFindUniqueResponse<T extends Prisma.AddressFindUniqueArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AddressCountProps<T extends Prisma.AddressCountArgs> = Prisma.SelectSubset<T, Prisma.AddressCountArgs>;
export type AddressCountResponse<T extends Prisma.AddressCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AddressCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const AddressFindManyCached = async <T extends Prisma.AddressFindManyArgs>(
    params: AddressFindManyProps<T>,
): Promise<AddressFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All address services
        "address",
        // All findMany services
        "findMany",
        // All address findMany services
        "address-findMany",
        // This specific services
        `address-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.address.findMany(params);
};

export const AddressFindFirstCached = async <T extends Prisma.AddressFindFirstArgs>(
    params: AddressFindFirstProps<T>,
): Promise<AddressFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All address services
        "address",
        // All findFirst services
        "findFirst",
        // All address findFirst services
        "address-findFirst",
        // This specific services
        `address-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.address.findFirst(params);
};

export const AddressFindUniqueCached = async <T extends Prisma.AddressFindUniqueArgs>(
    params: AddressFindUniqueProps<T>,
): Promise<AddressFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All address services
        "address",
        // All findUnique services
        "findUnique",
        // All address findUnique services
        "address-findUnique",
        // This specific services
        `address-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.address.findUnique(params);
};

export const AddressCountCached = async <T extends Prisma.AddressCountArgs>(
    params: AddressCountProps<T>,
): Promise<AddressCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All address services
        "address",
        // All count services
        "count",
        // All address count services
        "address-count",
        // This specific services
        `address-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.address.count(params);
};
