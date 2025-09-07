import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type FruitFindManyProps<T extends Prisma.FruitFindManyArgs> = Prisma.SelectSubset<T, Prisma.FruitFindManyArgs>;
export type FruitFindManyResponse<T extends Prisma.FruitFindManyArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type FruitFindFirstProps<T extends Prisma.FruitFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindFirstArgs
>;
export type FruitFindFirstResponse<T extends Prisma.FruitFindFirstArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type FruitFindUniqueProps<T extends Prisma.FruitFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.FruitFindUniqueArgs
>;
export type FruitFindUniqueResponse<T extends Prisma.FruitFindUniqueArgs> = GetResult<
    Prisma.$FruitPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type FruitCountProps<T extends Prisma.FruitCountArgs> = Prisma.SelectSubset<T, Prisma.FruitCountArgs>;
export type FruitCountResponse<T extends Prisma.FruitCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.FruitCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const FruitFindManyServer = <T extends Prisma.FruitFindManyArgs>(
    params: FruitFindManyProps<T>,
): Promise<FruitFindManyResponse<T>> => {
    try {
        return PrismaInstance.fruit.findMany(params);
    } catch (error) {
        throw ServiceError("Fruit", "findMany", error);
    }
};

export const FruitFindFirstServer = <T extends Prisma.FruitFindFirstArgs>(
    params: FruitFindFirstProps<T>,
): Promise<FruitFindFirstResponse<T>> => {
    try {
        return PrismaInstance.fruit.findFirst(params);
    } catch (error) {
        throw ServiceError("Fruit", "findFirst", error);
    }
};

export const FruitFindUniqueServer = <T extends Prisma.FruitFindUniqueArgs>(
    params: FruitFindUniqueProps<T>,
): Promise<FruitFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.fruit.findUnique(params);
    } catch (error) {
        throw ServiceError("Fruit", "findUnique", error);
    }
};

export const FruitCountServer = <T extends Prisma.FruitCountArgs>(
    params: FruitCountProps<T>,
): Promise<FruitCountResponse<T>> => {
    try {
        return PrismaInstance.fruit.count(params);
    } catch (error) {
        throw ServiceError("Fruit", "count", error);
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
