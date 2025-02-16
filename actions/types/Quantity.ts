import { Quantity } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================== //
// ==== Quantity Types ==== //
// ======================== //

/** Represents a complete Quantity entity */
export type QuantityType = Quantity;

/** Represents the quantity's unique identifier */
export type QuantityId = Pick<Quantity, "id">;

/** Represents common quantity properties without system-managed fields */
export type QuantityCommon = Omit<Quantity, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a quantity */
export type QuantityUpdate = {
  id: Quantity["id"];
  data: QuantityCommon;
};

/** Represents system-managed timestamp fields */
export type QuantityTimestamps = Pick<Quantity, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const quantityIdSchema: ZodString = z.string();

export const quantityIdObjectSchema: ZodType<QuantityId> = z.object({
  id: z.string(),
});

export const quantityCommonSchema: ZodType<QuantityCommon> = z.object({
  quantity: z.number(),
  productId: z.string(),
  orderId: z.string(),
});

export const quantityTimestampsSchema: ZodType<QuantityTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const quantityUpdateSchema: ZodType<QuantityUpdate> = z.object({
  id: quantityIdSchema,
  data: quantityCommonSchema,
});
