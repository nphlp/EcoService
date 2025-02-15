import { Address } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Address Types ==== //
// ======================= //

/** Represents a complete address entity */
export type AddressType = Address;

/** Represents the address's unique identifier */
export type AddressId = Pick<Address, "id">;

/** Represents common address properties */
export type AddressCommon = Omit<Address, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating an address */
export type AddressUpdate = {
  id: Address["id"];
  data: AddressCommon;
};

/** Represents system-managed timestamp fields */
export type AddressTimestamps = Pick<Address, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const addressIdSchema: ZodString = z.string();

export const addressIdObjectSchema: ZodType<AddressId> = z.object({
  id: z.string(),
});

export const addressCommonSchema: ZodType<AddressCommon> = z.object({
  address: z.string(),
  postal: z.string(),
  city: z.string(),
  country: z.string(),
  isPrimary: z.boolean(),
  userId: z.string(),
});

export const addressTimestampsSchema: ZodType<AddressTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const addressUpdateSchema: ZodType<AddressUpdate> = z.object({
  id: addressIdSchema,
  data: addressCommonSchema,
});
