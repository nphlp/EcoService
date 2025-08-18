"use server";

import { OrderFindUniqueAction } from "@actions/OrderAction";
import { ServerBasket } from "@comps/basket/basketType";
import { GetSession } from "@lib/authServer";
import { hasPermission } from "@permissions/hasPermissions";
import { Order } from "@prisma/client";
import { ProcessDevError } from "@process/Error";
import { ZodType, z } from "zod";

export type GetServerBasketProps = {
    orderId: string;
};

const getServerBasketSchema: ZodType<GetServerBasketProps> = z.object({
    orderId: z.string(),
});

type ServerBasketWithPaymentStatus = ServerBasket & {
    paymentStatus: Order["paymentStatus"];
    orderStatus: Order["orderStatus"];
};

export type GetServerBasketResponse = ServerBasketWithPaymentStatus | null;

/**
 * Get server basket with orderId
 * - Get order, quantities and products with orderId
 * - Return server basket with payment status
 */
export const GetServerBasket = async (props: GetServerBasketProps): Promise<GetServerBasketResponse> => {
    try {
        const { orderId } = getServerBasketSchema.parse(props);

        // Get session for security
        const session = await GetSession();

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["findUnique-HO"],
        });
        if (!isAuthorized) return null;

        // Get order
        const order = await OrderFindUniqueAction(
            {
                where: {
                    id: orderId,
                    // TODO: add this security ?
                    // userId: session?.user.id
                },
                include: {
                    Quantity: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
            true, // Disable safe message
        );

        if (!order) {
            return null;
        }

        const basket: GetServerBasketResponse = {
            orderId: order.id,
            paymentStatus: order.paymentStatus,
            orderStatus: order.orderStatus,
            items: order.Quantity.map(({ id: quantityId, quantity, Product }) => ({
                /// Product
                productId: Product.id,
                name: Product.name,
                description: Product.description,
                price: Product.price,
                image: Product.image,
                /// Quantity
                quantity,
                quantityId,
            })),
        };

        return basket;
    } catch (error) {
        const processName = "GetServerBasket";
        ProcessDevError(processName, error);

        // TODO: add logging
        return null;
    }
};
