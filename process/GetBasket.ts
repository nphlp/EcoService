"use server";

import { CreateOrder } from "@actions/OrderAction";
import { Basket } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { ZodError } from "zod";

export type BasketResponse = Basket | null;

export const GetBasket = async (): Promise<BasketResponse> => {
    try {
        const session = await GetSession();

        if (!session) {
            return null;
        }

        const userId = session.user.id;

        const pendingOrderList = await FetchV2({
            route: "/order",
            params: {
                where: {
                    userId,
                    orderStatus: "PENDING",
                    paymentStatus: "PENDING",
                },
                include: {
                    Quantity: {
                        include: {
                            Product: true,
                        },
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
            },
        });

        console.log("Order ->", pendingOrderList);

        if (pendingOrderList.length > 0) {
            const order = pendingOrderList[0];
            const basket: Basket = {
                userId,
                orderId: order.id,
                items: order.Quantity.map(({ id, quantity, Product }) => ({
                    /// Product
                    productId: Product.id,
                    name: Product.name,
                    description: Product.description,
                    price: Product.price,
                    image: Product.image,
                    /// Quantity
                    quantity,
                    quatityId: id,
                })),
            };

            return basket;
        }

        const newOrder = await CreateOrder({
            data: {
                userId,
            },
        });

        const newBasket: Basket = {
            userId,
            orderId: newOrder.id,
            items: [],
        };

        return newBasket;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "GetBasket";
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
