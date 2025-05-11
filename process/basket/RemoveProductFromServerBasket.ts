"use server";

import { DeleteOrder } from "@actions/OrderAction";
import { DeleteQuantity } from "@actions/QuantityAction";
import { LocalBasketItem } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodSchema } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type RemoveProductFromServerBasketProps = {
    productId: LocalBasketItem["productId"];
    orderId: OrderModel["id"];
};

const removeProductFromServerBasketSchema: ZodSchema<RemoveProductFromServerBasketProps> = z.object({
    productId: z.string(),
    orderId: z.string(),
});

type RemoveProductFromServerBasketResponse = OrderModel["id"] | null;

export const RemoveProductFromServerBasket = async (
    props: RemoveProductFromServerBasketProps,
): Promise<RemoveProductFromServerBasketResponse> => {
    try {
        const { productId, orderId } = removeProductFromServerBasketSchema.parse(props);

        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        const { items } = serverBasket;

        const quantityId = items.find(({ productId: id }) => id === productId)?.quantityId;
        if (!quantityId) return null;

        // Delete quantity
        if (items.length > 1) {
            await DeleteQuantity({
                where: {
                    id: quantityId,
                },
            });
        }
        // Last product, delete basket
        else if (items.length === 1) {
            await DeleteOrder({
                where: {
                    id: orderId,
                },
            });
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "RemoveProductFromServerBasket";
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
