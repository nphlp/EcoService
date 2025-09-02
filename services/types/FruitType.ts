// ============== Types ============== //

import { Fruit, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type FruitModel = Fruit;
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
