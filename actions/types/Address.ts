import { Address, Prisma } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Address Types ==== //
// ======================= //

/** Represents a complete address entity */
export type AddressType = Address;

/** Represents the address's unique identifier */
export type AddressId = Pick<Address, "id">;

/** Represents common address properties without system-managed fields */
export type AddressCommon = Omit<Address, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating an address */
export type AddressUpdate = {
    id: Address["id"];
    data: AddressCommon;
};

/** Represents system-managed timestamp fields */
export type AddressTimestamps = Pick<Address, "createdAt" | "updatedAt">;

/** Find many options for addresses */
export type SelectAddressListProps = Pick<Prisma.AddressFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for addresses */
export type SelectAddressAmountProps = Pick<Prisma.AddressCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating address UUID */
export const addressIdSchema: ZodString = z.string().nanoid();

/** Schema for validating address ID object structure */
export const addressIdObjectSchema: ZodType<AddressId> = z.object({
    id: z.string().nanoid(),
});

/** Schema for validating common address properties */
export const addressCommonSchema: ZodType<AddressCommon> = z.object({
    address: z.string(),
    postal: z.string(),
    city: z.string(),
    country: z.string(),
    isPrimary: z.boolean(),
    userId: z.string().nanoid(),
});

/** Schema for validating timestamp fields */
export const addressTimestampsSchema: ZodType<AddressTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

/** Schema for validating address update operations */
export const addressUpdateSchema: ZodType<AddressUpdate> = z.object({
    id: addressIdSchema,
    data: addressCommonSchema,
});

export const selectAddressListSchema: ZodType<SelectAddressListProps> = z.object({
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

export const selectAddressAmountSchema: ZodType<SelectAddressAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
