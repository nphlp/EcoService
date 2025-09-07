import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type QuantityFindManyProps<T extends Prisma.QuantityFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindManyArgs
>;
export type QuantityFindManyResponse<T extends Prisma.QuantityFindManyArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type QuantityFindFirstProps<T extends Prisma.QuantityFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindFirstArgs
>;
export type QuantityFindFirstResponse<T extends Prisma.QuantityFindFirstArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type QuantityFindUniqueProps<T extends Prisma.QuantityFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.QuantityFindUniqueArgs
>;
export type QuantityFindUniqueResponse<T extends Prisma.QuantityFindUniqueArgs> = GetResult<
    Prisma.$QuantityPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type QuantityCountProps<T extends Prisma.QuantityCountArgs> = Prisma.SelectSubset<T, Prisma.QuantityCountArgs>;
export type QuantityCountResponse<T extends Prisma.QuantityCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.QuantityCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const QuantityFindManyServer = <T extends Prisma.QuantityFindManyArgs>(
    params: QuantityFindManyProps<T>,
): Promise<QuantityFindManyResponse<T>> => {
    try {
        return PrismaInstance.quantity.findMany(params);
    } catch (error) {
        throw ServiceError("Quantity", "findMany", error);
    }
};

export const QuantityFindFirstServer = <T extends Prisma.QuantityFindFirstArgs>(
    params: QuantityFindFirstProps<T>,
): Promise<QuantityFindFirstResponse<T>> => {
    try {
        return PrismaInstance.quantity.findFirst(params);
    } catch (error) {
        throw ServiceError("Quantity", "findFirst", error);
    }
};

export const QuantityFindUniqueServer = <T extends Prisma.QuantityFindUniqueArgs>(
    params: QuantityFindUniqueProps<T>,
): Promise<QuantityFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.quantity.findUnique(params);
    } catch (error) {
        throw ServiceError("Quantity", "findUnique", error);
    }
};

export const QuantityCountServer = <T extends Prisma.QuantityCountArgs>(
    params: QuantityCountProps<T>,
): Promise<QuantityCountResponse<T>> => {
    try {
        return PrismaInstance.quantity.count(params);
    } catch (error) {
        throw ServiceError("Quantity", "count", error);
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
