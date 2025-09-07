import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import {
    AddressCountCached,
    AddressFindFirstCached,
    AddressFindManyCached,
    AddressFindUniqueCached,
} from "@services/cached";

// ========== Types ========== //

export type AddressFindManyProps<T extends Prisma.AddressFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindManyArgs
>;
export type AddressFindManyResponse<T extends Prisma.AddressFindManyArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type AddressFindFirstProps<T extends Prisma.AddressFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindFirstArgs
>;
export type AddressFindFirstResponse<T extends Prisma.AddressFindFirstArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type AddressFindUniqueProps<T extends Prisma.AddressFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.AddressFindUniqueArgs
>;
export type AddressFindUniqueResponse<T extends Prisma.AddressFindUniqueArgs> = GetResult<
    Prisma.$AddressPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type AddressCountProps<T extends Prisma.AddressCountArgs> = Prisma.SelectSubset<T, Prisma.AddressCountArgs>;
export type AddressCountResponse<T extends Prisma.AddressCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.AddressCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const AddressFindManyServer = <T extends Prisma.AddressFindManyArgs>(
    params: AddressFindManyProps<T>,
): Promise<AddressFindManyResponse<T>> => {
    try {
        return AddressFindManyCached(params);
    } catch (error) {
        throw ServiceError("Address", "findMany", error);
    }
};

export const AddressFindFirstServer = <T extends Prisma.AddressFindFirstArgs>(
    params: AddressFindFirstProps<T>,
): Promise<AddressFindFirstResponse<T>> => {
    try {
        return AddressFindFirstCached(params);
    } catch (error) {
        throw ServiceError("Address", "findFirst", error);
    }
};

export const AddressFindUniqueServer = <T extends Prisma.AddressFindUniqueArgs>(
    params: AddressFindUniqueProps<T>,
): Promise<AddressFindUniqueResponse<T>> => {
    try {
        return AddressFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("Address", "findUnique", error);
    }
};

export const AddressCountServer = <T extends Prisma.AddressCountArgs>(
    params: AddressCountProps<T>,
): Promise<AddressCountResponse<T>> => {
    try {
        return AddressCountCached(params);
    } catch (error) {
        throw ServiceError("Address", "count", error);
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
