"use server";

import Prisma from "@lib/prisma";
import {
    VerificationId,
    VerificationCommon,
    VerificationType,
    verificationCommonSchema,
    verificationUpdateSchema,
    verificationIdObjectSchema,
    VerificationUpdate,
} from "@actions/types/Verification";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Creates a new verification in the database
 * @param props - The verification properties to create
 * @returns Promise resolving to the created verification or null if creation fails
 * @throws Error if an unexpected error occurs
 */
export const CreateVerification = async (
    props: VerificationCommon
): Promise<VerificationType | null> => {
    try {
        const data = verificationCommonSchema.parse(props);

        const verificationData: VerificationType = await Prisma.verification.create({ data });

        return verificationData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("CreateVerification -> ", error);
            return null;
        }
        throw new Error("CreateVerification -> " + (error as Error).message);
    }
};

/**
 * Retrieves a verification by its ID
 * @param props - Object containing the verification ID
 * @returns Promise resolving to the found verification or null if not found
 * @throws Error if an unexpected error occurs
 */
export const SelectVerification = async (props: {
    id: VerificationId;
}): Promise<VerificationType | null> => {
    try {
        const { id } = verificationIdObjectSchema.parse(props);

        const verificationData: VerificationType | null = await Prisma.verification.findUnique({
            where: { id },
        });

        return verificationData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectVerification -> ", error);
            return null;
        }
        throw new Error("SelectVerification -> " + (error as Error).message);
    }
};

/**
 * Retrieves all verifications from the database
 * @returns Promise resolving to an array of verifications or null if none found
 * @throws Error if an unexpected error occurs
 */
export const SelectVerificationList = async (): Promise<VerificationType[] | null> => {
    try {
        const verificationDataList: VerificationType[] = await Prisma.verification.findMany();

        return verificationDataList.length ? verificationDataList : null;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("SelectVerificationList -> ", error);
            return null;
        }
        throw new Error("SelectVerificationList -> " + (error as Error).message);
    }
};

/**
 * Updates a verification's information in the database
 * @param props - Object containing the verification ID and updated data
 * @returns Promise resolving to the updated verification or null if update fails
 * @throws Error if an unexpected error occurs
 */
export const UpdateVerification = async (
    props: VerificationUpdate
): Promise<VerificationType | null> => {
    try {
        const { id, data } = verificationUpdateSchema.parse(props);

        const verificationData: VerificationType = await Prisma.verification.update({
            where: { id },
            data,
        });

        return verificationData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("UpdateVerification -> ", error);
            return null;
        }
        throw new Error("UpdateVerification -> " + (error as Error).message);
    }
};

/**
 * Deletes a verification from the database
 * @param props - Object containing the verification ID to delete
 * @returns Promise resolving to the deleted verification or null if deletion fails
 * @throws Error if an unexpected error occurs
 */
export const DeleteVerification = async (props: {
    id: VerificationId;
}): Promise<VerificationType | null> => {
    try {
        const { id } = verificationIdObjectSchema.parse(props);

        const verificationData: VerificationType = await Prisma.verification.delete({
            where: { id },
        });

        return verificationData;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.log("DeleteVerification -> ", error);
            return null;
        }
        throw new Error("DeleteVerification -> " + (error as Error).message);
    }
};
