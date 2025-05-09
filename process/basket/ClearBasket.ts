"use server";

import { DeleteOrder } from "@actions/OrderAction";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { GetBasket } from "./GetBasket";

export const ClearBasket = async () => {
    try {
        const serverBasket = await GetBasket();

        if (serverBasket) {
            // Delete order and linked quantities
            await DeleteOrder({ where: { id: serverBasket.orderId } });
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "ClearBasket";
            const message = (error as Error).message;
            if (error instanceof ZodError) {
                const zodMessage = processName + " -> Invalid Zod params -> " + error.message;
                console.error(zodMessage);
                throw new Error(zodMessage);
            } else if (error instanceof PrismaClientKnownRequestError) {
                const prismaMessage = processName + " -> Prisma error -> " + error.message;
                console.error(prismaMessage);
                throw new Error(prismaMessage);
            } else {
                const errorMessage = processName + " -> " + message;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        // TODO: add logging
        return null;
    }
};
