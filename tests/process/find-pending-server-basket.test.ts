import PrismaInstance from "@lib/prisma";
import { FindPendingServerBasket } from "@process/basket/FindPendingServerBasket";
import { describe, expect, it, vi } from "vitest";

vi.mock("@lib/authServer", () => ({
    GetSession: vi.fn().mockResolvedValue({
        user: {
            id: "user-123",
        },
    }),
}));

describe("FindPendingServerBasket", () => {
    it("Add data to database", async () => {
        await PrismaInstance.user.create({
            data: {
                id: "user-123",
                name: "User 123",
                email: "user123@test.com",
                emailVerified: false,
            },
        });
        await PrismaInstance.product.create({
            data: {
                id: "product-123",
                name: "Produit 123",
                slug: "produit-123",
                description: "Description du produit 123",
                image: "image.jpg",
                price: 10,
                stock: 10,
                vendorId: "user-123",
            },
        });
        await PrismaInstance.order.create({
            data: {
                id: "order-123",
                orderStatus: "PENDING",
                paymentStatus: "PENDING",
                userId: "user-123",
                Quantity: {
                    create: {
                        quantity: 1,
                        productId: "product-123",
                    },
                },
            },
        });

        const getUser = await PrismaInstance.user.findUnique({ where: { id: "user-123" } });
        const getProduct = await PrismaInstance.product.findUnique({ where: { id: "product-123" } });
        const getOrder = await PrismaInstance.order.findUnique({ where: { id: "order-123" } });

        expect(getUser).toBeDefined();
        expect(getProduct).toBeDefined();
        expect(getOrder).toBeDefined();
    });

    it("Pending server basket found", async () => {
        const orderId = await FindPendingServerBasket();

        expect(orderId).toBeDefined();
        expect(orderId).toBe("order-123");
    });

    it("Remove data from database", async () => {
        await PrismaInstance.order.delete({ where: { id: "order-123" } });
        await PrismaInstance.product.delete({ where: { id: "product-123" } });
        await PrismaInstance.user.delete({ where: { id: "user-123" } });

        const getUser = await PrismaInstance.user.findUnique({ where: { id: "user-123" } });
        const getProduct = await PrismaInstance.product.findUnique({ where: { id: "product-123" } });
        const getOrder = await PrismaInstance.order.findUnique({ where: { id: "order-123" } });

        expect(getUser).toBeNull();
        expect(getProduct).toBeNull();
        expect(getOrder).toBeNull();
    });

    it("Pending server basket not found", async () => {
        const orderId = await FindPendingServerBasket();

        expect(orderId).toBeNull();
    });
});
