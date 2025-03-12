import { CategoryModel, RelatedCategoryModel } from "@actions/zod-generated";
import { Category, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Category's model with relations */
export type CategoryType = z.infer<typeof RelatedCategoryModel>;

/** Represents the Category's unique identifier */
export type CategoryId = Pick<Category, "id">;

/** Represents common Category properties without system-managed fields */
export type CategoryCommon = Omit<Category, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Category */
export type CategoryUpdate = {
    id: Category["id"];
    data: CategoryCommon;
};

/** Represents system-managed timestamp fields */
export type CategoryTimestamps = Pick<Category, "createdAt" | "updatedAt">;

/** Find one options for Categorys */
export type SelectCategoryProps = Pick<Prisma.CategoryFindUniqueArgs, "where" | "select">;

/** Find many options for Categorys */
export type SelectCategoryListProps = Pick<Prisma.CategoryFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Categorys */
export type SelectCategoryAmountProps = Pick<Prisma.CategoryCountArgs, "where">;
