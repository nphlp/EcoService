// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { VerificationCreateArgsSchema, VerificationCreateManyArgsSchema, VerificationDeleteArgsSchema, VerificationDeleteManyArgsSchema, VerificationFindFirstArgsSchema, VerificationFindManyArgsSchema, VerificationFindUniqueArgsSchema, VerificationOrderByWithRelationInputSchema, VerificationSchema, VerificationUpdateArgsSchema, VerificationUpdateManyArgsSchema, VerificationUpsertArgsSchema, VerificationWhereInputSchema, VerificationWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;
export type VerificationCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateVerificationProps = Prisma.VerificationCreateArgs;
export type UpsertVerificationProps = Prisma.VerificationUpsertArgs;
export type UpdateVerificationProps = Prisma.VerificationUpdateArgs;
export type DeleteVerificationProps = Prisma.VerificationDeleteArgs;

// Multiple mutations
export type CreateManyVerificationProps = Prisma.VerificationCreateManyArgs;
export type UpdateManyVerificationProps = Prisma.VerificationUpdateManyArgs;
export type DeleteManyVerificationProps = Prisma.VerificationDeleteManyArgs;

// Single queries
export type FindFirstVerificationProps = Prisma.VerificationFindFirstArgs;
export type FindUniqueVerificationProps = Prisma.VerificationFindUniqueArgs;
export type FindManyVerificationProps = Prisma.VerificationFindManyArgs;

// Multiple queries
export type CountVerificationProps = Prisma.VerificationCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createVerificationSchema: ZodType<CreateVerificationProps> = VerificationCreateArgsSchema;
export const upsertVerificationSchema: ZodType<UpsertVerificationProps> = VerificationUpsertArgsSchema;
export const updateVerificationSchema: ZodType<UpdateVerificationProps> = VerificationUpdateArgsSchema;
export const deleteVerificationSchema: ZodType<DeleteVerificationProps> = VerificationDeleteArgsSchema;

// Multiple mutations
export const createManyVerificationSchema: ZodType<CreateManyVerificationProps> = VerificationCreateManyArgsSchema;
export const updateManyVerificationSchema: ZodType<UpdateManyVerificationProps> = VerificationUpdateManyArgsSchema;
export const deleteManyVerificationSchema: ZodType<DeleteManyVerificationProps> = VerificationDeleteManyArgsSchema;

// Single queries
export const selectFirstVerificationSchema: ZodType<FindFirstVerificationProps> = VerificationFindFirstArgsSchema;
export const selectUniqueVerificationSchema: ZodType<FindUniqueVerificationProps> = VerificationFindUniqueArgsSchema;
export const selectManyVerificationSchema: ZodType<FindManyVerificationProps> = VerificationFindManyArgsSchema;

// Aggregate queries
export const countVerificationSchema: ZodType<CountVerificationProps> =  z.object({
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
export type CreateVerificationResponse<T extends CreateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpsertVerificationResponse<T extends UpsertVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpdateVerificationResponse<T extends UpdateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type DeleteVerificationResponse<T extends DeleteVerificationProps> = Prisma.VerificationGetPayload<T>;

// Multiple mutations
export type CreateManyVerificationResponse = { count: number };
export type UpdateManyVerificationResponse = { count: number };
export type DeleteManyVerificationResponse = { count: number };

// Single queries
export type FindFirstVerificationResponse<T extends FindFirstVerificationProps> = Prisma.VerificationGetPayload<T> | null;
export type FindUniqueVerificationResponse<T extends FindUniqueVerificationProps> = Prisma.VerificationGetPayload<T> | null;
export type FindManyVerificationResponse<T extends FindManyVerificationProps> = Prisma.VerificationGetPayload<T>[];

// Aggregate queries
export type CountVerificationResponse = VerificationCount;
