import { ProductFindManyAction } from "@services/actions/ProductAction";
import { UserFindManyAction } from "@services/actions/UserAction";
import { describe, expect, it } from "vitest";

describe("Actions tests", () => {
    it("User actions", async () => {
        // Fetch users
        const users = await UserFindManyAction(
            {
                include: {
                    Account: true,
                    Address: true,
                },
            },
            true, // Disable safe message
        );

        // Check users
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users[0]).toHaveProperty("id");
        expect(users[0]).toHaveProperty("email");
        expect(users[0]).toHaveProperty("Account");
        expect(users[0]).toHaveProperty("Address");
    });

    it("Product actions", async () => {
        // Fetch products
        const products = await ProductFindManyAction(
            {
                include: {
                    Category: true,
                },
            },
            true, // Disable safe message
        );

        // Check products
        expect(products).toBeDefined();
        expect(Array.isArray(products)).toBe(true);
        expect(products[0]).toHaveProperty("id");
        expect(products[0]).toHaveProperty("name");
        expect(products[0]).toHaveProperty("Category");
    });
});
