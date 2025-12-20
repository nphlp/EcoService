import PrismaInstance from "@lib/prisma";
import { ClearServerBasket } from "@process/basket/ClearServerBasket";
import { describe, expect, it, vi } from "vitest";
import { createUserProductAndOrder, removeUserProductAndOrder } from "./fixtures-mock";

// Mock server-only module
vi.mock("server-only", () => ({}));

// Mock the revalidatePath function
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

// Mock the getSession function
vi.mock("@lib/auth-server", () => ({
    getSession: vi.fn().mockResolvedValue({
        user: {
            id: "user-5",
            role: "USER",
        },
    }),
}));

describe("ClearServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-5",
            productIds: ["product-7", "product-8"],
            orderId: "order-5",
            amountOfProductsToAddInOrder: 2,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Clear server basket", async () => {
        const orderId = await ClearServerBasket({ orderId: "order-5" });

        if (!orderId) throw new Error("ClearServerBasket -> Return null");

        const order = await PrismaInstance.order.findFirst({
            where: { id: orderId },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(order).toBeDefined();
        expect(order).toBeNull();
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-5",
            productIds: ["product-7", "product-8"],
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });
});
