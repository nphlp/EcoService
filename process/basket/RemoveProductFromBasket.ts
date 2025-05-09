"use server";

import { DeleteOrder } from "@actions/OrderAction";
import { DeleteQuantity } from "@actions/QuantityAction";
import { BasketItem } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { GetBasket } from "./GetBasket";

type RemoveProductFromBasketProps = {
    productId: BasketItem["productId"];
};

export const RemoveProductFromBasket = async (props: RemoveProductFromBasketProps) => {
    try {
        const { productId } = props;

        const serverBasket = await GetBasket();

        if (serverBasket) {
            const quantityId = serverBasket.items.find(({ productId: id }) => id === productId)?.quatityId;

            // Delete quantity
            if (quantityId) {
                await DeleteQuantity({
                    where: {
                        id: quantityId,
                    },
                });
            }

            // It was the last product ? Clear basket
            if (serverBasket.items.length === 1) {
                await DeleteOrder({
                    where: {
                        id: serverBasket.orderId,
                    },
                });
            }
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "RemoveProductFromBasket";
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
