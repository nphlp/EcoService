"use server";

import { getSession } from "@lib/auth-server";
import { hasPermission } from "@permissions/hasPermissions";
import { ProcessDevError } from "@process/Error";
import { OrderFindUniqueAction, OrderUpdateAction } from "@services/actions/OrderAction";
import { OrderModel } from "@services/types";
import { ZodType, z } from "zod";

type ValidatePaymentProcessProps = {
    orderId: OrderModel["id"];
};

const validatePaymentProcessSchema: ZodType<ValidatePaymentProcessProps> = z.object({
    orderId: z.string(),
});

export type OrderItem = {
    productId: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    quantity: number;
};

export type ValidatePaymentProcessResponse = {
    success: boolean;
    order: {
        id: string;
        createdAt: Date;
        items: OrderItem[];
        total: number;
    } | null;
};

/**
 * Validate payment and update order status
 * - Verify session and permissions
 * - Verify user owns the order
 * - Update order status to ACCEPTED
 */
export const ValidatePaymentProcess = async (
    props: ValidatePaymentProcessProps,
): Promise<ValidatePaymentProcessResponse> => {
    try {
        const { orderId } = validatePaymentProcessSchema.parse(props);

        // Get session for security
        const session = await getSession();
        if (!session) return { success: false, order: null };

        // Check permissions
        const isAuthorized = await hasPermission(session, {
            Order: ["findUnique-HO", "update-HO"],
        });
        if (!isAuthorized) return { success: false, order: null };

        // Get order with user ownership check
        const order = await OrderFindUniqueAction(
            {
                where: {
                    id: orderId,
                    userId: session.user.id,
                },
                include: {
                    Quantity: {
                        include: {
                            Product: true,
                        },
                    },
                },
            },
            true,
        );

        if (!order) return { success: false, order: null };

        // Update order status
        await OrderUpdateAction(
            {
                where: {
                    id: orderId,
                    userId: session.user.id,
                },
                data: {
                    orderStatus: "ACCEPTED",
                    paymentStatus: "ACCEPTED",
                },
            },
            true,
        );

        // Format order items
        const items: OrderItem[] = order.Quantity.map(({ quantity, Product }) => ({
            productId: Product.id,
            name: Product.name,
            description: Product.description,
            price: Product.price,
            image: Product.image,
            quantity,
        }));

        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        return {
            success: true,
            order: {
                id: order.id,
                createdAt: order.createdAt,
                items,
                total,
            },
        };
    } catch (error) {
        const processName = "ValidatePaymentProcess";
        ProcessDevError(processName, error);

        return { success: false, order: null };
    }
};
