"use server";

import { OrderFindManyAction } from "@actions/OrderAction";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderModel } from "@services/types";
import { ZodError } from "zod";

export type FindPendingServerBasketResponse = OrderModel["id"] | null;

export const FindPendingServerBasket = async (): Promise<FindPendingServerBasketResponse> => {
    try {
        const session = await GetSession();
        if (!session) return null;

        const isAuthorized = await hasPermission(session, {
            Order: ["findMany-HO"],
        });
        if (!isAuthorized) return null;

        const orderList = await OrderFindManyAction(
            {
                where: {
                    userId: session.user.id,
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
            true, // Disable safe message
        );

        if (!orderList.length) return null;

        return orderList[0].id;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            const processName = "FindPendingServerBasket";
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
