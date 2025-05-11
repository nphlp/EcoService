"use server";

import { CreateOrder } from "@actions/OrderAction";
import { LocalBasketItem, localBasketItemSchema } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodError, ZodType } from "zod";

export type CreateServerBasketProps = {
    items: LocalBasketItem[];
};

const createServerBasketSchema: ZodType<CreateServerBasketProps> = z.object({
    items: z.array(localBasketItemSchema),
});

export type CreateServerBasketResponse = OrderModel["id"] | null;

export const CreateServerBasket = async (props: CreateServerBasketProps): Promise<CreateServerBasketResponse> => {
    try {
        const { items } = createServerBasketSchema.parse(props);

        const session = await GetSession();
        if (!session) return null;

        const order = await CreateOrder({
            data: {
                userId: session.user.id,
                Quantity: {
                    createMany: {
                        data: items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                        })),
                        skipDuplicates: true,
                    },
                },
            },
        });

        // Refresh checkout page
        revalidatePath("/checkout", "page");

        return order.id;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "CreateServerBasket";
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
