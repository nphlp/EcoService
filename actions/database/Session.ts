"use server";

import Prisma from "@lib/prisma";
import {
    SessionId,
    SessionCommon,
    SessionType,
    sessionCommonSchema,
    sessionUpdateSchema,
    sessionIdObjectSchema,
    SessionUpdate,
} from "@actions/types/Session";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new session in the database
 * @param props - The session properties to create
 * @returns Promise resolving to the created session or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateSession = async (
    props: SessionCommon
): Promise<SessionType | null> => {
    try {
        const data = sessionCommonSchema.parse(props);

        const sessionData: SessionType = await Prisma.session.create({ data });

        return sessionData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateSession -> ", error);
            return null;
        }
        throw new Error("CreateSession -> " + (error as Error).message);
    }
};

/**
 * Retrieves a session by its ID
 * @param props - Object containing the session ID
 * @returns Promise resolving to the found session or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectSession = async (props: {
    id: SessionId;
}): Promise<SessionType | null> => {
    try {
        const { id } = sessionIdObjectSchema.parse(props);

        const sessionData: SessionType | null = await Prisma.session.findUnique({
            where: { id },
        });

        return sessionData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectSession -> ", error);
            return null;
        }
        throw new Error("SelectSession -> " + (error as Error).message);
    }
};

/**
 * Retrieves all sessions from the database
 * @returns Promise resolving to an array of sessions or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectSessionList = async (): Promise<SessionType[] | null> => {
    try {
        const sessionDataList: SessionType[] = await Prisma.session.findMany();

        return sessionDataList.length ? sessionDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectSessionList -> ", error);
            return null;
        }
        throw new Error("SelectSessionList -> " + (error as Error).message);
    }
};

/**
 * Updates a session's information in the database
 * @param props - Object containing the session ID and updated data
 * @returns Promise resolving to the updated session or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateSession = async (
    props: SessionUpdate
): Promise<SessionType | null> => {
    try {
        const { id, data } = sessionUpdateSchema.parse(props);

        const sessionData: SessionType = await Prisma.session.update({
            where: { id },
            data,
        });

        return sessionData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateSession -> ", error);
            return null;
        }
        throw new Error("UpdateSession -> " + (error as Error).message);
    }
};

/**
 * Deletes a session from the database
 * @param props - Object containing the session ID to delete
 * @returns Promise resolving to the deleted session or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteSession = async (props: {
    id: SessionId;
}): Promise<SessionType | null> => {
    try {
        const { id } = sessionIdObjectSchema.parse(props);

        const sessionData: SessionType = await Prisma.session.delete({
            where: { id },
        });

        return sessionData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteSession -> ", error);
            return null;
        }
        throw new Error("DeleteSession -> " + (error as Error).message);
    }
};
