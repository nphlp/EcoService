// ============== Types ============== //

import { Order, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type OrderModel = Order;
export type OrderCount = number;

// ============== Props Types ============== //

// Single mutations
export type OrderCreateProps = Prisma.OrderCreateArgs;
export type OrderUpsertProps = Prisma.OrderUpsertArgs;
export type OrderUpdateProps = Prisma.OrderUpdateArgs;
export type OrderDeleteProps = Prisma.OrderDeleteArgs;

// Multiple mutations
export type OrderCreateManyProps = Prisma.OrderCreateManyArgs;
export type OrderUpdateManyProps = Prisma.OrderUpdateManyArgs;
export type OrderDeleteManyProps = Prisma.OrderDeleteManyArgs;

// Single queries
export type OrderFindFirstProps = Prisma.OrderFindFirstArgs;
export type OrderFindUniqueProps = Prisma.OrderFindUniqueArgs;
export type OrderFindManyProps = Prisma.OrderFindManyArgs;

// Multiple queries
export type OrderCountProps = Prisma.OrderCountArgs;

// ============== Response Types ============== //

// Single mutations
export type OrderCreateResponse<T extends OrderCreateProps> = Prisma.OrderGetPayload<T>;
export type OrderUpsertResponse<T extends OrderUpsertProps> = Prisma.OrderGetPayload<T>;
export type OrderUpdateResponse<T extends OrderUpdateProps> = Prisma.OrderGetPayload<T>;
export type OrderDeleteResponse<T extends OrderDeleteProps> = Prisma.OrderGetPayload<T>;

// Multiple mutations
export type OrderCreateManyResponse = { count: number };
export type OrderUpdateManyResponse = { count: number };
export type OrderDeleteManyResponse = { count: number };

// Single queries
export type OrderFindFirstResponse<T extends OrderFindFirstProps> = Prisma.OrderGetPayload<T> | null;
export type OrderFindUniqueResponse<T extends OrderFindUniqueProps> = Prisma.OrderGetPayload<T> | null;
export type OrderFindManyResponse<T extends OrderFindManyProps> = Prisma.OrderGetPayload<T>[];

// Aggregate queries
export type OrderCountResponse = OrderCount;
