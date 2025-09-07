import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import {
    ContentCountCached,
    ContentFindFirstCached,
    ContentFindManyCached,
    ContentFindUniqueCached,
} from "@services/cached";

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

export const ContentFindManyServer = <T extends Prisma.ContentFindManyArgs>(
    params: ContentFindManyProps<T>,
): Promise<ContentFindManyResponse<T>> => {
    try {
        return ContentFindManyCached(params);
    } catch (error) {
        throw ServiceError("Content", "findMany", error);
    }
};

export const ContentFindFirstServer = <T extends Prisma.ContentFindFirstArgs>(
    params: ContentFindFirstProps<T>,
): Promise<ContentFindFirstResponse<T>> => {
    try {
        return ContentFindFirstCached(params);
    } catch (error) {
        throw ServiceError("Content", "findFirst", error);
    }
};

export const ContentFindUniqueServer = <T extends Prisma.ContentFindUniqueArgs>(
    params: ContentFindUniqueProps<T>,
): Promise<ContentFindUniqueResponse<T>> => {
    try {
        return ContentFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("Content", "findUnique", error);
    }
};

export const ContentCountServer = <T extends Prisma.ContentCountArgs>(
    params: ContentCountProps<T>,
): Promise<ContentCountResponse<T>> => {
    try {
        return ContentCountCached(params);
    } catch (error) {
        throw ServiceError("Content", "count", error);
    }
};

// ========== Error Handling ========== //

const ServiceError = (serviceName: string, methodName: string, error: unknown) => {
    if (process.env.NODE_ENV === "development") {
        const message = (error as Error).message;

        const isPrismaError =
            error instanceof PrismaClientKnownRequestError ||
            error instanceof PrismaClientUnknownRequestError ||
            error instanceof PrismaClientValidationError;

        if (isPrismaError) {
            const prismaMessage = serviceName + " -> " + methodName + " -> Prisma error -> " + message;
            console.error(prismaMessage);
            throw new Error(prismaMessage);
        } else {
            const errorMessage = serviceName + " -> " + methodName + " -> " + message;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    // TODO: add logging
    throw new Error("Something went wrong...");
};
