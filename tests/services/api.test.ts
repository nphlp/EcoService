import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { describe, expect, it } from "vitest";

describe("API tests", () => {
    it("User API", async () => {
        // Fetch users
        const users = await FetchV2({
            route: "/user",
            params: {
                include: {
                    Account: true,
                    Address: true,
                },
            },
        });

        // Check users
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users[0]).toHaveProperty("id");
        expect(users[0]).toHaveProperty("email");
        expect(users[0]).toHaveProperty("Account");
        expect(users[0]).toHaveProperty("Address");
    });

    it("Product API", async () => {
        // Fetch products
        const products = await FetchV2({
            route: "/product",
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
