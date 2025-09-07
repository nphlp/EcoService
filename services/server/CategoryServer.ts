import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type CategoryFindManyProps<T extends Prisma.CategoryFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindManyArgs
>;
export type CategoryFindManyResponse<T extends Prisma.CategoryFindManyArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type CategoryFindFirstProps<T extends Prisma.CategoryFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindFirstArgs
>;
export type CategoryFindFirstResponse<T extends Prisma.CategoryFindFirstArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type CategoryFindUniqueProps<T extends Prisma.CategoryFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.CategoryFindUniqueArgs
>;
export type CategoryFindUniqueResponse<T extends Prisma.CategoryFindUniqueArgs> = GetResult<
    Prisma.$CategoryPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type CategoryCountProps<T extends Prisma.CategoryCountArgs> = Prisma.SelectSubset<T, Prisma.CategoryCountArgs>;
export type CategoryCountResponse<T extends Prisma.CategoryCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.CategoryCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const CategoryFindManyServer = <T extends Prisma.CategoryFindManyArgs>(
    params: CategoryFindManyProps<T>,
): Promise<CategoryFindManyResponse<T>> => {
    try {
        return PrismaInstance.category.findMany(params);
    } catch (error) {
        throw ServiceError("Category", "findMany", error);
    }
};

export const CategoryFindFirstServer = <T extends Prisma.CategoryFindFirstArgs>(
    params: CategoryFindFirstProps<T>,
): Promise<CategoryFindFirstResponse<T>> => {
    try {
        return PrismaInstance.category.findFirst(params);
    } catch (error) {
        throw ServiceError("Category", "findFirst", error);
    }
};

export const CategoryFindUniqueServer = <T extends Prisma.CategoryFindUniqueArgs>(
    params: CategoryFindUniqueProps<T>,
): Promise<CategoryFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.category.findUnique(params);
    } catch (error) {
        throw ServiceError("Category", "findUnique", error);
    }
};

export const CategoryCountServer = <T extends Prisma.CategoryCountArgs>(
    params: CategoryCountProps<T>,
): Promise<CategoryCountResponse<T>> => {
    try {
        return PrismaInstance.category.count(params);
    } catch (error) {
        throw ServiceError("Category", "count", error);
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
