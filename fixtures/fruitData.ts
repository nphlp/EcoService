import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";

export const insertFruits = async () => {
    try {
        await PrismaInstance.fruit.createMany({
            data: fruitData,
        });
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des fruits -> " + (error as Error).message);
    }
};

export const fruitData: Prisma.FruitCreateManyInput[] = [
    {
        name: "Apple",
        description: "A spherical fruit with a red or green skin and a whitish flesh.",
        image: "/fruit/apple.webp",
    },
    {
        name: "Banana",
        description: "A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.",
        image: "/fruit/banana.webp",
    },
    {
        name: "Cherry",
        description: "A small, round stone fruit that is typically bright or dark red.",
        image: "/fruit/cherry.webp",
    },
    {
        name: "Mango",
        description:
            "A large oval tropical fruit with smooth yellowish-red skin, hard central stone, and soft, juicy orange-yellow flesh.",
        image: "/fruit/mango.webp",
    },
    {
        name: "Orange",
        description: "A round juicy citrus fruit with a tough bright reddish-yellow rind.",
        image: "/fruit/orange.webp",
    },
    {
        name: "Pineapple",
        description: "A tropical fruit with a tough segmented skin and sweet, juicy, yellow flesh.",
        image: "/fruit/pineapple.webp",
    },
    {
        name: "Strawberry",
        description: "A sweet soft red fruit with a seed-studded surface.",
        image: "/fruit/strawberry.webp",
    },
];
