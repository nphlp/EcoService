import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type VerificationFindManyProps<T extends Prisma.VerificationFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindManyArgs
>;
export type VerificationFindManyResponse<T extends Prisma.VerificationFindManyArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type VerificationFindFirstProps<T extends Prisma.VerificationFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindFirstArgs
>;
export type VerificationFindFirstResponse<T extends Prisma.VerificationFindFirstArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type VerificationFindUniqueProps<T extends Prisma.VerificationFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindUniqueArgs
>;
export type VerificationFindUniqueResponse<T extends Prisma.VerificationFindUniqueArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type VerificationCountProps<T extends Prisma.VerificationCountArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationCountArgs
>;
export type VerificationCountResponse<T extends Prisma.VerificationCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.VerificationCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const VerificationFindManyCached = async <T extends Prisma.VerificationFindManyArgs>(
    params: VerificationFindManyProps<T>,
): Promise<VerificationFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All verification services
        "verification",
        // All findMany services
        "findMany",
        // All verification findMany services
        "verification-findMany",
        // This specific services
        `verification-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.verification.findMany(params);
};

export const VerificationFindFirstCached = async <T extends Prisma.VerificationFindFirstArgs>(
    params: VerificationFindFirstProps<T>,
): Promise<VerificationFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All verification services
        "verification",
        // All findFirst services
        "findFirst",
        // All verification findFirst services
        "verification-findFirst",
        // This specific services
        `verification-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.verification.findFirst(params);
};

export const VerificationFindUniqueCached = async <T extends Prisma.VerificationFindUniqueArgs>(
    params: VerificationFindUniqueProps<T>,
): Promise<VerificationFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All verification services
        "verification",
        // All findUnique services
        "findUnique",
        // All verification findUnique services
        "verification-findUnique",
        // This specific services
        `verification-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.verification.findUnique(params);
};

export const VerificationCountCached = async <T extends Prisma.VerificationCountArgs>(
    params: VerificationCountProps<T>,
): Promise<VerificationCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All verification services
        "verification",
        // All count services
        "count",
        // All verification count services
        "verification-count",
        // This specific services
        `verification-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.verification.count(params);
};
