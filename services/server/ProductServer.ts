import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type ProductFindManyProps<T extends Prisma.ProductFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindManyArgs
>;
export type ProductFindManyResponse<T extends Prisma.ProductFindManyArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type ProductFindFirstProps<T extends Prisma.ProductFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindFirstArgs
>;
export type ProductFindFirstResponse<T extends Prisma.ProductFindFirstArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type ProductFindUniqueProps<T extends Prisma.ProductFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.ProductFindUniqueArgs
>;
export type ProductFindUniqueResponse<T extends Prisma.ProductFindUniqueArgs> = GetResult<
    Prisma.$ProductPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type ProductCountProps<T extends Prisma.ProductCountArgs> = Prisma.SelectSubset<T, Prisma.ProductCountArgs>;
export type ProductCountResponse<T extends Prisma.ProductCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.ProductCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const ProductFindManyServer = <T extends Prisma.ProductFindManyArgs>(
    params: ProductFindManyProps<T>,
): Promise<ProductFindManyResponse<T>> => {
    try {
        return PrismaInstance.product.findMany(params);
    } catch (error) {
        throw ServiceError("Product", "findMany", error);
    }
};

export const ProductFindFirstServer = <T extends Prisma.ProductFindFirstArgs>(
    params: ProductFindFirstProps<T>,
): Promise<ProductFindFirstResponse<T>> => {
    try {
        return PrismaInstance.product.findFirst(params);
    } catch (error) {
        throw ServiceError("Product", "findFirst", error);
    }
};

export const ProductFindUniqueServer = <T extends Prisma.ProductFindUniqueArgs>(
    params: ProductFindUniqueProps<T>,
): Promise<ProductFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.product.findUnique(params);
    } catch (error) {
        throw ServiceError("Product", "findUnique", error);
    }
};

export const ProductCountServer = <T extends Prisma.ProductCountArgs>(
    params: ProductCountProps<T>,
): Promise<ProductCountResponse<T>> => {
    try {
        return PrismaInstance.product.count(params);
    } catch (error) {
        throw ServiceError("Product", "count", error);
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
