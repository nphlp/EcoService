import PrismaInstance from "@lib/prisma";
import { Prisma } from "@services/prisma";

export const insertCategories = async () => {
    try {
        await PrismaInstance.category.createMany({
            data: categoryData,
        });
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des catégories -> " + (error as Error).message);
    }
};

export const categoryData: Prisma.CategoryCreateManyInput[] = [
    {
        name: "Fruits & Légumes",
        description: "Produits frais issus de l'agriculture locale et biologique",
    },
    {
        name: "Produits Laitiers",
        description: "Lait, fromages, yaourts et autres produits laitiers",
    },
    {
        name: "Boulangerie",
        description: "Pains frais, viennoiseries et pâtisseries artisanales",
    },
    {
        name: "Viandes & Poissons",
        description: "Viandes fraîches, poissons et fruits de mer",
    },
    {
        name: "Épicerie",
        description: "Produits d'épicerie fine et produits de base",
    },
    {
        name: "Boissons",
        description: "Boissons fraîches, jus, vins et spiritueux",
    },
    {
        name: "Bio & Sans Gluten",
        description: "Produits biologiques et alternatives sans gluten",
    },
    {
        name: "Surgelés",
        description: "Produits surgelés de qualité",
    },
    {
        name: "Hygiène & Beauté",
        description: "Produits d'hygiène et cosmétiques naturels",
    },
    {
        name: "Maison & Entretien",
        description: "Produits d'entretien écologiques et accessoires",
    },
];
