import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import { cacheLifeApi } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

// ========== Types ========== //

export type SessionFindManyProps<T extends Prisma.SessionFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindManyArgs
>;
export type SessionFindManyResponse<T extends Prisma.SessionFindManyArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type SessionFindFirstProps<T extends Prisma.SessionFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindFirstArgs
>;
export type SessionFindFirstResponse<T extends Prisma.SessionFindFirstArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type SessionFindUniqueProps<T extends Prisma.SessionFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindUniqueArgs
>;
export type SessionFindUniqueResponse<T extends Prisma.SessionFindUniqueArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type SessionCountProps<T extends Prisma.SessionCountArgs> = Prisma.SelectSubset<T, Prisma.SessionCountArgs>;
export type SessionCountResponse<T extends Prisma.SessionCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.SessionCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const SessionFindManyCached = async <T extends Prisma.SessionFindManyArgs>(
    params: SessionFindManyProps<T>,
): Promise<SessionFindManyResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All session services
        "session",
        // All findMany services
        "findMany",
        // All session findMany services
        "session-findMany",
        // This specific services
        `session-findMany-${JSON.stringify(params)}`,
    );

    return PrismaInstance.session.findMany(params);
};

export const SessionFindFirstCached = async <T extends Prisma.SessionFindFirstArgs>(
    params: SessionFindFirstProps<T>,
): Promise<SessionFindFirstResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All session services
        "session",
        // All findFirst services
        "findFirst",
        // All session findFirst services
        "session-findFirst",
        // This specific services
        `session-findFirst-${JSON.stringify(params)}`,
    );

    return PrismaInstance.session.findFirst(params);
};

export const SessionFindUniqueCached = async <T extends Prisma.SessionFindUniqueArgs>(
    params: SessionFindUniqueProps<T>,
): Promise<SessionFindUniqueResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All session services
        "session",
        // All findUnique services
        "findUnique",
        // All session findUnique services
        "session-findUnique",
        // This specific services
        `session-findUnique-${JSON.stringify(params)}`,
    );

    return PrismaInstance.session.findUnique(params);
};

export const SessionCountCached = async <T extends Prisma.SessionCountArgs>(
    params: SessionCountProps<T>,
): Promise<SessionCountResponse<T>> => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag(
        // All services
        "services",
        // All session services
        "session",
        // All count services
        "count",
        // All session count services
        "session-count",
        // This specific services
        `session-count-${JSON.stringify(params)}`,
    );

    return PrismaInstance.session.count(params);
};
