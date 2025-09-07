import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import {
    ArticleCountCached,
    ArticleFindFirstCached,
    ArticleFindManyCached,
    ArticleFindUniqueCached,
} from "@services/cached";

// ========== Types ========== //

export type ArticleFindManyProps<T extends Prisma.ArticleFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindManyArgs
>;
export type ArticleFindManyResponse<T extends Prisma.ArticleFindManyArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ArticleFindFirstProps<T extends Prisma.ArticleFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindFirstArgs
>;
export type ArticleFindFirstResponse<T extends Prisma.ArticleFindFirstArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ArticleFindUniqueProps<T extends Prisma.ArticleFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ArticleFindUniqueArgs
>;
export type ArticleFindUniqueResponse<T extends Prisma.ArticleFindUniqueArgs> = GetResult<
    Prisma.$ArticlePayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ArticleCountProps<T extends Prisma.ArticleCountArgs> = Prisma.SelectSubset<T, Prisma.ArticleCountArgs>;
export type ArticleCountResponse<T extends Prisma.ArticleCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ArticleCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const ArticleFindManyServer = <T extends Prisma.ArticleFindManyArgs>(
    params: ArticleFindManyProps<T>,
): Promise<ArticleFindManyResponse<T>> => {
    try {
        return ArticleFindManyCached(params);
    } catch (error) {
        throw ServiceError("Article", "findMany", error);
    }
};

export const ArticleFindFirstServer = <T extends Prisma.ArticleFindFirstArgs>(
    params: ArticleFindFirstProps<T>,
): Promise<ArticleFindFirstResponse<T>> => {
    try {
        return ArticleFindFirstCached(params);
    } catch (error) {
        throw ServiceError("Article", "findFirst", error);
    }
};

export const ArticleFindUniqueServer = <T extends Prisma.ArticleFindUniqueArgs>(
    params: ArticleFindUniqueProps<T>,
): Promise<ArticleFindUniqueResponse<T>> => {
    try {
        return ArticleFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("Article", "findUnique", error);
    }
};

export const ArticleCountServer = <T extends Prisma.ArticleCountArgs>(
    params: ArticleCountProps<T>,
): Promise<ArticleCountResponse<T>> => {
    try {
        return ArticleCountCached(params);
    } catch (error) {
        throw ServiceError("Article", "count", error);
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
