"use server";

import { LocalBasketItem, localBasketItemSchema } from "@comps/CORE/basket/basketType";
import { getSession } from "@lib/auth-server";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderUpdateAction } from "@services/actions/OrderAction";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { ZodType, z } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type AddProductToServerBasketProps = {
    orderId: OrderModel["id"];
    item: LocalBasketItem;
};

const addProductToServerBasketSchema: ZodType<AddProductToServerBasketProps> = z.object({
    orderId: z.string(),
    item: localBasketItemSchema,
});

type AddProductToServerBasketResponse = OrderModel["id"] | null;

export const AddProductToServerBasket = async (
    props: AddProductToServerBasketProps,
): Promise<AddProductToServerBasketResponse> => {
    try {
        const { orderId, item } = addProductToServerBasketSchema.parse(props);

        // Get session for security
        const session = await getSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["update-HO"],
        });
        if (!isAuthorized) return null;

        // Get server basket
        const serverBasket = await GetServerBasket({ orderId });
        if (!serverBasket) return null;

        // Create quantity
        await OrderUpdateAction(
            {
                where: {
                    id: orderId,
                    // TODO: add this security ?
                    // userId: session?.user.id
                },
                data: {
                    Quantity: {
                        create: {
                            quantity: item.quantity,
                            productId: item.productId,
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
        const processName = "AddProductToServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
