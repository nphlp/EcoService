"use server";

import { QuantityCreateManyAction, QuantityDeleteManyAction } from "@actions/QuantityAction";
import { LocalBasket, localBasketSchema } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderModel } from "@services/types";
import { revalidatePath } from "next/cache";
import { z, ZodType } from "zod";
import { GetServerBasket } from "./GetServerBasket";

type SyncServerBasketProps = {
    localBasket: LocalBasket;
    orderId: OrderModel["id"];
};

const syncServerBasketSchema: ZodType<SyncServerBasketProps> = z.object({
    localBasket: localBasketSchema,
    orderId: z.string(),
});

type SyncServerBasketResponse = OrderModel["id"] | null;

/**
 * Sync server basket with local basket
 * - Get server basket with orderId
 * - Delete all quantities with ids in server basket
 * - Create new quantities with ids in local basket
 * - Refresh checkout page
 */
export const SyncServerBasket = async (props: SyncServerBasketProps): Promise<SyncServerBasketResponse> => {
    try {
        const { localBasket, orderId } = syncServerBasketSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Quantity: ["deleteMany-HO", "createMany-HO"],
        });
        if (!isAuthorized) return null;

        // Get server basket
        const serverBasket = await GetServerBasket({ orderId });

        if (serverBasket) {
            // Delete all quantities with ids in server basket
            await QuantityDeleteManyAction(
                {
                    where: {
                        id: {
                            in: serverBasket.items.map(({ quantityId }) => quantityId),
                        },
                        // TODO: add this security ?
                        // Order: { userId: session?.user.id },
                    },
                },
                true, // Disable safe message
            );

            // Create new quantities with ids in local basket
            await QuantityCreateManyAction(
                {
                    data: localBasket.items.map(({ productId, quantity }) => ({
                        quantity,
                        productId,
                        orderId: serverBasket.orderId,
                    })),
                    skipDuplicates: true,
                },
                true, // Disable safe message
            );
        }

        // Refresh checkout page
        revalidatePath("/checkout", "page");
        return orderId;
    } catch (error) {
        const processName = "SyncServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
