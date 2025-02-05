"use server";

import { Order, $Enums } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ===================== //
// ==== Order Types ==== //
// ===================== //

/** Represents a complete order entity */
export type OrderType = Order;

/** Represents the order's unique identifier */
export type OrderId = Pick<Order, "id">;

/** Represents common order properties */
export type OrderCommon = Omit<Order, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating an order */
export type OrderUpdate = {
  id: Order["id"];
  data: OrderCommon;
};

/** Represents system-managed timestamp fields */
export type OrderTimestamps = Pick<Order, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const orderIdSchema: ZodString = z.string();

export const orderIdObjectSchema: ZodType<OrderId> = z.object({
  id: z.string(),
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
