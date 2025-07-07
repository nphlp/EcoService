"use server";

import { OrderFindUniqueAction } from "@actions/OrderAction";
import { ServerBasket } from "@comps/basket/basketType";
import { Order } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z, ZodError, ZodType } from "zod";

export type GetServerBasketProps = {
    orderId: string;
};

const getServerBasketSchema: ZodType<GetServerBasketProps> = z.object({
    orderId: z.string(),
});

type ServerBasketWithPaymentStatus = ServerBasket & {
    paymentStatus: Order["paymentStatus"];
    orderStatus: Order["orderStatus"];
};

export type GetServerBasketResponse = ServerBasketWithPaymentStatus | null;

/**
 * Get server basket with orderId
 * - Get order, quantities and products with orderId
 * - Return server basket with payment status
 */
export const GetServerBasket = async (props: GetServerBasketProps): Promise<GetServerBasketResponse> => {
    try {
        const { orderId } = getServerBasketSchema.parse(props);

        const order = await OrderFindUniqueAction({
            where: {
                id: orderId,
            },
            include: {
                Quantity: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        if (!order) {
            return null;
        }

        const basket: GetServerBasketResponse = {
            orderId: order.id,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            items: order.Quantity.map(({ id: quantityId, quantity, Product }) => ({
                /// Product
                productId: Product.id,
                name: Product.name,
                description: Product.description,
                price: Product.price,
                image: Product.image,
                /// Quantity
                quantity,
                quantityId,
            })),
        };

        return basket;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "GetServerBasket";
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
