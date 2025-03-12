import { OrderModel, RelatedOrderModel } from "@actions/zod-generated";
import { Order, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Order's model with relations */
export type OrderType = z.infer<typeof RelatedOrderModel>;

/** Represents the Order's unique identifier */
export type OrderId = Pick<Order, "id">;

/** Represents common Order properties without system-managed fields */
export type OrderCommon = Omit<Order, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Order */
export type OrderUpdate = {
    id: Order["id"];
    data: OrderCommon;
};

/** Represents system-managed timestamp fields */
export type OrderTimestamps = Pick<Order, "createdAt" | "updatedAt">;

/** Find one options for Orders */
export type SelectOrderProps = Pick<Prisma.OrderFindUniqueArgs, "where" | "select">;

/** Find many options for Orders */
export type SelectOrderListProps = Pick<Prisma.OrderFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Orders */
export type SelectOrderAmountProps = Pick<Prisma.OrderCountArgs, "where">;
