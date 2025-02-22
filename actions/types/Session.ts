import { Prisma, Session } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Session Types ==== //
// ======================= //

/** Represents a complete session entity */
export type SessionType = Session;

/** Represents the session's unique identifier */
export type SessionId = Pick<Session, "id">;

/** Represents common session properties without system-managed fields */
export type SessionCommon = Omit<Session, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a session */
export type SessionUpdate = {
  id: Session["id"];
  data: SessionCommon;
};

/** Represents system-managed timestamp fields */
export type SessionTimestamps = Pick<Session, "createdAt" | "updatedAt">;

/** Find many options for sessions */
export type SelectSessionListProps = Pick<
    Prisma.SessionFindManyArgs,
    "orderBy" | "take" | "skip" | "where"
>;

/** Count options for sessions */
export type SelectSessionAmountProps = Pick<Prisma.SessionCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating session UUID */
export const sessionIdSchema: ZodString = z.string().nanoid();

/** Schema for validating session ID object structure */
export const sessionIdObjectSchema: ZodType<SessionId> = z.object({
    id: z.string().nanoid(),
});

/** Schema for validating common session properties */
export const sessionCommonSchema: ZodType<SessionCommon> = z.object({
    token: z.string(),
    expiresAt: z.date(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    userId: z.string().nanoid(),
});

/** Schema for validating timestamp fields */
export const sessionTimestampsSchema: ZodType<SessionTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

/** Schema for validating session update operations */
export const sessionUpdateSchema: ZodType<SessionUpdate> = z.object({
    id: sessionIdSchema,
    data: sessionCommonSchema,
});

export const selectSessionListSchema: ZodType<SelectSessionListProps> = z.object({
    orderBy: z
        .object({
            // Types to validate
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});

export const selectSessionAmountSchema: ZodType<SelectSessionAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
