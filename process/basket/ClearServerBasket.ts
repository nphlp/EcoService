"use server";

import { OrderDeleteAction } from "@actions/OrderAction";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type ClearServerBasketProps = {
    orderId: OrderModel["id"];
};

const clearServerBasketSchema: ZodType<ClearServerBasketProps> = z.object({
    orderId: z.string(),
});

type ClearServerBasketResponse = OrderModel["id"] | null;

export const ClearServerBasket = async (props: ClearServerBasketProps): Promise<ClearServerBasketResponse> => {
    try {
        const { orderId } = clearServerBasketSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["delete-HO"],
        });
        if (!isAuthorized) return null;

        // Get server basket
        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        // Delete order and linked quantities
        await OrderDeleteAction(
            {
                where: {
                    id: serverBasket.orderId,
                    // TODO: add this security ?
                    // userId: session?.user.id
                },
            },
            true, // Disable safe message
        );

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        const processName = "ClearServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
