// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { OrderCreateArgsSchema, OrderCreateManyArgsSchema, OrderDeleteArgsSchema, OrderDeleteManyArgsSchema, OrderFindFirstArgsSchema, OrderFindManyArgsSchema, OrderFindUniqueArgsSchema, OrderOrderByWithRelationInputSchema, OrderSchema, OrderUpdateArgsSchema, OrderUpdateManyArgsSchema, OrderUpsertArgsSchema, OrderWhereInputSchema, OrderWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;
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

// ============== Schema Types ============== //

// Single mutations
export const OrderCreateSchema: ZodType<OrderCreateProps> = OrderCreateArgsSchema;
export const OrderUpsertSchema: ZodType<OrderUpsertProps> = OrderUpsertArgsSchema;
export const OrderUpdateSchema: ZodType<OrderUpdateProps> = OrderUpdateArgsSchema;
export const OrderDeleteSchema: ZodType<OrderDeleteProps> = OrderDeleteArgsSchema;

// Multiple mutations
export const OrderCreateManySchema: ZodType<OrderCreateManyProps> = OrderCreateManyArgsSchema;
export const OrderUpdateManySchema: ZodType<OrderUpdateManyProps> = OrderUpdateManyArgsSchema;
export const OrderDeleteManySchema: ZodType<OrderDeleteManyProps> = OrderDeleteManyArgsSchema;

// Single queries
export const OrderFindFirstSchema: ZodType<OrderFindFirstProps> = OrderFindFirstArgsSchema;
export const OrderFindUniqueSchema: ZodType<OrderFindUniqueProps> = OrderFindUniqueArgsSchema;
export const OrderFindManySchema: ZodType<OrderFindManyProps> = OrderFindManyArgsSchema;

// Aggregate queries
export const OrderCountSchema: ZodType<OrderCountProps> =  z.object({
    where: z.lazy(() => OrderWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => OrderOrderByWithRelationInputSchema),
        z.array(z.lazy(() => OrderOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

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
