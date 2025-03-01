"use server";

import {
    SelectVerificationAmountProps,
    selectVerificationAmountSchema,
    SelectVerificationListProps,
    selectVerificationListSchema,
    VerificationCommon,
    verificationCommonSchema,
    VerificationId,
    verificationIdObjectSchema,
    VerificationType,
    VerificationUpdate,
    verificationUpdateSchema,
} from "@actions/types/Verification";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Creates a new verification
 * @param props Verification properties
 * @returns Created verification or null
 */
export const CreateVerification = async (props: VerificationCommon): Promise<VerificationType | null> => {
    try {
        const data = verificationCommonSchema.parse(props);

        const verificationData: VerificationType = await PrismaInstance.verification.create({ data });

        return verificationData;
    } catch (error) {
        console.error("CreateVerification -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a verification by ID
 * @param props Verification ID
 * @returns Found verification or null
 */
export const SelectVerification = async (props: VerificationId): Promise<VerificationType | null> => {
    try {
        const { id } = verificationIdObjectSchema.parse(props);

        const verificationData: VerificationType | null = await PrismaInstance.verification.findUnique({
            where: { id },
        });

        return verificationData;
    } catch (error) {
        console.error("SelectVerification -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Retrieves a list of verifications with filters
 * @param props Filter and pagination options
 * @returns List of verifications or null
 */
export const SelectVerificationList = async (
    props: SelectVerificationListProps,
): Promise<VerificationType[] | null> => {
    try {
        const { orderBy, take = 10, skip = 0, where } = selectVerificationListSchema.parse(props);

        const verificationDataList: VerificationType[] = await PrismaInstance.verification.findMany({
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });

        return verificationDataList.length ? verificationDataList : null;
    } catch (error) {
        console.error("SelectVerificationList -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Counts verifications with filters
 * @param props Filter options
 * @returns Count of verifications or null
 */
export const SelectVerificationAmount = async (props: SelectVerificationAmountProps): Promise<number | null> => {
    try {
        const { where } = selectVerificationAmountSchema.parse(props);

        const verificationAmount = await PrismaInstance.verification.count({
            ...(where && { where }),
        });

        return verificationAmount;
    } catch (error) {
        console.error("SelectVerificationAmount -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Updates a verification
 * @param props Verification ID and new data
 * @returns Updated verification or null
 */
export const UpdateVerification = async (props: VerificationUpdate): Promise<VerificationType | null> => {
    try {
        const { id, data } = verificationUpdateSchema.parse(props);

        const verificationData: VerificationType = await PrismaInstance.verification.update({
            where: { id },
            data,
        });

        return verificationData;
    } catch (error) {
        console.error("UpdateVerification -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};

/**
 * Deletes a verification
 * @param props Verification ID
 * @returns Deleted verification or null
 */
export const DeleteVerification = async (props: VerificationId): Promise<VerificationType | null> => {
    try {
        const { id } = verificationIdObjectSchema.parse(props);

        const verificationData: VerificationType = await PrismaInstance.verification.delete({
            where: { id },
        });

        return verificationData;
    } catch (error) {
        console.error("DeleteVerification -> " + (error as Error).message);
        if (error instanceof ZodError || error instanceof PrismaClientKnownRequestError) {
            return null;
        }
        throw new Error("Something went wrong...");
    }
};
