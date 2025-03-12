import { ContentModel, RelatedContentModel } from "@actions/zod-generated";
import { Content, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Content's model with relations */
export type ContentType = z.infer<typeof RelatedContentModel>;

/** Represents the Content's unique identifier */
export type ContentId = Pick<Content, "id">;

/** Represents common Content properties without system-managed fields */
export type ContentCommon = Omit<Content, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Content */
export type ContentUpdate = {
    id: Content["id"];
    data: ContentCommon;
};

/** Represents system-managed timestamp fields */
export type ContentTimestamps = Pick<Content, "createdAt" | "updatedAt">;

/** Find one options for Contents */
export type SelectContentProps = Pick<Prisma.ContentFindUniqueArgs, "where" | "select">;

/** Find many options for Contents */
export type SelectContentListProps = Pick<Prisma.ContentFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Contents */
export type SelectContentAmountProps = Pick<Prisma.ContentCountArgs, "where">;
