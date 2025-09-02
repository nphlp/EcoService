// ============== Types ============== //

import { Article, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type ArticleModel = Article;
export type ArticleCount = number;

// ============== Props Types ============== //

// Single mutations
export type ArticleCreateProps = Prisma.ArticleCreateArgs;
export type ArticleUpsertProps = Prisma.ArticleUpsertArgs;
export type ArticleUpdateProps = Prisma.ArticleUpdateArgs;
export type ArticleDeleteProps = Prisma.ArticleDeleteArgs;

// Multiple mutations
export type ArticleCreateManyProps = Prisma.ArticleCreateManyArgs;
export type ArticleUpdateManyProps = Prisma.ArticleUpdateManyArgs;
export type ArticleDeleteManyProps = Prisma.ArticleDeleteManyArgs;

// Single queries
export type ArticleFindFirstProps = Prisma.ArticleFindFirstArgs;
export type ArticleFindUniqueProps = Prisma.ArticleFindUniqueArgs;
export type ArticleFindManyProps = Prisma.ArticleFindManyArgs;

// Multiple queries
export type ArticleCountProps = Prisma.ArticleCountArgs;

// ============== Response Types ============== //

// Single mutations
export type ArticleCreateResponse<T extends ArticleCreateProps> = Prisma.ArticleGetPayload<T>;
export type ArticleUpsertResponse<T extends ArticleUpsertProps> = Prisma.ArticleGetPayload<T>;
export type ArticleUpdateResponse<T extends ArticleUpdateProps> = Prisma.ArticleGetPayload<T>;
export type ArticleDeleteResponse<T extends ArticleDeleteProps> = Prisma.ArticleGetPayload<T>;

// Multiple mutations
export type ArticleCreateManyResponse = { count: number };
export type ArticleUpdateManyResponse = { count: number };
export type ArticleDeleteManyResponse = { count: number };

// Single queries
export type ArticleFindFirstResponse<T extends ArticleFindFirstProps> = Prisma.ArticleGetPayload<T> | null;
export type ArticleFindUniqueResponse<T extends ArticleFindUniqueProps> = Prisma.ArticleGetPayload<T> | null;
export type ArticleFindManyResponse<T extends ArticleFindManyProps> = Prisma.ArticleGetPayload<T>[];

// Aggregate queries
export type ArticleCountResponse = ArticleCount;
