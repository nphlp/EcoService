"use server";

import { UpdateOrder } from "@actions/OrderAction";
import { LocalBasketItem, localBasketItemSchema } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type AddProductToServerBasketProps = {
    orderId: OrderModel["id"];
    item: LocalBasketItem;
};

const addProductToServerBasketSchema: ZodType<AddProductToServerBasketProps> = z.object({
    orderId: z.string(),
    item: localBasketItemSchema,
});

type AddProductToServerBasketResponse = OrderModel["id"] | null;

export const AddProductToServerBasket = async (
    props: AddProductToServerBasketProps,
): Promise<AddProductToServerBasketResponse> => {
    try {
        const { orderId, item } = addProductToServerBasketSchema.parse(props);

        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        // Create quantity
        await UpdateOrder({
            where: { id: orderId },
            data: {
                Quantity: {
                    create: {
                        quantity: item.quantity,
                        productId: item.productId,
                    },
                },
            },
        });

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "AddProductToServerBasket";
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
