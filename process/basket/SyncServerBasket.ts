"use server";

import { Basket } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { GetBasket } from "./GetBasket";
import { CreateManyQuantity, DeleteManyQuantity } from "@actions/QuantityAction";

type SyncServerBasketProps = {
    localBasket: Basket;
};

export const SyncServerBasket = async (props: SyncServerBasketProps) => {
    try {
        const { localBasket } = props;

        const serverBasket = await GetBasket();

        if (serverBasket) {
            await DeleteManyQuantity({
                where: {
                    id: {
                        in: serverBasket.items.map(({ quatityId }) => quatityId),
                    },
                },
            });

            await CreateManyQuantity({
                data: localBasket.items.map(({ productId, quantity }) => ({
                    quantity,
                    productId,
                    orderId: serverBasket.orderId,
                })),
                skipDuplicates: true,
            });
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "SyncServerBasket";
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
