// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { FruitCreateArgsSchema, FruitCreateManyArgsSchema, FruitDeleteArgsSchema, FruitDeleteManyArgsSchema, FruitFindFirstArgsSchema, FruitFindManyArgsSchema, FruitFindUniqueArgsSchema, FruitOrderByWithRelationInputSchema, FruitSchema, FruitUpdateArgsSchema, FruitUpdateManyArgsSchema, FruitUpsertArgsSchema, FruitWhereInputSchema, FruitWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type FruitModel = z.infer<typeof FruitSchema>;
export type FruitCount = number;

// ============== Props Types ============== //

// Single mutations
export type FruitCreateProps = Prisma.FruitCreateArgs;
export type FruitUpsertProps = Prisma.FruitUpsertArgs;
export type FruitUpdateProps = Prisma.FruitUpdateArgs;
export type FruitDeleteProps = Prisma.FruitDeleteArgs;

// Multiple mutations
export type FruitCreateManyProps = Prisma.FruitCreateManyArgs;
export type FruitUpdateManyProps = Prisma.FruitUpdateManyArgs;
export type FruitDeleteManyProps = Prisma.FruitDeleteManyArgs;

// Single queries
export type FruitFindFirstProps = Prisma.FruitFindFirstArgs;
export type FruitFindUniqueProps = Prisma.FruitFindUniqueArgs;
export type FruitFindManyProps = Prisma.FruitFindManyArgs;

// Multiple queries
export type FruitCountProps = Prisma.FruitCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const FruitCreateSchema: ZodType<FruitCreateProps> = FruitCreateArgsSchema;
export const FruitUpsertSchema: ZodType<FruitUpsertProps> = FruitUpsertArgsSchema;
export const FruitUpdateSchema: ZodType<FruitUpdateProps> = FruitUpdateArgsSchema;
export const FruitDeleteSchema: ZodType<FruitDeleteProps> = FruitDeleteArgsSchema;

// Multiple mutations
export const FruitCreateManySchema: ZodType<FruitCreateManyProps> = FruitCreateManyArgsSchema;
export const FruitUpdateManySchema: ZodType<FruitUpdateManyProps> = FruitUpdateManyArgsSchema;
export const FruitDeleteManySchema: ZodType<FruitDeleteManyProps> = FruitDeleteManyArgsSchema;

// Single queries
export const FruitFindFirstSchema: ZodType<FruitFindFirstProps> = FruitFindFirstArgsSchema;
export const FruitFindUniqueSchema: ZodType<FruitFindUniqueProps> = FruitFindUniqueArgsSchema;
export const FruitFindManySchema: ZodType<FruitFindManyProps> = FruitFindManyArgsSchema;

// Aggregate queries
export const FruitCountSchema: ZodType<FruitCountProps> =  z.object({
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
export type FruitCreateResponse<T extends FruitCreateProps> = Prisma.FruitGetPayload<T>;
export type FruitUpsertResponse<T extends FruitUpsertProps> = Prisma.FruitGetPayload<T>;
export type FruitUpdateResponse<T extends FruitUpdateProps> = Prisma.FruitGetPayload<T>;
export type FruitDeleteResponse<T extends FruitDeleteProps> = Prisma.FruitGetPayload<T>;

// Multiple mutations
export type FruitCreateManyResponse = { count: number };
export type FruitUpdateManyResponse = { count: number };
export type FruitDeleteManyResponse = { count: number };

// Single queries
export type FruitFindFirstResponse<T extends FruitFindFirstProps> = Prisma.FruitGetPayload<T> | null;
export type FruitFindUniqueResponse<T extends FruitFindUniqueProps> = Prisma.FruitGetPayload<T> | null;
export type FruitFindManyResponse<T extends FruitFindManyProps> = Prisma.FruitGetPayload<T>[];

// Aggregate queries
export type FruitCountResponse = FruitCount;
