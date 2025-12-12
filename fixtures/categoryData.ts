import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { stringToSlug } from "@utils/string-format";

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
        slug: stringToSlug("Fruits & Légumes"),
        description: "Produits frais issus de l'agriculture locale et biologique",
    },
    {
        name: "Produits Laitiers",
        slug: stringToSlug("Produits Laitiers"),
        description: "Lait, fromages, yaourts et autres produits laitiers",
    },
    {
        name: "Boulangerie",
        slug: stringToSlug("Boulangerie"),
        description: "Pains frais, viennoiseries et pâtisseries artisanales",
    },
    {
        name: "Viandes & Poissons",
        slug: stringToSlug("Viandes & Poissons"),
        description: "Viandes fraîches, poissons et fruits de mer",
    },
    {
        name: "Épicerie",
        slug: stringToSlug("Épicerie"),
        description: "Produits d'épicerie fine et produits de base",
    },
    {
        name: "Boissons",
        slug: stringToSlug("Boissons"),
        description: "Boissons fraîches, jus, vins et spiritueux",
    },
    {
        name: "Bio & Sans Gluten",
        slug: stringToSlug("Bio & Sans Gluten"),
        description: "Produits biologiques et alternatives sans gluten",
    },
    {
        name: "Surgelés",
        slug: stringToSlug("Surgelés"),
        description: "Produits surgelés de qualité",
    },
    {
        name: "Hygiène & Beauté",
        slug: stringToSlug("Hygiène & Beauté"),
        description: "Produits d'hygiène et cosmétiques naturels",
    },
    {
        name: "Maison & Entretien",
        slug: stringToSlug("Maison & Entretien"),
        description: "Produits d'entretien écologiques et accessoires",
    },
];
