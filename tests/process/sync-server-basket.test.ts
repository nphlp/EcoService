import PrismaInstance from "@lib/prisma";
import { SyncServerBasket } from "@process/basket/SyncServerBasket";
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
            id: "user-10",
            role: "USER",
        },
    }),
}));

describe("SyncServerBasket", () => {
    it("Add data to database", async () => {
        const { user, products, order } = await createUserProductAndOrder({
            userId: "user-6",
            productIds: ["product-9", "product-10", "product-11", "product-12"],
            orderId: "order-6",
            amountOfProductsToAddInOrder: 2,
        });

        expect(user).toBeDefined();
        expect(products).toBeDefined();
        expect(order).toBeDefined();
    });

    it("Sync server basket", async () => {
        const orderQuatitiesBefore = await PrismaInstance.order.findUnique({
            where: { id: "order-6" },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        const quantities = orderQuatitiesBefore?.Quantity.map(({ productId, quantity }) => ({ productId, quantity }));

        expect(orderQuatitiesBefore).toBeDefined();
        expect(orderQuatitiesBefore?.Quantity.length).toBe(2);
        expect(quantities).toContainEqual(
            expect.objectContaining({
                productId: "product-9",
                quantity: 1,
            }),
        );
        expect(quantities).toContainEqual(
            expect.objectContaining({
                productId: "product-10",
                quantity: 1,
            }),
        );

        const products = await PrismaInstance.product.findMany({
            where: { id: { in: ["product-11", "product-12"] } },
        });

        const orderedProducts = products.sort(
            (a, b) => ["product-11", "product-12"].indexOf(a.id) - ["product-11", "product-12"].indexOf(b.id),
        );

        const orderId = await SyncServerBasket({
            orderId: "order-6",
            localBasket: {
                items: orderedProducts.map((product) => ({
                    productId: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                })),
            },
        });

        if (!orderId) throw new Error("SyncServerBasket -> Return null");

        const orderQuatitiesAfter = await PrismaInstance.order.findUnique({
            where: { id: orderId },
            include: {
                Quantity: {
                    include: { Product: true },
                },
            },
        });

        const quantitiesAfter = orderQuatitiesAfter?.Quantity.map(({ productId, quantity }) => ({
            productId,
            quantity,
        }));

        expect(orderQuatitiesAfter).toBeDefined();
        expect(orderQuatitiesAfter?.Quantity.length).toBe(2);
        expect(quantitiesAfter).toContainEqual(
            expect.objectContaining({
                productId: "product-11",
                quantity: 1,
            }),
        );
        expect(quantitiesAfter).toContainEqual(
            expect.objectContaining({
                productId: "product-12",
                quantity: 1,
            }),
        );
    });

    it("Remove data from database", async () => {
        const { user, products, order } = await removeUserProductAndOrder({
            userId: "user-6",
            productIds: ["product-9", "product-10", "product-11", "product-12"],
            orderId: "order-6",
        });

        expect(user).toBeNull();
        expect(products).toStrictEqual([]);
        expect(order).toBeNull();
    });
});
