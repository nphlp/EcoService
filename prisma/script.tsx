import Prisma from "@lib/prisma";
import { categoryData, fruitData, productData, userData } from "./data";

export const fixtures = async () => {
    try {
        // User table
        for (const { name, email, emailVerified, role, password } of userData) {
            const createdUser = await Prisma.user.create({
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

            await Prisma.account.update({
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
            await Prisma.fruit.create({
                data: {
                    name,
                    description,
                    image
                },
            });
        }

        for (const { name, description } of categoryData) {
            await Prisma.category.create({
                data: {
                    name,
                    description
                },
            });
        }

        // Create products
        const vendor = await Prisma.user.findFirst({
            where: { role: "VENDOR" }
        });

        if (!vendor) {
            throw new Error("No vendor found");
        }

        for (const { name, description, image, price, stock, category } of productData) {
            const categoryRecord = await Prisma.category.findFirst({
                where: { name: category }
            });

            if (!categoryRecord) {
                throw new Error(`Category ${category} not found`);
            }

            await Prisma.product.create({
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
        await Prisma.verification.deleteMany({});
        await Prisma.session.deleteMany({});
        await Prisma.account.deleteMany({});
        await Prisma.user.deleteMany({});
        await Prisma.fruit.deleteMany({});
        await Prisma.category.deleteMany({});

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};
