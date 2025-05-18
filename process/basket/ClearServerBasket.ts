"use server";

import { DeleteOrder } from "@actions/OrderAction";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodSchema } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type ClearServerBasketProps = {
    orderId: OrderModel["id"];
};

const clearServerBasketSchema: ZodSchema<ClearServerBasketProps> = z.object({
    orderId: z.string(),
});

type ClearServerBasketResponse = OrderModel["id"] | null;

export const ClearServerBasket = async (props: ClearServerBasketProps): Promise<ClearServerBasketResponse> => {
    try {
        const { orderId } = clearServerBasketSchema.parse(props);

        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        // Delete order and linked quantities
        await DeleteOrder({ where: { id: serverBasket.orderId } });

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "ClearServerBasket";
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
