import { DoItYourselfModel, RelatedDoItYourselfModel } from "@actions/zod-generated";
import { DoItYourself, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the DoItYourself's model with relations */
export type DoItYourselfType = z.infer<typeof RelatedDoItYourselfModel>;

/** Represents the DoItYourself's unique identifier */
export type DoItYourselfId = Pick<DoItYourself, "id">;

/** Represents common DoItYourself properties without system-managed fields */
export type DoItYourselfCommon = Omit<DoItYourself, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a DoItYourself */
export type DoItYourselfUpdate = {
    id: DoItYourself["id"];
    data: DoItYourselfCommon;
};

/** Represents system-managed timestamp fields */
export type DoItYourselfTimestamps = Pick<DoItYourself, "createdAt" | "updatedAt">;

/** Find one options for DoItYourselfs */
export type SelectDoItYourselfProps = Pick<Prisma.DoItYourselfFindUniqueArgs, "where" | "select">;

/** Find many options for DoItYourselfs */
export type SelectDoItYourselfListProps = Pick<Prisma.DoItYourselfFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for DoItYourselfs */
export type SelectDoItYourselfAmountProps = Pick<Prisma.DoItYourselfCountArgs, "where">;
