// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { OrderCreateArgsSchema, OrderDeleteArgsSchema, OrderFindManyArgsSchema, OrderFindUniqueArgsSchema, OrderOrderByWithRelationInputSchema, OrderSchema, OrderUpdateArgsSchema, OrderUpsertArgsSchema, OrderWhereInputSchema, OrderWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;
export type OrderCount = number;

// ============== Props Types ============== //

export type CreateOrderProps = Prisma.OrderCreateArgs;
export type UpsertOrderProps = Prisma.OrderUpsertArgs;
export type UpdateOrderProps = Prisma.OrderUpdateArgs;
export type DeleteOrderProps = Prisma.OrderDeleteArgs;
export type FindUniqueOrderProps = Prisma.OrderFindUniqueArgs;
export type FindManyOrderProps = Prisma.OrderFindManyArgs;
export type CountOrderProps = Prisma.OrderCountArgs;

// ============== Schema Types ============== //

export const createOrderSchema: ZodType<CreateOrderProps> = OrderCreateArgsSchema;
export const upsertOrderSchema: ZodType<UpsertOrderProps> = OrderUpsertArgsSchema;
export const updateOrderSchema: ZodType<UpdateOrderProps> = OrderUpdateArgsSchema;
export const deleteOrderSchema: ZodType<DeleteOrderProps> = OrderDeleteArgsSchema;
export const selectOrderSchema: ZodType<FindUniqueOrderProps> = OrderFindUniqueArgsSchema;
export const selectManyOrderSchema: ZodType<FindManyOrderProps> = OrderFindManyArgsSchema;
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

export type CreateOrderResponse<T extends CreateOrderProps> = Prisma.OrderGetPayload<T>;
export type UpsertOrderResponse<T extends UpsertOrderProps> = Prisma.OrderGetPayload<T>;
export type UpdateOrderResponse<T extends UpdateOrderProps> = Prisma.OrderGetPayload<T>;
export type DeleteOrderResponse<T extends DeleteOrderProps> = Prisma.OrderGetPayload<T>;
export type FindUniqueOrderResponse<T extends FindUniqueOrderProps> = Prisma.OrderGetPayload<T> | null;
export type FindManyOrderResponse<T extends FindManyOrderProps> = Prisma.OrderGetPayload<T>[];
export type CountOrderResponse = OrderCount;
