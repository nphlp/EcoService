// ============== Types ============== //

import { Content, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type ContentModel = Content;
export type ContentCount = number;

// ============== Props Types ============== //

// Single mutations
export type ContentCreateProps = Prisma.ContentCreateArgs;
export type ContentUpsertProps = Prisma.ContentUpsertArgs;
export type ContentUpdateProps = Prisma.ContentUpdateArgs;
export type ContentDeleteProps = Prisma.ContentDeleteArgs;

// Multiple mutations
export type ContentCreateManyProps = Prisma.ContentCreateManyArgs;
export type ContentUpdateManyProps = Prisma.ContentUpdateManyArgs;
export type ContentDeleteManyProps = Prisma.ContentDeleteManyArgs;

// Single queries
export type ContentFindFirstProps = Prisma.ContentFindFirstArgs;
export type ContentFindUniqueProps = Prisma.ContentFindUniqueArgs;
export type ContentFindManyProps = Prisma.ContentFindManyArgs;

// Multiple queries
export type ContentCountProps = Prisma.ContentCountArgs;

// ============== Response Types ============== //

// Single mutations
export type ContentCreateResponse<T extends ContentCreateProps> = Prisma.ContentGetPayload<T>;
export type ContentUpsertResponse<T extends ContentUpsertProps> = Prisma.ContentGetPayload<T>;
export type ContentUpdateResponse<T extends ContentUpdateProps> = Prisma.ContentGetPayload<T>;
export type ContentDeleteResponse<T extends ContentDeleteProps> = Prisma.ContentGetPayload<T>;

// Multiple mutations
export type ContentCreateManyResponse = { count: number };
export type ContentUpdateManyResponse = { count: number };
export type ContentDeleteManyResponse = { count: number };

// Single queries
export type ContentFindFirstResponse<T extends ContentFindFirstProps> = Prisma.ContentGetPayload<T> | null;
export type ContentFindUniqueResponse<T extends ContentFindUniqueProps> = Prisma.ContentGetPayload<T> | null;
export type ContentFindManyResponse<T extends ContentFindManyProps> = Prisma.ContentGetPayload<T>[];

// Aggregate queries
export type ContentCountResponse = ContentCount;
