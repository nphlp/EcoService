import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import "server-only";
import { ZodError } from "zod";

type ErrorLoggingProps = {
    processName: string;
    error: unknown;
};

export const ErrorLogging = (props: ErrorLoggingProps) => {
    const { processName, error } = props;

    if (process.env.NODE_ENV === "development") {
        const message = (error as Error).message;

        // Zod error
        if (error instanceof ZodError) {
            const zodMessage = processName + " -> Invalid Zod params -> " + error.message;
            console.error(zodMessage);
            throw new Error(zodMessage);
        }

        // Prisma error
        if (error instanceof PrismaClientKnownRequestError) {
            const prismaMessage = processName + " -> Prisma error -> " + error.message;
            console.error(prismaMessage);
            throw new Error(prismaMessage);
        }

        // Default error
        const errorMessage = processName + " -> " + message;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    // TODO: add logging
    return null;
};
