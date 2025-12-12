import { GetServerBasket } from "@process/basket/GetServerBasket";
import { describe, expect, it, vi } from "vitest";
import { createUserProductAndOrder, removeUserProductAndOrder } from "./fixtures-mock";

// Mock the getSession function
vi.mock("@lib/authServer", () => ({
    getSession: vi.fn().mockResolvedValue({
        user: {
            id: "user-7",
            role: "USER",
        },
    }),
}));

describe("GetServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-7",
            productIds: ["product-13", "product-14"],
            orderId: "order-7",
            amountOfProductsToAddInOrder: 2,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Get server basket", async () => {
        const serverBasket = await GetServerBasket({ orderId: "order-7" });

        expect(serverBasket).toBeDefined();
        expect(serverBasket?.orderId).toBe("order-7");
        expect(serverBasket?.paymentStatus).toBe("PENDING");
        expect(serverBasket?.orderStatus).toBe("PENDING");
        expect(serverBasket?.items.length).toBe(2);
        expect(serverBasket?.items).toContainEqual(expect.objectContaining({ productId: "product-13", quantity: 1 }));
        expect(serverBasket?.items).toContainEqual(expect.objectContaining({ productId: "product-14", quantity: 1 }));
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-7",
            productIds: ["product-13", "product-14"],
            orderId: "order-7",
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });

    it("Server basket not found", async () => {
        const serverBasket = await GetServerBasket({ orderId: "order-8" });

        expect(serverBasket).toBeNull();
    });
});
