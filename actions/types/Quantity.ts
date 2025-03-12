import { QuantityModel, RelatedQuantityModel } from "@actions/zod-generated";
import { Quantity, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Quantity's model with relations */
export type QuantityType = z.infer<typeof RelatedQuantityModel>;

/** Represents the Quantity's unique identifier */
export type QuantityId = Pick<Quantity, "id">;

/** Represents common Quantity properties without system-managed fields */
export type QuantityCommon = Omit<Quantity, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Quantity */
export type QuantityUpdate = {
    id: Quantity["id"];
    data: QuantityCommon;
};

/** Represents system-managed timestamp fields */
export type QuantityTimestamps = Pick<Quantity, "createdAt" | "updatedAt">;

/** Find one options for Quantitys */
export type SelectQuantityProps = Pick<Prisma.QuantityFindUniqueArgs, "where" | "select">;

/** Find many options for Quantitys */
export type SelectQuantityListProps = Pick<Prisma.QuantityFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Quantitys */
export type SelectQuantityAmountProps = Pick<Prisma.QuantityCountArgs, "where">;
