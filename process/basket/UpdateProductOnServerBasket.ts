"use server";

import { OrderUpdateAction } from "@actions/OrderAction";
import { LocalBasketItem } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodSchema } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type UpdateProductOnServerBasketProps = {
    productId: LocalBasketItem["productId"];
    quantity: LocalBasketItem["quantity"];
    orderId: OrderModel["id"];
};

const updateProductOnServerBasketSchema: ZodSchema<UpdateProductOnServerBasketProps> = z.object({
    productId: z.string(),
    quantity: z.number(),
    orderId: z.string(),
});

type UpdateProductOnServerBasketResponse = OrderModel["id"] | null;

export const UpdateProductOnServerBasket = async (
    props: UpdateProductOnServerBasketProps,
): Promise<UpdateProductOnServerBasketResponse> => {
    try {
        const { productId, quantity, orderId } = updateProductOnServerBasketSchema.parse(props);

        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        const { items } = serverBasket;

        const quantityId = items.find(({ productId: id }) => id === productId)?.quantityId;
        if (!quantityId) return null;

        // Update quantity
        await OrderUpdateAction({
            where: { id: orderId },
            data: {
                Quantity: {
                    update: {
                        where: { id: quantityId },
                        data: { quantity },
                    },
                },
            },
        });

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "UpdateProductOnServerBasket";
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
