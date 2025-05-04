// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { QuantityCreateArgsSchema, QuantityDeleteArgsSchema, QuantityFindFirstArgsSchema, QuantityFindManyArgsSchema, QuantityFindUniqueArgsSchema, QuantityOrderByWithRelationInputSchema, QuantitySchema, QuantityUpdateArgsSchema, QuantityUpsertArgsSchema, QuantityWhereInputSchema, QuantityWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type QuantityModel = z.infer<typeof QuantitySchema>;
export type QuantityCount = number;

// ============== Props Types ============== //

export type CreateQuantityProps = Prisma.QuantityCreateArgs;
export type UpsertQuantityProps = Prisma.QuantityUpsertArgs;
export type UpdateQuantityProps = Prisma.QuantityUpdateArgs;
export type DeleteQuantityProps = Prisma.QuantityDeleteArgs;
export type FindFirstQuantityProps = Prisma.QuantityFindFirstArgs;
export type FindUniqueQuantityProps = Prisma.QuantityFindUniqueArgs;
export type FindManyQuantityProps = Prisma.QuantityFindManyArgs;
export type CountQuantityProps = Prisma.QuantityCountArgs;

// ============== Schema Types ============== //

export const createQuantitySchema: ZodType<CreateQuantityProps> = QuantityCreateArgsSchema;
export const upsertQuantitySchema: ZodType<UpsertQuantityProps> = QuantityUpsertArgsSchema;
export const updateQuantitySchema: ZodType<UpdateQuantityProps> = QuantityUpdateArgsSchema;
export const deleteQuantitySchema: ZodType<DeleteQuantityProps> = QuantityDeleteArgsSchema;
export const selectFirstQuantitySchema: ZodType<FindFirstQuantityProps> = QuantityFindFirstArgsSchema;
export const selectUniqueQuantitySchema: ZodType<FindUniqueQuantityProps> = QuantityFindUniqueArgsSchema;
export const selectManyQuantitySchema: ZodType<FindManyQuantityProps> = QuantityFindManyArgsSchema;
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

export type CreateQuantityResponse<T extends CreateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpsertQuantityResponse<T extends UpsertQuantityProps> = Prisma.QuantityGetPayload<T>;
export type UpdateQuantityResponse<T extends UpdateQuantityProps> = Prisma.QuantityGetPayload<T>;
export type DeleteQuantityResponse<T extends DeleteQuantityProps> = Prisma.QuantityGetPayload<T>;
export type FindFirstQuantityResponse<T extends FindFirstQuantityProps> = Prisma.QuantityGetPayload<T> | null;
export type FindUniqueQuantityResponse<T extends FindUniqueQuantityProps> = Prisma.QuantityGetPayload<T> | null;
export type FindManyQuantityResponse<T extends FindManyQuantityProps> = Prisma.QuantityGetPayload<T>[];
export type CountQuantityResponse = QuantityCount;
