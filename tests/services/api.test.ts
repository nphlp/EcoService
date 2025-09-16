import { Fetch } from "@utils/Fetch";
import { describe, expect, it } from "vitest";

describe("API tests", () => {
    it("User API", async () => {
        // Fetch articles
        const articles = await Fetch({
            route: "/internal/article/findMany",
            params: {
                include: {
                    Author: true,
                },
            },
        });

        // Check articles
        expect(articles).toBeDefined();
        expect(Array.isArray(articles)).toBe(true);
        expect(articles[0]).toHaveProperty("id");
        expect(articles[0]).toHaveProperty("title");
        expect(articles[0]).toHaveProperty("Author");
    });

    it("Product API", async () => {
        // Fetch products
        const products = await Fetch({
            route: "/internal/product/findMany",
            params: {
                include: {
                    Category: true,
                },
            },
        });

        // Check products
        expect(products).toBeDefined();
        expect(Array.isArray(products)).toBe(true);
        expect(products[0]).toHaveProperty("id");
        expect(products[0]).toHaveProperty("name");
        expect(products[0]).toHaveProperty("Category");
    });
});
