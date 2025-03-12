import { FruitModel } from "@actions/zod-generated";
import { Fruit, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Fruit's model  */
export type FruitType = z.infer<typeof FruitModel>;

/** Represents the Fruit's unique identifier */
export type FruitId = Pick<Fruit, "id">;

/** Represents common Fruit properties without system-managed fields */
export type FruitCommon = Omit<Fruit, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Fruit */
export type FruitUpdate = {
    id: Fruit["id"];
    data: FruitCommon;
};

/** Represents system-managed timestamp fields */
export type FruitTimestamps = Pick<Fruit, "createdAt" | "updatedAt">;

/** Find one options for Fruits */
export type SelectFruitProps = Pick<Prisma.FruitFindUniqueArgs, "where" | "select">;

/** Find many options for Fruits */
export type SelectFruitListProps = Pick<Prisma.FruitFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Fruits */
export type SelectFruitAmountProps = Pick<Prisma.FruitCountArgs, "where">;
