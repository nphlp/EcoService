import { describe, expect, it, vi } from "vitest";
import { FetchV2 } from "@utils/FetchV2/FetchV2";

// Mock fetch
global.fetch = vi.fn(
    async () =>
        new Response(JSON.stringify(apiResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }),
);

// Mock api response
const apiResponse = {
    data: [{ name: "Produit test", Vendor: { email: "test@email.com" } }],
    error: null,
};

describe("API /product", () => {
    it("retourne la liste des produits", async () => {
        // Fetch products
        const produits = await FetchV2({
            route: "/product",
            params: {
                select: {
                    name: true,
                    Vendor: {
                        select: {
                            email: true,
                        },
                    },
                },
            },
        });

        // Check products
        expect(produits).toBeDefined();
        expect(Array.isArray(produits)).toBe(true);
        expect(produits[0]).toHaveProperty("name");
        expect(produits[0]).toHaveProperty("Vendor");
        expect(produits[0].Vendor).toHaveProperty("email");
    });
});
