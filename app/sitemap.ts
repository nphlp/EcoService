import PrismaInstance from "@lib/prisma";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const productIdList = await PrismaInstance.product.findMany({
        select: { id: true, updatedAt: true },
        take: 100,
        // TODO: Get only the top 100 products
    });

    const categoryIdList = await PrismaInstance.category.findMany({
        select: { id: true, updatedAt: true },
        take: 100,
        // TODO: Get only the top 100 categories
    });

    const articleIdList = await PrismaInstance.article.findMany({
        select: { id: true, updatedAt: true },
        take: 100,
        // TODO: Get only the top 100 articles
    });

    return [
        // Home page
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        // Catalogue page
        {
            url: `${baseUrl}/catalogue`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        // Catalogue page with category filters
        ...categoryIdList.map((category) => ({
            url: `${baseUrl}/catalog?category=${category.id}`,
            lastModified: new Date(category.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
        // Product pages
        ...productIdList.map((product) => ({
            url: `${baseUrl}/product/${product.id}`,
            lastModified: new Date(product.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        // Article list page
        {
            url: `${baseUrl}/article`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        // Individual article pages
        ...articleIdList.map((article) => ({
            url: `${baseUrl}/article/${article.id}`,
            lastModified: new Date(article.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];
}
