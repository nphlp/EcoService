"use server";

import { CreateManyQuantity, DeleteManyQuantity } from "@actions/QuantityAction";
import { LocalBasket, localBasketSchema } from "@comps/basket/basketType";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type SyncServerBasketProps = {
    localBasket: LocalBasket;
    orderId: OrderModel["id"];
};

const syncServerBasketSchema: ZodType<SyncServerBasketProps> = z.object({
    localBasket: localBasketSchema,
    orderId: z.string(),
});

/**
 * Sync server basket with local basket
 * - Get server basket with orderId
 * - Delete all quantities with ids in server basket
 * - Create new quantities with ids in local basket
 * - Refresh checkout page
 */
export const SyncServerBasket = async (props: SyncServerBasketProps) => {
    try {
        const { localBasket, orderId } = syncServerBasketSchema.parse(props);

        const serverBasket = await GetServerBasket({ orderId });

        if (serverBasket) {
            await DeleteManyQuantity({
                where: {
                    id: {
                        in: serverBasket.items.map(({ quantityId }) => quantityId),
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
