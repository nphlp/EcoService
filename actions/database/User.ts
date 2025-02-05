"use server";

import Prisma from "@lib/prisma";
import {
    UserId,
    UserCommon,
    UserType,
    userCommonSchema,
    userUpdateSchema,
    userIdObjectSchema,
    UserUpdate,
} from "@actions/types/User";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new user in the database
 * @param props - The user properties to create
 * @returns Promise resolving to the created user or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateUser = async (
    props: UserCommon
): Promise<UserType | null> => {
    try {
        const data = userCommonSchema.parse(props);

        const userData: UserType = await Prisma.user.create({ data });

        return userData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateUser -> ", error);
            return null;
        }
        throw new Error("CreateUser -> " + (error as Error).message);
    }
};

/**
 * Retrieves a user by their ID
 * @param props - Object containing the user ID
 * @returns Promise resolving to the found user or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectUser = async (props: {
    id: UserId;
}): Promise<UserType | null> => {
    try {
        const { id } = userIdObjectSchema.parse(props);

        const userData: UserType | null = await Prisma.user.findUnique({
            where: { id },
        });

        return userData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectUserById -> ", error);
            return null;
        }
        throw new Error("SelectUserById -> " + (error as Error).message);
    }
};

/**
 * Retrieves all users from the database
 * @returns Promise resolving to an array of users or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectUserList = async (): Promise<UserType[] | null> => {
    try {
        const userDataList: UserType[] = await Prisma.user.findMany();

        return userDataList.length ? userDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectUserList -> ", error);
            return null;
        }
        throw new Error("SelectUserList -> " + (error as Error).message);
    }
};

/**
 * Updates a user's information in the database
 * @param props - Object containing the user ID and updated data
 * @returns Promise resolving to the updated user or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateUser = async (
    props: UserUpdate
): Promise<UserType | null> => {
    try {
        const { id, data } = userUpdateSchema.parse(props);

        const userData: UserType = await Prisma.user.update({
            where: { id },
            data,
        });

        return userData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateUser -> ", error);
            return null;
        }
        throw new Error("UpdateUser -> " + (error as Error).message);
    }
};

/**
 * Deletes a user from the database
 * @param props - Object containing the user ID to delete
 * @returns Promise resolving to the deleted user or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteUser = async (props: {
    id: UserId;
}): Promise<UserType | null> => {
    try {
        const { id } = userIdObjectSchema.parse(props);

        const userData: UserType = await Prisma.user.delete({
            where: { id },
        });

        return userData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteUser -> ", error);
            return null;
        }
        throw new Error("DeleteUser -> " + (error as Error).message);
    }
};
