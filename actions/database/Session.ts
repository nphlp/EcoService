"use server";

import {
    SelectSessionAmountProps,
    selectSessionAmountSchema,
    SelectSessionListProps,
    selectSessionListSchema,
    SessionCommon,
    sessionCommonSchema,
    SessionId,
    sessionIdObjectSchema,
    SessionType,
    SessionUpdate,
    sessionUpdateSchema,
} from "@actions/types/Session";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new session
 * @param props Session properties
 * @returns Created session or null
 */
export const CreateSession = async (
    props: SessionCommon
): Promise<SessionType | null> => {
    try {
        const data = sessionCommonSchema.parse(props);

        const sessionData: SessionType = await PrismaInstance.session.create({ data });

        return sessionData;
    } catch (error) {
        console.error("CreateSession -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a session by ID
 * @param props Session ID
 * @returns Found session or null
 */
export const SelectSession = async (props: SessionId): Promise<SessionType | null> => {
    try {
        const { id } = sessionIdObjectSchema.parse(props);

        const sessionData: SessionType | null = await PrismaInstance.session.findUnique({
            where: { id },
        });

        return sessionData;
    } catch (error) {
        console.error("SelectSession -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of sessions with filters
 * @param props Filter and pagination options
 * @returns List of sessions or null
 */
export const SelectSessionList = async (
    props: SelectSessionListProps
): Promise<SessionType[] | null> => {
    try {
        const {
            orderBy,
            take = 10,
            skip = 0,
            where,
        } = selectSessionListSchema.parse(props);

        const sessionDataList: SessionType[] = await PrismaInstance.session.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return sessionDataList.length ? sessionDataList : null;
    } catch (error) {
        console.error("SelectSessionList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts sessions with filters
 * @param props Filter options
 * @returns Count of sessions or null
 */
export const SelectSessionAmount = async (
    props: SelectSessionAmountProps
): Promise<number | null> => {
    try {
        const { where } = selectSessionAmountSchema.parse(props);

        const sessionAmount = await PrismaInstance.session.count({
            ...(where && { where }),
        });

        return sessionAmount;
    } catch (error) {
        console.error("SelectSessionAmount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates a session
 * @param props Session ID and new data
 * @returns Updated session or null
 */
export const UpdateSession = async (
    props: SessionUpdate
): Promise<SessionType | null> => {
    try {
        const { id, data } = sessionUpdateSchema.parse(props);

        const sessionData: SessionType = await PrismaInstance.session.update({
            where: { id },
            data,
        });

        return sessionData;
    } catch (error) {
        console.error("UpdateSession -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes a session
 * @param props Session ID
 * @returns Deleted session or null
 */
export const DeleteSession = async (props: SessionId): Promise<SessionType | null> => {
    try {
        const { id } = sessionIdObjectSchema.parse(props);

        const sessionData: SessionType = await PrismaInstance.session.delete({
            where: { id },
        });

        return sessionData;
    } catch (error) {
        console.error("DeleteSession -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
