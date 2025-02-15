import { categoryData, fruitData, productData, userData } from "./data";
import PrismaInstance from "@lib/prisma";

export const fixtures = async () => {
    try {
        // User table
        for (const { name, email, emailVerified, role, password } of userData) {
            const createdUser = await PrismaInstance.user.create({
                data: {
                    name,
                    email,
                    emailVerified,
                    role,
                    Account: {
                        create: {
                            providerId: "credential",
                            accountId: "user-id",
                            password,
                        },
                    },
                },
                include: {
                    Account: true,
                },
            });

            await PrismaInstance.account.update({
                where: {
                    id: createdUser.Account[0].id,
                },
                data: {
                    providerId: createdUser.Account[0].providerId,
                    accountId: createdUser.id,
                    password: createdUser.Account[0].password,
                },
            });
        }

        for (const { name, description, image } of fruitData) {
            await PrismaInstance.fruit.create({
                data: {
                    name,
                    description,
                    image
                },
            });
        }

        for (const { name, description } of categoryData) {
            await PrismaInstance.category.create({
                data: {
                    name,
                    description
                },
            });
        }

        // Create products
        const vendor = await PrismaInstance.user.findFirst({
            where: { role: "VENDOR" }
        });

        if (!vendor) {
            throw new Error("No vendor found");
        }

        for (const { name, description, image, price, stock, category } of productData) {
            const categoryRecord = await PrismaInstance.category.findFirst({
                where: { name: category }
            });

            if (!categoryRecord) {
                throw new Error(`Category ${category} not found`);
            }

            await PrismaInstance.product.create({
                data: {
                    name,
                    description,
                    image,
                    price,
                    stock,
                    vendorId: vendor.id,
                    categoryId: categoryRecord.id
                }
            });
        }

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};

export const reset = async () => {
    try {
        await PrismaInstance.verification.deleteMany({});
        await PrismaInstance.session.deleteMany({});
        await PrismaInstance.account.deleteMany({});
        await PrismaInstance.user.deleteMany({});
        await PrismaInstance.fruit.deleteMany({});
        await PrismaInstance.category.deleteMany({});

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};
