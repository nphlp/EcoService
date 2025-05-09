import { FetchV2 } from "@utils/FetchV2/FetchV2";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const productIdList = await FetchV2({
        route: "/product",
        params: {
            select: { id: true, updatedAt: true },
            limit: 100,
            // TODO: Get only the top 100 products
        },
    });

    const categoryIdList = await FetchV2({
        route: "/category",
        params: {
            select: { id: true, updatedAt: true },
            limit: 100,
            // TODO: Get only the top 100 categories
        },
    });

    const articleIdList = await FetchV2({
        route: "/article",
        params: {
            select: { id: true, updatedAt: true },
            limit: 100,
            // TODO: Get only the top 100 articles
        },
    });

    const diyIdList = await FetchV2({
        route: "/diy",
        params: {
            select: { id: true, updatedAt: true },
            limit: 100,
        },
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
        // DIY list page
        {
            url: `${baseUrl}/diy`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
        },
        // Individual DIY pages
        ...diyIdList.map((diy) => ({
            url: `${baseUrl}/diy/${diy.id}`,
            lastModified: new Date(diy.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];
}
