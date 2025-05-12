import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { StringToSlug } from "@utils/StringToSlug";

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
        slug: StringToSlug("Fruits & Légumes"),
        description: "Produits frais issus de l'agriculture locale et biologique",
    },
    {
        name: "Produits Laitiers",
        slug: StringToSlug("Produits Laitiers"),
        description: "Lait, fromages, yaourts et autres produits laitiers",
    },
    {
        name: "Boulangerie",
        slug: StringToSlug("Boulangerie"),
        description: "Pains frais, viennoiseries et pâtisseries artisanales",
    },
    {
        name: "Viandes & Poissons",
        slug: StringToSlug("Viandes & Poissons"),
        description: "Viandes fraîches, poissons et fruits de mer",
    },
    {
        name: "Épicerie",
        slug: StringToSlug("Épicerie"),
        description: "Produits d'épicerie fine et produits de base",
    },
    {
        name: "Boissons",
        slug: StringToSlug("Boissons"),
        description: "Boissons fraîches, jus, vins et spiritueux",
    },
    {
        name: "Bio & Sans Gluten",
        slug: StringToSlug("Bio & Sans Gluten"),
        description: "Produits biologiques et alternatives sans gluten",
    },
    {
        name: "Surgelés",
        slug: StringToSlug("Surgelés"),
        description: "Produits surgelés de qualité",
    },
    {
        name: "Hygiène & Beauté",
        slug: StringToSlug("Hygiène & Beauté"),
        description: "Produits d'hygiène et cosmétiques naturels",
    },
    {
        name: "Maison & Entretien",
        slug: StringToSlug("Maison & Entretien"),
        description: "Produits d'entretien écologiques et accessoires",
    },
];
