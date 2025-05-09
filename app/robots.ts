import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/", "/profile/", "/checkout/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
