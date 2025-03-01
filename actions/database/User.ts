"use server";

import {
    SelectUserAmountProps,
    selectUserAmountSchema,
    SelectUserListProps,
    selectUserListSchema,
    UserCommon,
    userCommonSchema,
    UserId,
    userIdObjectSchema,
    UserType,
    UserUpdate,
    userUpdateSchema,
} from "@actions/types/User";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new user
 * @param props User properties
 * @returns Created user or null
 */
export const CreateUser = async (props: UserCommon): Promise<UserType | null> => {
    try {
        const data = userCommonSchema.parse(props);

        const userData: UserType = await PrismaInstance.user.create({ data });

        return userData;
    } catch (error) {
        console.error("CreateUser -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a user by ID
 * @param props User ID
 * @returns Found user or null
 */
export const SelectUser = async (props: UserId): Promise<UserType | null> => {
    try {
        const { id } = userIdObjectSchema.parse(props);

        const userData: UserType | null = await PrismaInstance.user.findUnique({
            where: { id },
        });

        return userData;
    } catch (error) {
        console.error("SelectUser -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of users with filters
 * @param props Filter and pagination options
 * @returns List of users or null
 */
export const SelectUserList = async (props: SelectUserListProps): Promise<UserType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectUserListSchema.parse(props);

        const userDataList: UserType[] = await PrismaInstance.user.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return userDataList.length ? userDataList : null;
    } catch (error) {
        console.error("SelectUserList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts users with filters
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
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates a user
 * @param props User ID and new data
 * @returns Updated user or null
 */
export const UpdateUser = async (props: UserUpdate): Promise<UserType | null> => {
    try {
        const { id, data } = userUpdateSchema.parse(props);

        const userData: UserType = await PrismaInstance.user.update({
            where: { id },
            data,
        });

        return userData;
    } catch (error) {
        console.error("UpdateUser -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes a user
 * @param props User ID
 * @returns Deleted user or null
 */
export const DeleteUser = async (props: UserId): Promise<UserType | null> => {
    try {
        const { id } = userIdObjectSchema.parse(props);

        const userData: UserType = await PrismaInstance.user.delete({
            where: { id },
        });

        return userData;
    } catch (error) {
        console.error("DeleteUser -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
