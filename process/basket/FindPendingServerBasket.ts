"use server";

import { getSession } from "@lib/auth-server";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderFindManyAction } from "@services/actions/OrderAction";
import { OrderModel } from "@services/types";

export type FindPendingServerBasketResponse = OrderModel["id"] | null;

export const FindPendingServerBasket = async (): Promise<FindPendingServerBasketResponse> => {
    try {
        // Get session
        const session = await getSession();
        if (!session) return null;

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["findMany-HO"],
        });
        if (!isAuthorized) return null;

        // Get order list
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
        const processName = "FindPendingServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
