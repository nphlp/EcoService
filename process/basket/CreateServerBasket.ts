"use server";

import { OrderCreateAction } from "@actions/OrderAction";
import { LocalBasketItem, localBasketItemSchema } from "@comps/CORE/basket/basketType";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { ZodType, z } from "zod";

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

        // Get session for security
        const session = await GetSession();
        if (!session) return null;

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["create-HO"],
        });
        if (!isAuthorized) return null;

        // Create order
        const order = await OrderCreateAction(
            {
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
            },
            true, // Disable safe message
        );

        // Refresh checkout page
        revalidatePath("/checkout", "page");

        return order.id;
    } catch (error) {
        const processName = "CreateServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
