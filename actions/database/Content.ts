"use server";

import {
    ContentCommon,
    ContentId,
    ContentType,
    ContentUpdate,
    SelectContentAmountProps,
    SelectContentListProps,
    SelectContentProps,
} from "@actions/types/Content";
import {
    selectContentAmountSchema,
    selectContentListSchema,
    selectContentUniqueSchema,
} from "@actions/zod-sensitive/Content";
import { contentCommonSchema, contentIdObjectSchema, contentUpdateSchema } from "@actions/zod/Content";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Content mutations
 */
export type ContentMutationResponse = {
    contentData?: ContentType;
    error?: string;
};

/**
 * Creates a new content
 * @param props Content properties
 * @returns Created content or null
 */
export const CreateContent = async (props: ContentCommon): Promise<ContentMutationResponse> => {
    try {
        const data = contentCommonSchema.parse(props);

        const contentData: ContentType = await PrismaInstance.content.create({ data });

        return { contentData };
    } catch (error) {
        console.error("CreateContent -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateContent -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateContent -> Prisma error -> " + error.message);
            throw new Error("CreateContent -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a content
 * @param props Content ID and new data
 * @returns Updated content or null
 */
export const UpdateContent = async (props: ContentUpdate): Promise<ContentMutationResponse> => {
    try {
        const { id, data } = contentUpdateSchema.parse(props);
        const contentData: ContentType = await PrismaInstance.content.update({
            where: { id },
            data,
        });
        return { contentData };
    } catch (error) {
        console.error("UpdateContent -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateContent -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateContent -> Prisma error -> " + error.message);
            throw new Error("UpdateContent -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a content
 * @param props Content ID
 * @returns Deleted content or null
 */
export const DeleteContent = async (props: ContentId): Promise<ContentMutationResponse> => {
    try {
        const { id } = contentIdObjectSchema.parse(props);
        const contentData: ContentType = await PrismaInstance.content.delete({
            where: { id },
        });
        return { contentData };
    } catch (error) {
        console.error("DeleteContent -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteContent -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteContent -> Prisma error -> " + error.message);
            throw new Error("DeleteContent -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a content by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Content ID or other filter (name, description...)
 * @returns Found content or null
 */
export const SelectContent = async (props: SelectContentProps): Promise<ContentType | null> => {
    try {
        const { where, select } = selectContentUniqueSchema.parse(props);
        const contentData: ContentType | null = await PrismaInstance.content.findUnique({
            where,
            ...(select && { select }),
        });
        return contentData;
    } catch (error) {
        console.error("SelectContent -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectContent -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectContent -> Prisma error -> " + error.message);
            throw new Error("SelectContent -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of contents with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of contents or null
 */
export const SelectContentList = async (props: SelectContentListProps): Promise<ContentType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectContentListSchema.parse(props);

        const contentDataList: ContentType[] = await PrismaInstance.content.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return contentDataList.length ? contentDataList : null;
    } catch (error) {
        console.error("SelectContentList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectContentList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectContentList -> Prisma error -> " + error.message);
            throw new Error("SelectContentList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts contents with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of contents or null
 */
export const SelectContentAmount = async (props: SelectContentAmountProps): Promise<number | null> => {
    try {
        const { where } = selectContentAmountSchema.parse(props);

        const contentAmount = await PrismaInstance.content.count({
            ...(where && { where }),
        });

        return contentAmount;
    } catch (error) {
        console.error("SelectContentAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectContentAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectContentAmount -> Prisma error -> " + error.message);
            throw new Error("SelectContentAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
