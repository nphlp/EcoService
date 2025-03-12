"use server";

import {
    SessionCommon,
    SessionId,
    SessionType,
    SessionUpdate,
    SelectSessionAmountProps,
    SelectSessionListProps,
    SelectSessionProps,
} from "@actions/types/Session";
import {
    selectSessionAmountSchema,
    selectSessionListSchema,
    selectSessionUniqueSchema,
} from "@actions/zod-sensitive/Session";
import { sessionCommonSchema, sessionIdObjectSchema, sessionUpdateSchema } from "@actions/zod/Session";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Session mutations
 */
export type SessionMutationResponse = {
    sessionData?: SessionType;
    error?: string;
};

/**
 * Creates a new session
 * @param props Session properties
 * @returns Created session or null
 */
export const CreateSession = async (props: SessionCommon): Promise<SessionMutationResponse> => {
    try {
        const data = sessionCommonSchema.parse(props);

        const sessionData: SessionType = await PrismaInstance.session.create({ data });

        return { sessionData };
    } catch (error) {
        console.error("CreateSession -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateSession -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateSession -> Prisma error -> " + error.message);
            throw new Error("CreateSession -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a session
 * @param props Session ID and new data
 * @returns Updated session or null
 */
export const UpdateSession = async (props: SessionUpdate): Promise<SessionMutationResponse> => {
    try {
        const { id, data } = sessionUpdateSchema.parse(props);
        const sessionData: SessionType = await PrismaInstance.session.update({
            where: { id },
            data,
        });
        return { sessionData };
    } catch (error) {
        console.error("UpdateSession -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateSession -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateSession -> Prisma error -> " + error.message);
            throw new Error("UpdateSession -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a session
 * @param props Session ID
 * @returns Deleted session or null
 */
export const DeleteSession = async (props: SessionId): Promise<SessionMutationResponse> => {
    try {
        const { id } = sessionIdObjectSchema.parse(props);
        const sessionData: SessionType = await PrismaInstance.session.delete({
            where: { id },
        });
        return { sessionData };
    } catch (error) {
        console.error("DeleteSession -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteSession -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteSession -> Prisma error -> " + error.message);
            throw new Error("DeleteSession -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a session by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Session ID or other filter (name, description...)
 * @returns Found session or null
 */
export const SelectSession = async (props: SelectSessionProps): Promise<SessionType | null> => {
    try {
        const { where, select } = selectSessionUniqueSchema.parse(props);
        const sessionData: SessionType | null = await PrismaInstance.session.findUnique({
            where,
            ...(select && { select }),
        });
        return sessionData;
    } catch (error) {
        console.error("SelectSession -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectSession -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectSession -> Prisma error -> " + error.message);
            throw new Error("SelectSession -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of sessions with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of sessions or null
 */
export const SelectSessionList = async (props: SelectSessionListProps): Promise<SessionType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectSessionListSchema.parse(props);

        const sessionDataList: SessionType[] = await PrismaInstance.session.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return sessionDataList.length ? sessionDataList : null;
    } catch (error) {
        console.error("SelectSessionList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectSessionList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectSessionList -> Prisma error -> " + error.message);
            throw new Error("SelectSessionList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts sessions with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of sessions or null
 */
export const SelectSessionAmount = async (props: SelectSessionAmountProps): Promise<number | null> => {
    try {
        const { where } = selectSessionAmountSchema.parse(props);

        const sessionAmount = await PrismaInstance.session.count({
            ...(where && { where }),
        });

        return sessionAmount;
    } catch (error) {
        console.error("SelectSessionAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectSessionAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectSessionAmount -> Prisma error -> " + error.message);
            throw new Error("SelectSessionAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
