import { $Enums, Order, Prisma } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ===================== //
// ==== Order Types ==== //
// ===================== //

/** Represents a complete order entity */
export type OrderType = Order;

/** Represents the order's unique identifier */
export type OrderId = Pick<Order, "id">;

/** Represents common order properties without system-managed fields */
export type OrderCommon = Omit<Order, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating an order */
export type OrderUpdate = {
    id: Order["id"];
    data: OrderCommon;
};

/** Represents system-managed timestamp fields */
export type OrderTimestamps = Pick<Order, "createdAt" | "updatedAt">;

/** Find many options for orders */
export type SelectOrderListProps = Pick<Prisma.OrderFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for orders */
export type SelectOrderAmountProps = Pick<Prisma.OrderCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const orderIdSchema: ZodString = z.string().nanoid();

export const orderIdObjectSchema: ZodType<OrderId> = z.object({
    id: z.string().nanoid(),
});

export const orderCommonSchema: ZodType<OrderCommon> = z.object({
    orderStatus: z.nativeEnum($Enums.OrderStatus),
    paymentStatus: z.nativeEnum($Enums.PaymentStatus),
    userId: z.string(),
});

export const orderTimestampsSchema: ZodType<OrderTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const orderUpdateSchema: ZodType<OrderUpdate> = z.object({
    id: orderIdSchema,
    data: orderCommonSchema,
});

export const selectOrderListSchema: ZodType<SelectOrderListProps> = z.object({
    orderBy: z
        .object({
            // Types to validate
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});

export const selectOrderAmountSchema: ZodType<SelectOrderAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
