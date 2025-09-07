import { Prisma } from "@prisma/client";
import { GetResult, InternalArgs, PrismaClientOptions } from "@prisma/client/runtime/library";
import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { DiyCountCached, DiyFindFirstCached, DiyFindManyCached, DiyFindUniqueCached } from "@services/cached";

// ========== Types ========== //

export type DiyFindManyProps<T extends Prisma.DiyFindManyArgs> = Prisma.SelectSubset<T, Prisma.DiyFindManyArgs>;
export type DiyFindManyResponse<T extends Prisma.DiyFindManyArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findMany",
    PrismaClientOptions
>;

export type DiyFindFirstProps<T extends Prisma.DiyFindFirstArgs> = Prisma.SelectSubset<T, Prisma.DiyFindFirstArgs>;
export type DiyFindFirstResponse<T extends Prisma.DiyFindFirstArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findFirst",
    PrismaClientOptions
>;

export type DiyFindUniqueProps<T extends Prisma.DiyFindUniqueArgs> = Prisma.SelectSubset<T, Prisma.DiyFindUniqueArgs>;
export type DiyFindUniqueResponse<T extends Prisma.DiyFindUniqueArgs> = GetResult<
    Prisma.$DiyPayload<InternalArgs>,
    T,
    "findUnique",
    PrismaClientOptions
>;

export type DiyCountProps<T extends Prisma.DiyCountArgs> = Prisma.SelectSubset<T, Prisma.DiyCountArgs>;
export type DiyCountResponse<T extends Prisma.DiyCountArgs> =
    // eslint-disable-next-line
    T extends { select: any }
        ? T["select"] extends true
            ? number
            : Prisma.GetScalarType<T["select"], Prisma.DiyCountAggregateOutputType>
        : number;

// ========== Services ========== //

export const DiyFindManyServer = <T extends Prisma.DiyFindManyArgs>(
    params: DiyFindManyProps<T>,
): Promise<DiyFindManyResponse<T>> => {
    try {
        return DiyFindManyCached(params);
    } catch (error) {
        throw ServiceError("Diy", "findMany", error);
    }
};

export const DiyFindFirstServer = <T extends Prisma.DiyFindFirstArgs>(
    params: DiyFindFirstProps<T>,
): Promise<DiyFindFirstResponse<T>> => {
    try {
        return DiyFindFirstCached(params);
    } catch (error) {
        throw ServiceError("Diy", "findFirst", error);
    }
};

export const DiyFindUniqueServer = <T extends Prisma.DiyFindUniqueArgs>(
    params: DiyFindUniqueProps<T>,
): Promise<DiyFindUniqueResponse<T>> => {
    try {
        return DiyFindUniqueCached(params);
    } catch (error) {
        throw ServiceError("Diy", "findUnique", error);
    }
};

export const DiyCountServer = <T extends Prisma.DiyCountArgs>(
    params: DiyCountProps<T>,
): Promise<DiyCountResponse<T>> => {
    try {
        return DiyCountCached(params);
    } catch (error) {
        throw ServiceError("Diy", "count", error);
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
