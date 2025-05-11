// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { QuantityCreateArgsSchema, QuantityCreateManyArgsSchema, QuantityDeleteArgsSchema, QuantityDeleteManyArgsSchema, QuantityFindFirstArgsSchema, QuantityFindManyArgsSchema, QuantityFindUniqueArgsSchema, QuantityOrderByWithRelationInputSchema, QuantitySchema, QuantityUpdateArgsSchema, QuantityUpdateManyArgsSchema, QuantityUpsertArgsSchema, QuantityWhereInputSchema, QuantityWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;
export type QuantityCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateQuantityProps = Prisma.QuantityCreateArgs;
export type UpsertQuantityProps = Prisma.QuantityUpsertArgs;
export type UpdateQuantityProps = Prisma.QuantityUpdateArgs;
export type DeleteQuantityProps = Prisma.QuantityDeleteArgs;

// Multiple mutations
export type CreateManyQuantityProps = Prisma.QuantityCreateManyArgs;
export type UpdateManyQuantityProps = Prisma.QuantityUpdateManyArgs;
export type DeleteManyQuantityProps = Prisma.QuantityDeleteManyArgs;

// Single queries
export type FindFirstQuantityProps = Prisma.QuantityFindFirstArgs;
export type FindUniqueQuantityProps = Prisma.QuantityFindUniqueArgs;
export type FindManyQuantityProps = Prisma.QuantityFindManyArgs;

// Multiple queries
export type CountQuantityProps = Prisma.QuantityCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createQuantitySchema: ZodType<CreateQuantityProps> = QuantityCreateArgsSchema;
export const upsertQuantitySchema: ZodType<UpsertQuantityProps> = QuantityUpsertArgsSchema;
export const updateQuantitySchema: ZodType<UpdateQuantityProps> = QuantityUpdateArgsSchema;
export const deleteQuantitySchema: ZodType<DeleteQuantityProps> = QuantityDeleteArgsSchema;

// Multiple mutations
export const createManyQuantitySchema: ZodType<CreateManyQuantityProps> = QuantityCreateManyArgsSchema;
export const updateManyQuantitySchema: ZodType<UpdateManyQuantityProps> = QuantityUpdateManyArgsSchema;
export const deleteManyQuantitySchema: ZodType<DeleteManyQuantityProps> = QuantityDeleteManyArgsSchema;

// Single queries
export const selectFirstQuantitySchema: ZodType<FindFirstQuantityProps> = QuantityFindFirstArgsSchema;
export const selectUniqueQuantitySchema: ZodType<FindUniqueQuantityProps> = QuantityFindUniqueArgsSchema;
export const selectManyQuantitySchema: ZodType<FindManyQuantityProps> = QuantityFindManyArgsSchema;

// Aggregate queries
export const countQuantitySchema: ZodType<CountQuantityProps> =  z.object({
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
export type CreateQuantityResponse<T extends CreateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpsertQuantityResponse<T extends UpsertQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpdateQuantityResponse<T extends UpdateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type DeleteQuantityResponse<T extends DeleteQuantityProps> = Prisma.QuantityGetPayload<T>;

// Multiple mutations
export type CreateManyQuantityResponse = { count: number };
export type UpdateManyQuantityResponse = { count: number };
export type DeleteManyQuantityResponse = { count: number };

// Single queries
export type FindFirstQuantityResponse<T extends FindFirstQuantityProps> = Prisma.QuantityGetPayload<T> | null;
export type FindUniqueQuantityResponse<T extends FindUniqueQuantityProps> = Prisma.QuantityGetPayload<T> | null;
export type FindManyQuantityResponse<T extends FindManyQuantityProps> = Prisma.QuantityGetPayload<T>[];

// Aggregate queries
export type CountQuantityResponse = QuantityCount;
