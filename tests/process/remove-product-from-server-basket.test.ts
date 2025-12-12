import PrismaInstance from "@lib/prisma";
import { RemoveProductFromServerBasket } from "@process/basket/RemoveProductFromServerBasket";
import { describe, expect, it, vi } from "vitest";
import { createUserProductAndOrder, removeUserProductAndOrder } from "./fixtures-mock";

// Mock the revalidatePath function
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

// Mock the getSession function
vi.mock("@lib/authServer", () => ({
    getSession: vi.fn().mockResolvedValue({
        user: {
            id: "user-8",
            role: "USER",
        },
    }),
}));

describe("RemoveProductFromServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-4",
            productIds: ["product-5", "product-6"],
            orderId: "order-4",
            amountOfProductsToAddInOrder: 2,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Remove product from server basket", async () => {
        const orderQuatitiesBefore = await PrismaInstance.order.findUnique({
            where: { id: "order-4" },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(orderQuatitiesBefore).toBeDefined();
        expect(orderQuatitiesBefore?.Quantity.length).toBe(2);

        const orderId = await RemoveProductFromServerBasket({
            orderId: "order-4",
            productId: "product-5",
        });

        if (!orderId) throw new Error("UpdateProductOnServerBasket -> Return null");

        const orderQuatitiesAfter = await PrismaInstance.order.findUnique({
            where: { id: orderId },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(orderQuatitiesAfter).toBeDefined();
        expect(orderQuatitiesAfter?.Quantity.length).toBe(1);
    });

    it("Remove last product and delete server basket", async () => {
        const orderQuatitiesBefore = await PrismaInstance.order.findUnique({
            where: { id: "order-4" },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(orderQuatitiesBefore).toBeDefined();
        expect(orderQuatitiesBefore?.Quantity.length).toBe(1);

        const orderId = await RemoveProductFromServerBasket({
            orderId: "order-4",
            productId: "product-6",
        });

        if (!orderId) throw new Error("UpdateProductOnServerBasket -> Return null");

        const orderQuatitiesAfter = await PrismaInstance.order.findFirst({
            where: { id: orderId },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(orderId).toBeDefined();
        expect(orderId).toBe("order-4");
        expect(orderQuatitiesAfter).toBeNull();
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-4",
            productIds: ["product-5", "product-6"],
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });
});
