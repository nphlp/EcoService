import { AddressModel, RelatedAddressModel } from "@actions/zod-generated";
import { Address, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Address's model with relations */
export type AddressType = z.infer<typeof RelatedAddressModel>;

/** Represents the Address's unique identifier */
export type AddressId = Pick<Address, "id">;

/** Represents common Address properties without system-managed fields */
export type AddressCommon = Omit<Address, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Address */
export type AddressUpdate = {
    id: Address["id"];
    data: AddressCommon;
};

/** Represents system-managed timestamp fields */
export type AddressTimestamps = Pick<Address, "createdAt" | "updatedAt">;

/** Find one options for Addresss */
export type SelectAddressProps = Pick<Prisma.AddressFindUniqueArgs, "where" | "select">;

/** Find many options for Addresss */
export type SelectAddressListProps = Pick<Prisma.AddressFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Addresss */
export type SelectAddressAmountProps = Pick<Prisma.AddressCountArgs, "where">;
