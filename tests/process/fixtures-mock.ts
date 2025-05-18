import PrismaInstance from "@lib/prisma";
import { Order, Product } from "@prisma/client";
import { User } from "better-auth";

type CreateProps = {
    userId: string;
    productIds: string[];
    orderId: string;
    amountOfProductsToAddInOrder: number;
};

type CreateResponse = {
    user: User | null;
    products: Product[] | null;
    order: Order | null;
};

export const createUserProductAndOrder = async (props: CreateProps): Promise<CreateResponse> => {
    const { userId, productIds, orderId, amountOfProductsToAddInOrder } = props;

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
                createMany: {
                    data: products.slice(0, amountOfProductsToAddInOrder).map((product) => ({
                        productId: product.id,
                        quantity: 1,
                    })),
                },
            },
        },
    });

    return { user, products, order };
};

type RemoveProps = {
    userId: string;
    productIds: string[];
    orderId?: string;
};

type RemoveResponse = {
    user: User | null;
    products: Product[] | null;
    order: Order | null;
};

export const removeUserProductAndOrder = async (props: RemoveProps): Promise<RemoveResponse> => {
    const { userId, productIds, orderId } = props;

    if (orderId) {
        await PrismaInstance.order.delete({ where: { id: orderId } });
    }
    await PrismaInstance.product.deleteMany({ where: { id: { in: productIds } } });
    await PrismaInstance.user.delete({ where: { id: userId } });

    const user = await PrismaInstance.user.findUnique({ where: { id: userId } });
    const products = await PrismaInstance.product.findMany({ where: { id: { in: productIds } } });
    const order = orderId ? await PrismaInstance.order.findUnique({ where: { id: orderId } }) : null;

    return { user, products, order };
};
