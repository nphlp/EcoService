import PrismaInstance from "@lib/prisma";
import { UpdateProductOnServerBasket } from "@process/basket/UpdateProductOnServerBasket";
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
            id: "user-9",
            role: "USER",
        },
    }),
}));

describe("UpdateProductOnServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-3",
            productIds: ["product-4"],
            orderId: "order-3",
            amountOfProductsToAddInOrder: 1,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Update product on server basket", async () => {
        const orderQuatitiesBefore = await PrismaInstance.order.findUnique({
            where: { id: "order-3" },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        expect(orderQuatitiesBefore).toBeDefined();
        expect(orderQuatitiesBefore?.Quantity.length).toBe(1);
        expect(orderQuatitiesBefore?.Quantity[0].productId).toBe("product-4");
        expect(orderQuatitiesBefore?.Quantity[0].quantity).toBe(1);

        const orderId = await UpdateProductOnServerBasket({
            orderId: "order-3",
            productId: "product-4",
            quantity: 2,
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
        expect(orderQuatitiesAfter?.Quantity[0].productId).toBe("product-4");
        expect(orderQuatitiesAfter?.Quantity[0].quantity).toBe(2);
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-3",
            productIds: ["product-4"],
            orderId: "order-3",
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });
});
