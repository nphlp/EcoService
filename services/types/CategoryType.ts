// ============== Types ============== //

import { Category, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type CategoryModel = Category;
export type CategoryCount = number;

// ============== Props Types ============== //

// Single mutations
export type CategoryCreateProps = Prisma.CategoryCreateArgs;
export type CategoryUpsertProps = Prisma.CategoryUpsertArgs;
export type CategoryUpdateProps = Prisma.CategoryUpdateArgs;
export type CategoryDeleteProps = Prisma.CategoryDeleteArgs;

// Multiple mutations
export type CategoryCreateManyProps = Prisma.CategoryCreateManyArgs;
export type CategoryUpdateManyProps = Prisma.CategoryUpdateManyArgs;
export type CategoryDeleteManyProps = Prisma.CategoryDeleteManyArgs;

// Single queries
export type CategoryFindFirstProps = Prisma.CategoryFindFirstArgs;
export type CategoryFindUniqueProps = Prisma.CategoryFindUniqueArgs;
export type CategoryFindManyProps = Prisma.CategoryFindManyArgs;

// Multiple queries
export type CategoryCountProps = Prisma.CategoryCountArgs;

// ============== Response Types ============== //

// Single mutations
export type CategoryCreateResponse<T extends CategoryCreateProps> = Prisma.CategoryGetPayload<T>;
export type CategoryUpsertResponse<T extends CategoryUpsertProps> = Prisma.CategoryGetPayload<T>;
export type CategoryUpdateResponse<T extends CategoryUpdateProps> = Prisma.CategoryGetPayload<T>;
export type CategoryDeleteResponse<T extends CategoryDeleteProps> = Prisma.CategoryGetPayload<T>;

// Multiple mutations
export type CategoryCreateManyResponse = { count: number };
export type CategoryUpdateManyResponse = { count: number };
export type CategoryDeleteManyResponse = { count: number };

// Single queries
export type CategoryFindFirstResponse<T extends CategoryFindFirstProps> = Prisma.CategoryGetPayload<T> | null;
export type CategoryFindUniqueResponse<T extends CategoryFindUniqueProps> = Prisma.CategoryGetPayload<T> | null;
export type CategoryFindManyResponse<T extends CategoryFindManyProps> = Prisma.CategoryGetPayload<T>[];

// Aggregate queries
export type CategoryCountResponse = CategoryCount;
