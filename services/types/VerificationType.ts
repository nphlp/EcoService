// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { VerificationCreateArgsSchema, VerificationCreateManyArgsSchema, VerificationDeleteArgsSchema, VerificationDeleteManyArgsSchema, VerificationFindFirstArgsSchema, VerificationFindManyArgsSchema, VerificationFindUniqueArgsSchema, VerificationOrderByWithRelationInputSchema, VerificationSchema, VerificationUpdateArgsSchema, VerificationUpdateManyArgsSchema, VerificationUpsertArgsSchema, VerificationWhereInputSchema, VerificationWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;
export type VerificationCount = number;

// ============== Props Types ============== //

// Single mutations
export type VerificationCreateProps = Prisma.VerificationCreateArgs;
export type VerificationUpsertProps = Prisma.VerificationUpsertArgs;
export type VerificationUpdateProps = Prisma.VerificationUpdateArgs;
export type VerificationDeleteProps = Prisma.VerificationDeleteArgs;

// Multiple mutations
export type VerificationCreateManyProps = Prisma.VerificationCreateManyArgs;
export type VerificationUpdateManyProps = Prisma.VerificationUpdateManyArgs;
export type VerificationDeleteManyProps = Prisma.VerificationDeleteManyArgs;

// Single queries
export type VerificationFindFirstProps = Prisma.VerificationFindFirstArgs;
export type VerificationFindUniqueProps = Prisma.VerificationFindUniqueArgs;
export type VerificationFindManyProps = Prisma.VerificationFindManyArgs;

// Multiple queries
export type VerificationCountProps = Prisma.VerificationCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const VerificationCreateSchema: ZodType<VerificationCreateProps> = VerificationCreateArgsSchema;
export const VerificationUpsertSchema: ZodType<VerificationUpsertProps> = VerificationUpsertArgsSchema;
export const VerificationUpdateSchema: ZodType<VerificationUpdateProps> = VerificationUpdateArgsSchema;
export const VerificationDeleteSchema: ZodType<VerificationDeleteProps> = VerificationDeleteArgsSchema;

// Multiple mutations
export const VerificationCreateManySchema: ZodType<VerificationCreateManyProps> = VerificationCreateManyArgsSchema;
export const VerificationUpdateManySchema: ZodType<VerificationUpdateManyProps> = VerificationUpdateManyArgsSchema;
export const VerificationDeleteManySchema: ZodType<VerificationDeleteManyProps> = VerificationDeleteManyArgsSchema;

// Single queries
export const VerificationFindFirstSchema: ZodType<VerificationFindFirstProps> = VerificationFindFirstArgsSchema;
export const VerificationFindUniqueSchema: ZodType<VerificationFindUniqueProps> = VerificationFindUniqueArgsSchema;
export const VerificationFindManySchema: ZodType<VerificationFindManyProps> = VerificationFindManyArgsSchema;

// Aggregate queries
export const VerificationCountSchema: ZodType<VerificationCountProps> =  z.object({
    where: z.lazy(() => VerificationWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => VerificationOrderByWithRelationInputSchema),
        z.array(z.lazy(() => VerificationOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => VerificationWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type VerificationCreateResponse<T extends VerificationCreateProps> = Prisma.VerificationGetPayload<T>;
export type VerificationUpsertResponse<T extends VerificationUpsertProps> = Prisma.VerificationGetPayload<T>;
export type VerificationUpdateResponse<T extends VerificationUpdateProps> = Prisma.VerificationGetPayload<T>;
export type VerificationDeleteResponse<T extends VerificationDeleteProps> = Prisma.VerificationGetPayload<T>;

// Multiple mutations
export type VerificationCreateManyResponse = { count: number };
export type VerificationUpdateManyResponse = { count: number };
export type VerificationDeleteManyResponse = { count: number };

// Single queries
export type VerificationFindFirstResponse<T extends VerificationFindFirstProps> = Prisma.VerificationGetPayload<T> | null;
export type VerificationFindUniqueResponse<T extends VerificationFindUniqueProps> = Prisma.VerificationGetPayload<T> | null;
export type VerificationFindManyResponse<T extends VerificationFindManyProps> = Prisma.VerificationGetPayload<T>[];

// Aggregate queries
export type VerificationCountResponse = VerificationCount;
