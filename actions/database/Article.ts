"use server";

import {
    ArticleCommon,
    ArticleId,
    ArticleType,
    ArticleUpdate,
    SelectArticleAmountProps,
    SelectArticleListProps,
    SelectArticleProps,
} from "@actions/types/Article";
import {
    selectArticleAmountSchema,
    selectArticleListSchema,
    selectArticleUniqueSchema,
} from "@actions/zod-sensitive/Article";
import { articleCommonSchema, articleIdObjectSchema, articleUpdateSchema } from "@actions/zod/Article";
import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

/**
 * Response type for Article mutations
 */
export type ArticleMutationResponse = {
    articleData?: ArticleType;
    error?: string;
};

/**
 * Creates a new article
 * @param props Article properties
 * @returns Created article or null
 */
export const CreateArticle = async (props: ArticleCommon): Promise<ArticleMutationResponse> => {
    try {
        const data = articleCommonSchema.parse(props);

        const articleData: ArticleType = await PrismaInstance.article.create({ data });

        return { articleData };
    } catch (error) {
        console.error("CreateArticle -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("CreateArticle -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("CreateArticle -> Prisma error -> " + error.message);
            throw new Error("CreateArticle -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Updates a article
 * @param props Article ID and new data
 * @returns Updated article or null
 */
export const UpdateArticle = async (props: ArticleUpdate): Promise<ArticleMutationResponse> => {
    try {
        const { id, data } = articleUpdateSchema.parse(props);
        const articleData: ArticleType = await PrismaInstance.article.update({
            where: { id },
            data,
        });
        return { articleData };
    } catch (error) {
        console.error("UpdateArticle -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("UpdateArticle -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("UpdateArticle -> Prisma error -> " + error.message);
            throw new Error("UpdateArticle -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Deletes a article
 * @param props Article ID
 * @returns Deleted article or null
 */
export const DeleteArticle = async (props: ArticleId): Promise<ArticleMutationResponse> => {
    try {
        const { id } = articleIdObjectSchema.parse(props);
        const articleData: ArticleType = await PrismaInstance.article.delete({
            where: { id },
        });
        return { articleData };
    } catch (error) {
        console.error("DeleteArticle -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("DeleteArticle -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("DeleteArticle -> Prisma error -> " + error.message);
            throw new Error("DeleteArticle -> " + (error as Error).message);
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
};

/**
 * Retrieves a article by ID or another filter (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Article ID or other filter (name, description...)
 * @returns Found article or null
 */
export const SelectArticle = async (props: SelectArticleProps): Promise<ArticleType | null> => {
    try {
        const { where, select } = selectArticleUniqueSchema.parse(props);
        const articleData: ArticleType | null = await PrismaInstance.article.findUnique({
            where,
            ...(select && { select }),
        });
        return articleData;
    } catch (error) {
        console.error("SelectArticle -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectArticle -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectArticle -> Prisma error -> " + error.message);
            throw new Error("SelectArticle -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Retrieves a list of articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter and pagination options
 * @returns List of articles or null
 */
export const SelectArticleList = async (props: SelectArticleListProps): Promise<ArticleType[] | null> => {
    try {
        const { select, orderBy, take = 10, skip = 0, where } = selectArticleListSchema.parse(props);

        const articleDataList: ArticleType[] = await PrismaInstance.article.findMany({
            ...(select && { select }),
            ...(orderBy && { orderBy }),
            ...(take && { take }),
            ...(skip && { skip }),
            ...(where && { where }),
        });
        return articleDataList.length ? articleDataList : null;
    } catch (error) {
        console.error("SelectArticleList -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectArticleList -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectArticleList -> Prisma error -> " + error.message);
            throw new Error("SelectArticleList -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};

/**
 * Counts articles with filters (no caching) \
 * WARNING: do not use this for fetching data -> use API routes with caching instead
 * @param props Filter options
 * @returns Count of articles or null
 */
export const SelectArticleAmount = async (props: SelectArticleAmountProps): Promise<number | null> => {
    try {
        const { where } = selectArticleAmountSchema.parse(props);

        const articleAmount = await PrismaInstance.article.count({
            ...(where && { where }),
        });

        return articleAmount;
    } catch (error) {
        console.error("SelectArticleAmount -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError) throw new Error("SelectArticleAmount -> Invalid Zod params -> " + error.message);
            if (error instanceof PrismaClientKnownRequestError)
                throw new Error("SelectArticleAmount -> Prisma error -> " + error.message);
            throw new Error("SelectArticleAmount -> " + (error as Error).message);
        }
        // TODO: add logging
        return null;
    }
};
