import { SessionModel, RelatedSessionModel } from "@actions/zod-generated";
import { Session, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Session's model with relations */
export type SessionType = z.infer<typeof RelatedSessionModel>;

/** Represents the Session's unique identifier */
export type SessionId = Pick<Session, "id">;

/** Represents common Session properties without system-managed fields */
export type SessionCommon = Omit<Session, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Session */
export type SessionUpdate = {
    id: Session["id"];
    data: SessionCommon;
};

/** Represents system-managed timestamp fields */
export type SessionTimestamps = Pick<Session, "createdAt" | "updatedAt">;

/** Find one options for Sessions */
export type SelectSessionProps = Pick<Prisma.SessionFindUniqueArgs, "where" | "select">;

/** Find many options for Sessions */
export type SelectSessionListProps = Pick<Prisma.SessionFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Sessions */
export type SelectSessionAmountProps = Pick<Prisma.SessionCountArgs, "where">;
