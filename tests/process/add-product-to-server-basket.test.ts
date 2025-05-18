import PrismaInstance from "@lib/prisma";
import { AddProductToServerBasket } from "@process/basket/AddProductToServerBasket";
import { describe, expect, it, vi } from "vitest";
import { createUserProductAndOrder, removeUserProductAndOrder } from "./fixtures-mock";

// Mock the revalidatePath function
vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

describe("AddProductToServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-2",
            productIds: ["product-2", "product-3"],
            orderId: "order-2",
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Add product to server basket", async () => {
        const orderId = await AddProductToServerBasket({
            orderId: "order-2",
            item: {
                productId: "product-3",
                name: "Produit 3",
                description: "Description du produit 3",
                price: 20,
                image: "image.jpg",
                quantity: 1,
            },
        });

        if (!orderId) throw new Error("AddProductToServerBasket -> Return null");

        const order = await PrismaInstance.order.findUnique({
            where: { id: orderId },
            include: {
                Quantity: {
                    include: {
                        Product: true,
                    },
                },
            },
        });

        expect(order).toBeDefined();
        expect(order?.id).toBe("order-2");
        expect(order?.paymentStatus).toBe("PENDING");
        expect(order?.orderStatus).toBe("PENDING");
        expect(order?.userId).toBe("user-2");
        expect(order?.Quantity.length).toBe(2);
        expect(order?.Quantity).toContainEqual(
            expect.objectContaining({
                productId: "product-2",
                quantity: 1,
            }),
        );
        expect(order?.Quantity).toContainEqual(
            expect.objectContaining({
                productId: "product-3",
                quantity: 1,
            }),
        );
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-2",
            productIds: ["product-2", "product-3"],
            orderId: "order-2",
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });
});
