import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type VerificationFindManyProps<T extends Prisma.VerificationFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindManyArgs
>;
export type VerificationFindManyResponse<T extends Prisma.VerificationFindManyArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type VerificationFindFirstProps<T extends Prisma.VerificationFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindFirstArgs
>;
export type VerificationFindFirstResponse<T extends Prisma.VerificationFindFirstArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type VerificationFindUniqueProps<T extends Prisma.VerificationFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationFindUniqueArgs
>;
export type VerificationFindUniqueResponse<T extends Prisma.VerificationFindUniqueArgs> = GetResult<
    Prisma.$VerificationPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type VerificationCountProps<T extends Prisma.VerificationCountArgs> = Prisma.SelectSubset<
    T,
    Prisma.VerificationCountArgs
>;
export type VerificationCountResponse<T extends Prisma.VerificationCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.VerificationCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const VerificationFindManyServer = <T extends Prisma.VerificationFindManyArgs>(
    params: VerificationFindManyProps<T>,
): Promise<VerificationFindManyResponse<T>> => {
    try {
        return PrismaInstance.verification.findMany(params);
    } catch (error) {
        throw ServiceError("Verification", "findMany", error);
    }
};

export const VerificationFindFirstServer = <T extends Prisma.VerificationFindFirstArgs>(
    params: VerificationFindFirstProps<T>,
): Promise<VerificationFindFirstResponse<T>> => {
    try {
        return PrismaInstance.verification.findFirst(params);
    } catch (error) {
        throw ServiceError("Verification", "findFirst", error);
    }
};

export const VerificationFindUniqueServer = <T extends Prisma.VerificationFindUniqueArgs>(
    params: VerificationFindUniqueProps<T>,
): Promise<VerificationFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.verification.findUnique(params);
    } catch (error) {
        throw ServiceError("Verification", "findUnique", error);
    }
};

export const VerificationCountServer = <T extends Prisma.VerificationCountArgs>(
    params: VerificationCountProps<T>,
): Promise<VerificationCountResponse<T>> => {
    try {
        return PrismaInstance.verification.count(params);
    } catch (error) {
        throw ServiceError("Verification", "count", error);
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
