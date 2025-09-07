import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

// ========== Types ========== //

export type SessionFindManyProps<T extends Prisma.SessionFindManyArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindManyArgs
>;
export type SessionFindManyResponse<T extends Prisma.SessionFindManyArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type SessionFindFirstProps<T extends Prisma.SessionFindFirstArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindFirstArgs
>;
export type SessionFindFirstResponse<T extends Prisma.SessionFindFirstArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type SessionFindUniqueProps<T extends Prisma.SessionFindUniqueArgs> = Prisma.SelectSubset<
    T,
    Prisma.SessionFindUniqueArgs
>;
export type SessionFindUniqueResponse<T extends Prisma.SessionFindUniqueArgs> = GetResult<
    Prisma.$SessionPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type SessionCountProps<T extends Prisma.SessionCountArgs> = Prisma.SelectSubset<T, Prisma.SessionCountArgs>;
export type SessionCountResponse<T extends Prisma.SessionCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.SessionCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const SessionFindManyServer = <T extends Prisma.SessionFindManyArgs>(
    params: SessionFindManyProps<T>,
): Promise<SessionFindManyResponse<T>> => {
    try {
        return PrismaInstance.session.findMany(params);
    } catch (error) {
        throw ServiceError("Session", "findMany", error);
    }
};

export const SessionFindFirstServer = <T extends Prisma.SessionFindFirstArgs>(
    params: SessionFindFirstProps<T>,
): Promise<SessionFindFirstResponse<T>> => {
    try {
        return PrismaInstance.session.findFirst(params);
    } catch (error) {
        throw ServiceError("Session", "findFirst", error);
    }
};

export const SessionFindUniqueServer = <T extends Prisma.SessionFindUniqueArgs>(
    params: SessionFindUniqueProps<T>,
): Promise<SessionFindUniqueResponse<T>> => {
    try {
        return PrismaInstance.session.findUnique(params);
    } catch (error) {
        throw ServiceError("Session", "findUnique", error);
    }
};

export const SessionCountServer = <T extends Prisma.SessionCountArgs>(
    params: SessionCountProps<T>,
): Promise<SessionCountResponse<T>> => {
    try {
        return PrismaInstance.session.count(params);
    } catch (error) {
        throw ServiceError("Session", "count", error);
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
