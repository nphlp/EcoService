"use server";

import { SelectOrderList } from "@actions/OrderAction";
import { GetSession } from "@lib/authServer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { ZodError } from "zod";

export type FindBasketResponse = OrderModel["id"] | null;

export const FindBasket = async (): Promise<FindBasketResponse> => {
    try {
        const session = await GetSession();

        if (!session) {
            return null;
        }

        const userId = session.user.id;

        const pendingOrderList = await SelectOrderList({
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
        });

        if (pendingOrderList.length > 0) {
            const order = pendingOrderList[0];
            return order.id;
        }

        return null;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "FindBasket";
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
