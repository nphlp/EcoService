"use server";

import { BasketItem } from "@comps/basket/basketType";
import { revalidatePath } from "next/cache";
import { GetBasket } from "./GetBasket";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateQuantity } from "@actions/QuantityAction";
import { DeleteOrder } from "@actions/OrderAction";

type UpdateProductQuantityProps = {
    productId: BasketItem["productId"];
    quantity: BasketItem["quantity"];
};

export const UpdateProductQuantity = async (props: UpdateProductQuantityProps) => {
    try {
        const { productId, quantity } = props;

        const serverBasket = await GetBasket();

        if (serverBasket) {
            const quantityId = serverBasket.items.find(({ productId: id }) => id === productId)?.quatityId;

            // Update quantity
            if (quantity > 0 && quantityId) {
                await UpdateQuantity({
                    where: { id: quantityId },
                    data: { quantity },
                });
            }

            // It was the last product ? Clear basket
            if (quantity === 0 && serverBasket.items.length === 1) {
                await DeleteOrder({ where: { id: serverBasket.orderId } });
            }
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "UpdateProductQuantity";
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
