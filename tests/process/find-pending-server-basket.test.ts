import { FindPendingServerBasket } from "@process/basket/FindPendingServerBasket";
import { describe, expect, it, vi } from "vitest";
import { createUserProductAndOrder, removeUserProductAndOrder } from "./fixtures-mock";

// Mock the getSession function
vi.mock("@lib/authServer", () => ({
    getSession: vi.fn().mockResolvedValue({
        user: {
            id: "user-1",
            role: "USER",
        },
    }),
}));

describe("FindPendingServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-1",
            productIds: ["product-1"],
            orderId: "order-1",
            amountOfProductsToAddInOrder: 1,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Pending server basket found", async () => {
        const orderId = await FindPendingServerBasket();

        expect(orderId).toBeDefined();
        expect(orderId).toBe("order-1");
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-1",
            productIds: ["product-1"],
            orderId: "order-1",
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });

    it("Pending server basket not found", async () => {
        const orderId = await FindPendingServerBasket();

        expect(orderId).toBeNull();
    });
});
