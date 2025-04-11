import PrismaInstance from "@lib/prisma";
import { Prisma } from "@services/prisma";

export const insertUsers = async () => {
    try {
        for (const data of userData) {
            // Creer l'utilisateur et son compte
            const { id, Account } = await PrismaInstance.user.create({ data, include: { Account: true } });

            // Copier l'id de l'utilisateur dans l'accountId pour correspondre aux spécifications de BetterAuth
            await PrismaInstance.account.update({
                where: { id: Account[0].id },
                data: {
                    accountId: id,
                },
            });
        }
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des utilisateurs -> " + (error as Error).message);
    }
};

export const userData: Prisma.UserCreateInput[] = [
    {
        name: "User Lastname",
        email: "user@example.com",
        emailVerified: true,
        role: "USER",
        Account: {
            create: {
                providerId: "credential",
                accountId: "",
                password:
                    "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
            },
        },
    },
    {
        name: "Vendor Lastname",
        email: "vendor@example.com",
        emailVerified: true,
        role: "VENDOR",
        Account: {
            create: {
                providerId: "credential",
                accountId: "",
                password:
                    "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
            },
        },
    },
    {
        name: "Employee Lastname",
        email: "employee@example.com",
        emailVerified: true,
        role: "EMPLOYEE",
        Account: {
            create: {
                providerId: "credential",
                accountId: "",
                password:
                    "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
            },
        },
    },
    {
        name: "Admin Lastname",
        email: "admin@example.com",
        emailVerified: true,
        role: "ADMIN",
        Account: {
            create: {
                providerId: "credential",
                accountId: "",
                password:
                    "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
            },
        },
    },
];
