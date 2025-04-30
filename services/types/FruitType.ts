// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { FruitCreateArgsSchema, FruitDeleteArgsSchema, FruitFindManyArgsSchema, FruitFindUniqueArgsSchema, FruitOrderByWithRelationInputSchema, FruitSchema, FruitUpdateArgsSchema, FruitUpsertArgsSchema, FruitWhereInputSchema, FruitWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;
export type FruitCount = number;

// ============== Props Types ============== //

export type CreateFruitProps = Prisma.FruitCreateArgs;
export type UpsertFruitProps = Prisma.FruitUpsertArgs;
export type UpdateFruitProps = Prisma.FruitUpdateArgs;
export type DeleteFruitProps = Prisma.FruitDeleteArgs;
export type FindUniqueFruitProps = Prisma.FruitFindUniqueArgs;
export type FindManyFruitProps = Prisma.FruitFindManyArgs;
export type CountFruitProps = Prisma.FruitCountArgs;

// ============== Schema Types ============== //

export const createFruitSchema: ZodType<CreateFruitProps> = FruitCreateArgsSchema;
export const upsertFruitSchema: ZodType<UpsertFruitProps> = FruitUpsertArgsSchema;
export const updateFruitSchema: ZodType<UpdateFruitProps> = FruitUpdateArgsSchema;
export const deleteFruitSchema: ZodType<DeleteFruitProps> = FruitDeleteArgsSchema;
export const selectFruitSchema: ZodType<FindUniqueFruitProps> = FruitFindUniqueArgsSchema;
export const selectManyFruitSchema: ZodType<FindManyFruitProps> = FruitFindManyArgsSchema;
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

export type CreateFruitResponse<T extends CreateFruitProps> = Prisma.FruitGetPayload<T>;
export type UpsertFruitResponse<T extends UpsertFruitProps> = Prisma.FruitGetPayload<T>;
export type UpdateFruitResponse<T extends UpdateFruitProps> = Prisma.FruitGetPayload<T>;
export type DeleteFruitResponse<T extends DeleteFruitProps> = Prisma.FruitGetPayload<T>;
export type FindUniqueFruitResponse<T extends FindUniqueFruitProps> = Prisma.FruitGetPayload<T> | null;
export type FindManyFruitResponse<T extends FindManyFruitProps> = Prisma.FruitGetPayload<T>[];
export type CountFruitResponse = FruitCount;
