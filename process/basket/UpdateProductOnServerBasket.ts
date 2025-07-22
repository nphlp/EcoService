"use server";

import { OrderUpdateAction } from "@actions/OrderAction";
import { LocalBasketItem } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type UpdateProductOnServerBasketProps = {
    productId: LocalBasketItem["productId"];
    quantity: LocalBasketItem["quantity"];
    orderId: OrderModel["id"];
};

const updateProductOnServerBasketSchema: ZodType<UpdateProductOnServerBasketProps> = z.object({
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

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["update-HO"],
        });
        if (!isAuthorized) return null;

        // Get server basket
        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        const { items } = serverBasket;

        const quantityId = items.find(({ productId: id }) => id === productId)?.quantityId;
        if (!quantityId) return null;

        // Update quantity
        await OrderUpdateAction(
            {
                where: {
                    id: orderId,
                    // TODO: add this security ?
                    // userId: session?.user.id
                },
                data: {
                    Quantity: {
                        update: {
                            where: { id: quantityId },
                            data: { quantity },
                        },
                    },
                },
            },
            true, // Disable safe message
        );

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        const processName = "UpdateProductOnServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
