import { ArticleModel, RelatedArticleModel } from "@actions/zod-generated";
import { Article, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Article's model with relations */
export type ArticleType = z.infer<typeof RelatedArticleModel>;

/** Represents the Article's unique identifier */
export type ArticleId = Pick<Article, "id">;

/** Represents common Article properties without system-managed fields */
export type ArticleCommon = Omit<Article, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Article */
export type ArticleUpdate = {
    id: Article["id"];
    data: ArticleCommon;
};

/** Represents system-managed timestamp fields */
export type ArticleTimestamps = Pick<Article, "createdAt" | "updatedAt">;

/** Find one options for Articles */
export type SelectArticleProps = Pick<Prisma.ArticleFindUniqueArgs, "where" | "select">;

/** Find many options for Articles */
export type SelectArticleListProps = Pick<Prisma.ArticleFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Articles */
export type SelectArticleAmountProps = Pick<Prisma.ArticleCountArgs, "where">;
