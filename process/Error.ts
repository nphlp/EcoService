import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { ZodError } from "zod";

export const ProcessDevError = (processName: string, error: unknown) => {
    // In development mode, throw an error
    if (process.env.NODE_ENV === "development") {
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

        // Other error
        const errorMessage = processName + " -> " + (error as Error).message;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    // TODO: In production mode, log the error
};
