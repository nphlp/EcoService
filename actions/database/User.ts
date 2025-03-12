"use server";

import {
    UserCommon,
    UserId,
    UserType,
    UserUpdate,
    SelectUserAmountProps,
    SelectUserListProps,
    SelectUserProps,
} from "@actions/types/User";
import {
    selectUserAmountSchema,
    selectUserListSchema,
    selectUserUniqueSchema,
} from "@actions/zod-sensitive/User";
import { userCommonSchema, userIdObjectSchema, userUpdateSchema } from "@actions/zod/User";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for User mutations
 */
export type UserMutationResponse = {
    userData?: UserType;
    error?: string;
};

/**
 * Creates a new user
 * @param props User properties
 * @returns Created user or null
 */
export const CreateUser = async (props: UserCommon): Promise<UserMutationResponse> => {
    try {
        const data = userCommonSchema.parse(props);

        const userData: UserType = await PrismaInstance.user.create({ data });

        return { userData };
    } catch (error) {
        console.error("CreateUser -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateUser -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateUser -> Prisma error -> " + error.message);
            throw new Error("CreateUser -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a user
 * @param props User ID and new data
 * @returns Updated user or null
 */
export const UpdateUser = async (props: UserUpdate): Promise<UserMutationResponse> => {
    try {
        const { id, data } = userUpdateSchema.parse(props);
        const userData: UserType = await PrismaInstance.user.update({
            where: { id },
            data,
        });
        return { userData };
    } catch (error) {
        console.error("UpdateUser -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateUser -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateUser -> Prisma error -> " + error.message);
            throw new Error("UpdateUser -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a user
 * @param props User ID
 * @returns Deleted user or null
 */
export const DeleteUser = async (props: UserId): Promise<UserMutationResponse> => {
    try {
        const { id } = userIdObjectSchema.parse(props);
        const userData: UserType = await PrismaInstance.user.delete({
            where: { id },
        });
        return { userData };
    } catch (error) {
        console.error("DeleteUser -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteUser -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteUser -> Prisma error -> " + error.message);
            throw new Error("DeleteUser -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a user by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props User ID or other filter (name, description...)
 * @returns Found user or null
 */
export const SelectUser = async (props: SelectUserProps): Promise<UserType | null> => {
    try {
        const { where, select } = selectUserUniqueSchema.parse(props);
        const userData: UserType | null = await PrismaInstance.user.findUnique({
            where,
            ...(select && { select }),
        });
        return userData;
    } catch (error) {
        console.error("SelectUser -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectUser -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectUser -> Prisma error -> " + error.message);
            throw new Error("SelectUser -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of users with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of users or null
 */
export const SelectUserList = async (props: SelectUserListProps): Promise<UserType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectUserListSchema.parse(props);

        const userDataList: UserType[] = await PrismaInstance.user.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return userDataList.length ? userDataList : null;
    } catch (error) {
        console.error("SelectUserList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectUserList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectUserList -> Prisma error -> " + error.message);
            throw new Error("SelectUserList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts users with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of users or null
 */
export const SelectUserAmount = async (props: SelectUserAmountProps): Promise<number | null> => {
    try {
        const { where } = selectUserAmountSchema.parse(props);

        const userAmount = await PrismaInstance.user.count({
            ...(where && { where }),
        });

        return userAmount;
    } catch (error) {
        console.error("SelectUserAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectUserAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectUserAmount -> Prisma error -> " + error.message);
            throw new Error("SelectUserAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
