import { Prisma, Quantity } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Quantity Types ==== //
// ======================= //

/** Represents a complete quantity entity */
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

/** Find many options for quantities */
export type SelectQuantityListProps = Pick<
    Prisma.QuantityFindManyArgs,
    "orderBy" | "take" | "skip" | "where"
>;

/** Count options for quantities */
export type SelectQuantityAmountProps = Pick<Prisma.QuantityCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating quantity UUID */
export const quantityIdSchema: ZodString = z.string().nanoid();

/** Schema for validating quantity ID object structure */
export const quantityIdObjectSchema: ZodType<QuantityId> = z.object({
    id: z.string().nanoid(),
});

/** Schema for validating common quantity properties */
export const quantityCommonSchema: ZodType<QuantityCommon> = z.object({
    quantity: z.number().int().min(0),
    productId: z.string().nanoid(),
    orderId: z.string().nanoid(),
});

/** Schema for validating timestamp fields */
export const quantityTimestampsSchema: ZodType<QuantityTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

/** Schema for validating quantity update operations */
export const quantityUpdateSchema: ZodType<QuantityUpdate> = z.object({
    id: quantityIdSchema,
    data: quantityCommonSchema,
});

export const selectQuantityListSchema: ZodType<SelectQuantityListProps> = z.object({
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

export const selectQuantityAmountSchema: ZodType<SelectQuantityAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
