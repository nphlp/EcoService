import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import {
    AccountCountCached,
    AccountFindFirstCached,
    AccountFindManyCached,
    AccountFindUniqueCached,
} from "@services/cached";

// ========== Types ========== //

export type AccountFindManyProps<T extends Prisma.AccountFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindManyArgs
>;
export type AccountFindManyResponse<T extends Prisma.AccountFindManyArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AccountFindFirstProps<T extends Prisma.AccountFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindFirstArgs
>;
export type AccountFindFirstResponse<T extends Prisma.AccountFindFirstArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AccountFindUniqueProps<T extends Prisma.AccountFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AccountFindUniqueArgs
>;
export type AccountFindUniqueResponse<T extends Prisma.AccountFindUniqueArgs> = GetResult<
    Prisma.$AccountPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AccountCountProps<T extends Prisma.AccountCountArgs> = Prisma.SelectSubset<T, Prisma.AccountCountArgs>;
export type AccountCountResponse<T extends Prisma.AccountCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AccountCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const AccountFindManyServer = <T extends Prisma.AccountFindManyArgs>(
    params: AccountFindManyProps<T>,
): Promise<AccountFindManyResponse<T>> => {
    try {
        return AccountFindManyCached(params);
    } catch (error) {
        throw ServiceError("Account", "findMany", error);
    }
};

export const AccountFindFirstServer = <T extends Prisma.AccountFindFirstArgs>(
    params: AccountFindFirstProps<T>,
): Promise<AccountFindFirstResponse<T>> => {
    try {
        return AccountFindFirstCached(params);
    } catch (error) {
        throw ServiceError("Account", "findFirst", error);
    }
};

export const AccountFindUniqueServer = <T extends Prisma.AccountFindUniqueArgs>(
    params: AccountFindUniqueProps<T>,
): Promise<AccountFindUniqueResponse<T>> => {
    try {
        return AccountFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("Account", "findUnique", error);
    }
};

export const AccountCountServer = <T extends Prisma.AccountCountArgs>(
    params: AccountCountProps<T>,
): Promise<AccountCountResponse<T>> => {
    try {
        return AccountCountCached(params);
    } catch (error) {
        throw ServiceError("Account", "count", error);
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
