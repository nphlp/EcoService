// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { QuantityCreateArgsSchema, QuantityCreateManyArgsSchema, QuantityDeleteArgsSchema, QuantityDeleteManyArgsSchema, QuantityFindFirstArgsSchema, QuantityFindManyArgsSchema, QuantityFindUniqueArgsSchema, QuantityOrderByWithRelationInputSchema, QuantitySchema, QuantityUpdateArgsSchema, QuantityUpdateManyArgsSchema, QuantityUpsertArgsSchema, QuantityWhereInputSchema, QuantityWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;
export type QuantityCount = number;

// ============== Props Types ============== //

// Single mutations
export type QuantityCreateProps = Prisma.QuantityCreateArgs;
export type QuantityUpsertProps = Prisma.QuantityUpsertArgs;
export type QuantityUpdateProps = Prisma.QuantityUpdateArgs;
export type QuantityDeleteProps = Prisma.QuantityDeleteArgs;

// Multiple mutations
export type QuantityCreateManyProps = Prisma.QuantityCreateManyArgs;
export type QuantityUpdateManyProps = Prisma.QuantityUpdateManyArgs;
export type QuantityDeleteManyProps = Prisma.QuantityDeleteManyArgs;

// Single queries
export type QuantityFindFirstProps = Prisma.QuantityFindFirstArgs;
export type QuantityFindUniqueProps = Prisma.QuantityFindUniqueArgs;
export type QuantityFindManyProps = Prisma.QuantityFindManyArgs;

// Multiple queries
export type QuantityCountProps = Prisma.QuantityCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const QuantityCreateSchema: ZodType<QuantityCreateProps> = QuantityCreateArgsSchema;
export const QuantityUpsertSchema: ZodType<QuantityUpsertProps> = QuantityUpsertArgsSchema;
export const QuantityUpdateSchema: ZodType<QuantityUpdateProps> = QuantityUpdateArgsSchema;
export const QuantityDeleteSchema: ZodType<QuantityDeleteProps> = QuantityDeleteArgsSchema;

// Multiple mutations
export const QuantityCreateManySchema: ZodType<QuantityCreateManyProps> = QuantityCreateManyArgsSchema;
export const QuantityUpdateManySchema: ZodType<QuantityUpdateManyProps> = QuantityUpdateManyArgsSchema;
export const QuantityDeleteManySchema: ZodType<QuantityDeleteManyProps> = QuantityDeleteManyArgsSchema;

// Single queries
export const QuantityFindFirstSchema: ZodType<QuantityFindFirstProps> = QuantityFindFirstArgsSchema;
export const QuantityFindUniqueSchema: ZodType<QuantityFindUniqueProps> = QuantityFindUniqueArgsSchema;
export const QuantityFindManySchema: ZodType<QuantityFindManyProps> = QuantityFindManyArgsSchema;

// Aggregate queries
export const QuantityCountSchema: ZodType<QuantityCountProps> =  z.object({
    where: z.lazy(() => QuantityWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => QuantityOrderByWithRelationInputSchema),
        z.array(z.lazy(() => QuantityOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => QuantityWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type QuantityCreateResponse<T extends QuantityCreateProps> = Prisma.QuantityGetPayload<T>;
export type QuantityUpsertResponse<T extends QuantityUpsertProps> = Prisma.QuantityGetPayload<T>;
export type QuantityUpdateResponse<T extends QuantityUpdateProps> = Prisma.QuantityGetPayload<T>;
export type QuantityDeleteResponse<T extends QuantityDeleteProps> = Prisma.QuantityGetPayload<T>;

// Multiple mutations
export type QuantityCreateManyResponse = { count: number };
export type QuantityUpdateManyResponse = { count: number };
export type QuantityDeleteManyResponse = { count: number };

// Single queries
export type QuantityFindFirstResponse<T extends QuantityFindFirstProps> = Prisma.QuantityGetPayload<T> | null;
export type QuantityFindUniqueResponse<T extends QuantityFindUniqueProps> = Prisma.QuantityGetPayload<T> | null;
export type QuantityFindManyResponse<T extends QuantityFindManyProps> = Prisma.QuantityGetPayload<T>[];

// Aggregate queries
export type QuantityCountResponse = QuantityCount;
