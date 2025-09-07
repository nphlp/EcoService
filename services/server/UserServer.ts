import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { UserCountCached, UserFindFirstCached, UserFindManyCached, UserFindUniqueCached } from "@services/cached";

// ========== Types ========== //

export type UserFindManyProps<T extends Prisma.UserFindManyArgs> = Prisma.SelectSubset<T, Prisma.UserFindManyArgs>;
export type UserFindManyResponse<T extends Prisma.UserFindManyArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type UserFindFirstProps<T extends Prisma.UserFindFirstArgs> = Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>;
export type UserFindFirstResponse<T extends Prisma.UserFindFirstArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type UserFindUniqueProps<T extends Prisma.UserFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.UserFindUniqueArgs
>;
export type UserFindUniqueResponse<T extends Prisma.UserFindUniqueArgs> = GetResult<
    Prisma.$UserPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type UserCountProps<T extends Prisma.UserCountArgs> = Prisma.SelectSubset<T, Prisma.UserCountArgs>;
export type UserCountResponse<T extends Prisma.UserCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.UserCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const UserFindManyServer = <T extends Prisma.UserFindManyArgs>(
    params: UserFindManyProps<T>,
): Promise<UserFindManyResponse<T>> => {
    try {
        return UserFindManyCached(params);
    } catch (error) {
        throw ServiceError("User", "findMany", error);
    }
};

export const UserFindFirstServer = <T extends Prisma.UserFindFirstArgs>(
    params: UserFindFirstProps<T>,
): Promise<UserFindFirstResponse<T>> => {
    try {
        return UserFindFirstCached(params);
    } catch (error) {
        throw ServiceError("User", "findFirst", error);
    }
};

export const UserFindUniqueServer = <T extends Prisma.UserFindUniqueArgs>(
    params: UserFindUniqueProps<T>,
): Promise<UserFindUniqueResponse<T>> => {
    try {
        return UserFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("User", "findUnique", error);
    }
};

export const UserCountServer = <T extends Prisma.UserCountArgs>(
    params: UserCountProps<T>,
): Promise<UserCountResponse<T>> => {
    try {
        return UserCountCached(params);
    } catch (error) {
        throw ServiceError("User", "count", error);
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
