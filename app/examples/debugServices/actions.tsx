"use server";

import {
    ArticleCreateAction,
    ArticleDeleteAction,
    ArticleFindUniqueAction,
    ArticleUpdateAction,
} from "@actions/ArticleAction";
import { UserDeleteAction } from "@actions/UserAction";
import { revalidatePath } from "next/cache";

export const handleAdd = async () => {
    const check = await ArticleFindUniqueAction({ where: { id: "test-id" } });

    if (check) {
        console.log("Article with ID 'test-id' already exists.");
        return;
    }

    const response = await ArticleCreateAction({
        data: {
            id: "test-id",
            title: "Test Title",
            slug: "test-title",
            Author: { create: { name: "Test", email: "test@example.com", emailVerified: true } },
            Content: { create: { content: "Test content", image: "/images/illustrations/IbfC88l5u8c.webp" } },
        },
        include: { Author: true, Content: true },
    });

    revalidatePath("/examples/debugServices");

    return response;
};

export const handleUpdate = async () => {
    const check = await ArticleFindUniqueAction({ where: { id: "test-id" } });

    if (!check) {
        console.log("Article with ID 'test-id' does not exist.");
        return;
    }

    if (check.title === "Updated Title") {
        console.log("Article already has the updated title.");
        return;
    }

    const response = await ArticleUpdateAction({
        data: {
            title: "Updated Title",
            slug: "updated-title",
        },
        where: { id: "test-id" },
    });

    revalidatePath("/examples/debugServices");

    return response;
};

export const handleDelete = async () => {
    const check = await ArticleFindUniqueAction({ where: { id: "test-id" } });

    if (!check) {
        console.log("Article with ID 'test-id' does not exist.");
        return;
    }

    const articleResponse = await ArticleDeleteAction({
        where: { id: "test-id" },
    });

    const userResponse = await UserDeleteAction({ where: { email: "test@example.com" } });

    revalidatePath("/examples/debugServices");

    return { articleResponse, userResponse };
};
