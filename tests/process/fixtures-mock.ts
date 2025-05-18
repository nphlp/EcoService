import PrismaInstance from "@lib/prisma";
import { Order, Product } from "@prisma/client";
import { User } from "better-auth";

type Props = {
    userId: string;
    productIds: string[];
    orderId: string;
};

type Response = {
    user: User | null;
    products: Product[] | null;
    order: Order | null;
};

export const createUserProductAndOrder = async (props: Props): Promise<Response> => {
    const { userId, productIds, orderId } = props;

    const user = await PrismaInstance.user.create({
        data: {
            id: userId,
            name: `User ${userId}`,
            email: `${userId}@test.com`,
            emailVerified: true,
        },
    });

    await PrismaInstance.product.createMany({
        data: productIds.map((productId) => ({
            id: productId,
            name: `Produit ${productId}`,
            slug: `produit-${productId}`,
            description: `Description du produit ${productId}`,
            image: "image.jpg",
            price: 10,
            stock: 10,
            vendorId: userId,
        })),
    });

    const products = await PrismaInstance.product.findMany({ where: { id: { in: productIds } } });

    const order = await PrismaInstance.order.create({
        data: {
            id: orderId,
            orderStatus: "PENDING",
            paymentStatus: "PENDING",
            userId: userId,
            Quantity: {
                create: {
                    productId: products[0].id,
                    quantity: 1,
                },
            },
        },
    });

    return { user, products, order };
};

export const removeUserProductAndOrder = async (props: Props): Promise<Response> => {
    const { userId, productIds, orderId } = props;

    await PrismaInstance.order.delete({ where: { id: orderId } });
    await PrismaInstance.product.deleteMany({ where: { id: { in: productIds } } });
    await PrismaInstance.user.delete({ where: { id: userId } });

    const user = await PrismaInstance.user.findUnique({ where: { id: userId } });
    const products = await PrismaInstance.product.findMany({ where: { id: { in: productIds } } });
    const order = await PrismaInstance.order.findUnique({ where: { id: orderId } });

    return { user, products, order };
};
