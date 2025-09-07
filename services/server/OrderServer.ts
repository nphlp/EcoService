import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type OrderFindManyProps<T extends Prisma.OrderFindManyArgs> = Prisma.SelectSubset<T, Prisma.OrderFindManyArgs>;
export type OrderFindManyResponse<T extends Prisma.OrderFindManyArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type OrderFindFirstProps<T extends Prisma.OrderFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindFirstArgs
>;
export type OrderFindFirstResponse<T extends Prisma.OrderFindFirstArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type OrderFindUniqueProps<T extends Prisma.OrderFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.OrderFindUniqueArgs
>;
export type OrderFindUniqueResponse<T extends Prisma.OrderFindUniqueArgs> = GetResult<
    Prisma.$OrderPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type OrderCountProps<T extends Prisma.OrderCountArgs> = Prisma.SelectSubset<T, Prisma.OrderCountArgs>;
export type OrderCountResponse<T extends Prisma.OrderCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.OrderCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const OrderFindManyServer = <T extends Prisma.OrderFindManyArgs>(
    params: OrderFindManyProps<T>,
): Promise<OrderFindManyResponse<T>> => {
    try {
        return PrismaInstance.order.findMany(params);
    } catch (error) {
        throw ServiceError("Order", "findMany", error);
    }
};

export const OrderFindFirstServer = <T extends Prisma.OrderFindFirstArgs>(
    params: OrderFindFirstProps<T>,
): Promise<OrderFindFirstResponse<T>> => {
    try {
        return PrismaInstance.order.findFirst(params);
    } catch (error) {
        throw ServiceError("Order", "findFirst", error);
    }
};

export const OrderFindUniqueServer = <T extends Prisma.OrderFindUniqueArgs>(
    params: OrderFindUniqueProps<T>,
): Promise<OrderFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.order.findUnique(params);
    } catch (error) {
        throw ServiceError("Order", "findUnique", error);
    }
};

export const OrderCountServer = <T extends Prisma.OrderCountArgs>(
    params: OrderCountProps<T>,
): Promise<OrderCountResponse<T>> => {
    try {
        return PrismaInstance.order.count(params);
    } catch (error) {
        throw ServiceError("Order", "count", error);
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
