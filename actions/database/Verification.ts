"use server";

import {
    VerificationCommon,
    VerificationId,
    VerificationType,
    VerificationUpdate,
    SelectVerificationAmountProps,
    SelectVerificationListProps,
    SelectVerificationProps,
} from "@actions/types/Verification";
import {
    selectVerificationAmountSchema,
    selectVerificationListSchema,
    selectVerificationUniqueSchema,
} from "@actions/zod-sensitive/Verification";
import { verificationCommonSchema, verificationIdObjectSchema, verificationUpdateSchema } from "@actions/zod/Verification";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Verification mutations
 */
export type VerificationMutationResponse = {
    verificationData?: VerificationType;
    error?: string;
};

/**
 * Creates a new verification
 * @param props Verification properties
 * @returns Created verification or null
 */
export const CreateVerification = async (props: VerificationCommon): Promise<VerificationMutationResponse> => {
    try {
        const data = verificationCommonSchema.parse(props);

        const verificationData: VerificationType = await PrismaInstance.verification.create({ data });

        return { verificationData };
    } catch (error) {
        console.error("CreateVerification -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateVerification -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateVerification -> Prisma error -> " + error.message);
            throw new Error("CreateVerification -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a verification
 * @param props Verification ID and new data
 * @returns Updated verification or null
 */
export const UpdateVerification = async (props: VerificationUpdate): Promise<VerificationMutationResponse> => {
    try {
        const { id, data } = verificationUpdateSchema.parse(props);
        const verificationData: VerificationType = await PrismaInstance.verification.update({
            where: { id },
            data,
        });
        return { verificationData };
    } catch (error) {
        console.error("UpdateVerification -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateVerification -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateVerification -> Prisma error -> " + error.message);
            throw new Error("UpdateVerification -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a verification
 * @param props Verification ID
 * @returns Deleted verification or null
 */
export const DeleteVerification = async (props: VerificationId): Promise<VerificationMutationResponse> => {
    try {
        const { id } = verificationIdObjectSchema.parse(props);
        const verificationData: VerificationType = await PrismaInstance.verification.delete({
            where: { id },
        });
        return { verificationData };
    } catch (error) {
        console.error("DeleteVerification -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteVerification -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteVerification -> Prisma error -> " + error.message);
            throw new Error("DeleteVerification -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a verification by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Verification ID or other filter (name, description...)
 * @returns Found verification or null
 */
export const SelectVerification = async (props: SelectVerificationProps): Promise<VerificationType | null> => {
    try {
        const { where, select } = selectVerificationUniqueSchema.parse(props);
        const verificationData: VerificationType | null = await PrismaInstance.verification.findUnique({
            where,
            ...(select && { select }),
        });
        return verificationData;
    } catch (error) {
        console.error("SelectVerification -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectVerification -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectVerification -> Prisma error -> " + error.message);
            throw new Error("SelectVerification -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of verifications with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of verifications or null
 */
export const SelectVerificationList = async (props: SelectVerificationListProps): Promise<VerificationType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectVerificationListSchema.parse(props);

        const verificationDataList: VerificationType[] = await PrismaInstance.verification.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return verificationDataList.length ? verificationDataList : null;
    } catch (error) {
        console.error("SelectVerificationList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectVerificationList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectVerificationList -> Prisma error -> " + error.message);
            throw new Error("SelectVerificationList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts verifications with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
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
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectVerificationAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectVerificationAmount -> Prisma error -> " + error.message);
            throw new Error("SelectVerificationAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
