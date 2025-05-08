// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { FruitCreateArgsSchema, FruitCreateManyArgsSchema, FruitDeleteArgsSchema, FruitDeleteManyArgsSchema, FruitFindFirstArgsSchema, FruitFindManyArgsSchema, FruitFindUniqueArgsSchema, FruitOrderByWithRelationInputSchema, FruitSchema, FruitUpdateArgsSchema, FruitUpdateManyArgsSchema, FruitUpsertArgsSchema, FruitWhereInputSchema, FruitWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;
export type FruitCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateFruitProps = Prisma.FruitCreateArgs;
export type UpsertFruitProps = Prisma.FruitUpsertArgs;
export type UpdateFruitProps = Prisma.FruitUpdateArgs;
export type DeleteFruitProps = Prisma.FruitDeleteArgs;

// Multiple mutations
export type CreateManyFruitProps = Prisma.FruitCreateManyArgs;
export type UpdateManyFruitProps = Prisma.FruitUpdateManyArgs;
export type DeleteManyFruitProps = Prisma.FruitDeleteManyArgs;

// Single queries
export type FindFirstFruitProps = Prisma.FruitFindFirstArgs;
export type FindUniqueFruitProps = Prisma.FruitFindUniqueArgs;
export type FindManyFruitProps = Prisma.FruitFindManyArgs;

// Multiple queries
export type CountFruitProps = Prisma.FruitCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createFruitSchema: ZodType<CreateFruitProps> = FruitCreateArgsSchema;
export const upsertFruitSchema: ZodType<UpsertFruitProps> = FruitUpsertArgsSchema;
export const updateFruitSchema: ZodType<UpdateFruitProps> = FruitUpdateArgsSchema;
export const deleteFruitSchema: ZodType<DeleteFruitProps> = FruitDeleteArgsSchema;

// Multiple mutations
export const createManyFruitSchema: ZodType<CreateManyFruitProps> = FruitCreateManyArgsSchema;
export const updateManyFruitSchema: ZodType<UpdateManyFruitProps> = FruitUpdateManyArgsSchema;
export const deleteManyFruitSchema: ZodType<DeleteManyFruitProps> = FruitDeleteManyArgsSchema;

// Single queries
export const selectFirstFruitSchema: ZodType<FindFirstFruitProps> = FruitFindFirstArgsSchema;
export const selectUniqueFruitSchema: ZodType<FindUniqueFruitProps> = FruitFindUniqueArgsSchema;
export const selectManyFruitSchema: ZodType<FindManyFruitProps> = FruitFindManyArgsSchema;

// Aggregate queries
export const countFruitSchema: ZodType<CountFruitProps> =  z.object({
    where: z.lazy(() => FruitWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => FruitOrderByWithRelationInputSchema),
        z.array(z.lazy(() => FruitOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => FruitWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type CreateFruitResponse<T extends CreateFruitProps> = Prisma.FruitGetPayload<T>;
export type UpsertFruitResponse<T extends UpsertFruitProps> = Prisma.FruitGetPayload<T>;
export type UpdateFruitResponse<T extends UpdateFruitProps> = Prisma.FruitGetPayload<T>;
export type DeleteFruitResponse<T extends DeleteFruitProps> = Prisma.FruitGetPayload<T>;

// Multiple mutations
export type CreateManyFruitResponse = { count: number };
export type UpdateManyFruitResponse = { count: number };
export type DeleteManyFruitResponse = { count: number };

// Single queries
export type FindFirstFruitResponse<T extends FindFirstFruitProps> = Prisma.FruitGetPayload<T> | null;
export type FindUniqueFruitResponse<T extends FindUniqueFruitProps> = Prisma.FruitGetPayload<T> | null;
export type FindManyFruitResponse<T extends FindManyFruitProps> = Prisma.FruitGetPayload<T>[];

// Aggregate queries
export type CountFruitResponse = FruitCount;
