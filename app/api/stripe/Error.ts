import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export const StripeError = (endpoint: string, error: unknown): string => {
    if (process.env.NODE_ENV === "development") {
        const message = (error as Error).message;
        if (error instanceof ZodError) {
            const zodMessage = "StripeError -> " + endpoint + " -> Invalid Zod params -> " + error.message;
            console.error(zodMessage);
            throw new Error(zodMessage);
        } else if (error instanceof PrismaClientKnownRequestError) {
            const prismaMessage = "StripeError -> " + endpoint + " -> Prisma error -> " + error.message;
            console.error(prismaMessage);
            throw new Error(prismaMessage);
        } else {
            const errorMessage = "StripeError -> " + endpoint + " -> " + message;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
    // TODO: add logging
    return "Something went wrong...";
};
