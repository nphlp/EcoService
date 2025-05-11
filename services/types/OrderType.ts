// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { OrderCreateArgsSchema, OrderCreateManyArgsSchema, OrderDeleteArgsSchema, OrderDeleteManyArgsSchema, OrderFindFirstArgsSchema, OrderFindManyArgsSchema, OrderFindUniqueArgsSchema, OrderOrderByWithRelationInputSchema, OrderSchema, OrderUpdateArgsSchema, OrderUpdateManyArgsSchema, OrderUpsertArgsSchema, OrderWhereInputSchema, OrderWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;
export type OrderCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateOrderProps = Prisma.OrderCreateArgs;
export type UpsertOrderProps = Prisma.OrderUpsertArgs;
export type UpdateOrderProps = Prisma.OrderUpdateArgs;
export type DeleteOrderProps = Prisma.OrderDeleteArgs;

// Multiple mutations
export type CreateManyOrderProps = Prisma.OrderCreateManyArgs;
export type UpdateManyOrderProps = Prisma.OrderUpdateManyArgs;
export type DeleteManyOrderProps = Prisma.OrderDeleteManyArgs;

// Single queries
export type FindFirstOrderProps = Prisma.OrderFindFirstArgs;
export type FindUniqueOrderProps = Prisma.OrderFindUniqueArgs;
export type FindManyOrderProps = Prisma.OrderFindManyArgs;

// Multiple queries
export type CountOrderProps = Prisma.OrderCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createOrderSchema: ZodType<CreateOrderProps> = OrderCreateArgsSchema;
export const upsertOrderSchema: ZodType<UpsertOrderProps> = OrderUpsertArgsSchema;
export const updateOrderSchema: ZodType<UpdateOrderProps> = OrderUpdateArgsSchema;
export const deleteOrderSchema: ZodType<DeleteOrderProps> = OrderDeleteArgsSchema;

// Multiple mutations
export const createManyOrderSchema: ZodType<CreateManyOrderProps> = OrderCreateManyArgsSchema;
export const updateManyOrderSchema: ZodType<UpdateManyOrderProps> = OrderUpdateManyArgsSchema;
export const deleteManyOrderSchema: ZodType<DeleteManyOrderProps> = OrderDeleteManyArgsSchema;

// Single queries
export const selectFirstOrderSchema: ZodType<FindFirstOrderProps> = OrderFindFirstArgsSchema;
export const selectUniqueOrderSchema: ZodType<FindUniqueOrderProps> = OrderFindUniqueArgsSchema;
export const selectManyOrderSchema: ZodType<FindManyOrderProps> = OrderFindManyArgsSchema;

// Aggregate queries
export const countOrderSchema: ZodType<CountOrderProps> =  z.object({
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
export type CreateOrderResponse<T extends CreateOrderProps> = Prisma.OrderGetPayload<T>;
export type UpsertOrderResponse<T extends UpsertOrderProps> = Prisma.OrderGetPayload<T>;
export type UpdateOrderResponse<T extends UpdateOrderProps> = Prisma.OrderGetPayload<T>;
export type DeleteOrderResponse<T extends DeleteOrderProps> = Prisma.OrderGetPayload<T>;

// Multiple mutations
export type CreateManyOrderResponse = { count: number };
export type UpdateManyOrderResponse = { count: number };
export type DeleteManyOrderResponse = { count: number };

// Single queries
export type FindFirstOrderResponse<T extends FindFirstOrderProps> = Prisma.OrderGetPayload<T> | null;
export type FindUniqueOrderResponse<T extends FindUniqueOrderProps> = Prisma.OrderGetPayload<T> | null;
export type FindManyOrderResponse<T extends FindManyOrderProps> = Prisma.OrderGetPayload<T>[];

// Aggregate queries
export type CountOrderResponse = OrderCount;
