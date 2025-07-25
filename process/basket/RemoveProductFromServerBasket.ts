"use server";

import { OrderDeleteAction } from "@actions/OrderAction";
import { QuantityDeleteAction } from "@actions/QuantityAction";
import { LocalBasketItem } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type RemoveProductFromServerBasketProps = {
    productId: LocalBasketItem["productId"];
    orderId: OrderModel["id"];
};

const removeProductFromServerBasketSchema: ZodType<RemoveProductFromServerBasketProps> = z.object({
    productId: z.string(),
    orderId: z.string(),
});

type RemoveProductFromServerBasketResponse = OrderModel["id"] | null;

export const RemoveProductFromServerBasket = async (
    props: RemoveProductFromServerBasketProps,
): Promise<RemoveProductFromServerBasketResponse> => {
    try {
        const { productId, orderId } = removeProductFromServerBasketSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Quantity: ["delete-HO"],
            Order: ["delete-HO"],
        });
        if (!isAuthorized) return null;

        // Get server basket
        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        const { items } = serverBasket;

        const quantityId = items.find(({ productId: id }) => id === productId)?.quantityId;
        if (!quantityId) return null;

        // Delete quantity
        if (items.length > 1) {
            await QuantityDeleteAction(
                {
                    where: {
                        id: quantityId,
                        // TODO: add this security ?
                        // Order: { userId: session?.user.id },
                    },
                },
                true, // Disable safe message
            );
        }
        // Last product, delete basket
        else if (items.length === 1) {
            await OrderDeleteAction(
                {
                    where: {
                        id: orderId,
                        // TODO: add this security ?
                        // userId: session?.user.id
                    },
                },
                true, // Disable safe message
            );
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        const processName = "RemoveProductFromServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
