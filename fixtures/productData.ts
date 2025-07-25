import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { StringToSlug } from "@utils/StringToSlug";

export const insertProducts = async () => {
    try {
        for (const data of productData) {
            await PrismaInstance.product.create({ data });
        }
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des produits -> " + (error as Error).message);
    }
};

export const productData: Prisma.ProductCreateInput[] = [
    // Fruits & Légumes
    {
        name: "Panier de fruits bio",
        slug: StringToSlug("Panier de fruits bio"),
        description: "Assortiment de fruits de saison bio",
        image: "/illustration/produit 1.webp",
        price: 25.99,
        stock: 50,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Légumes locaux",
        slug: StringToSlug("Légumes locaux"),
        description: "Mix de légumes frais de producteurs locaux",
        image: "/illustration/produit 2.webp",
        price: 18.5,
        stock: 40,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Herbes aromatiques",
        slug: StringToSlug("Herbes aromatiques"),
        description: "Assortiment d'herbes fraîches bio",
        image: "/illustration/produit 3.webp",
        price: 4.99,
        stock: 30,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Produits Laitiers
    {
        name: "Fromage fermier",
        slug: StringToSlug("Fromage fermier"),
        description: "Fromage artisanal de vache",
        image: "/illustration/produit 4.webp",
        price: 7.99,
        stock: 25,
        Category: {
            connect: {
                name: "Produits Laitiers",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Yaourt bio",
        slug: StringToSlug("Yaourt bio"),
        description: "Pack de yaourts nature bio",
        image: "/illustration/produit 5.webp",
        price: 4.5,
        stock: 60,
        Category: {
            connect: {
                name: "Produits Laitiers",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Beurre fermier",
        slug: StringToSlug("Beurre fermier"),
        description: "Beurre traditionnel de baratte",
        image: "/illustration/coton 1.webp",
        price: 3.99,
        stock: 45,
        Category: {
            connect: {
                name: "Produits Laitiers",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Boulangerie
    {
        name: "Pain au levain",
        slug: StringToSlug("Pain au levain"),
        description: "Pain traditionnel au levain naturel",
        image: "/illustration/coton 2.webp",
        price: 4.5,
        stock: 30,
        Category: {
            connect: {
                name: "Boulangerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Croissants",
        slug: StringToSlug("Croissants"),
        description: "Lot de 4 croissants pur beurre",
        image: "/illustration/coton 3.webp",
        price: 6.99,
        stock: 40,
        Category: {
            connect: {
                name: "Boulangerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Baguette tradition",
        slug: StringToSlug("Baguette tradition"),
        description: "Baguette artisanale à l'ancienne",
        image: "/illustration/cafe.webp",
        price: 1.5,
        stock: 100,
        Category: {
            connect: {
                name: "Boulangerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Viandes & Poissons
    {
        name: "Filet de bœuf",
        slug: StringToSlug("Filet de bœuf"),
        description: "Filet de bœuf local race Charolaise",
        image: "/illustration/eolienne.webp",
        price: 32.99,
        stock: 20,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Saumon frais",
        slug: StringToSlug("Saumon frais"),
        description: "Filet de saumon de l'Atlantique",
        image: "/illustration/espace 1.webp",
        price: 24.99,
        stock: 25,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Poulet fermier",
        slug: StringToSlug("Poulet fermier"),
        description: "Poulet fermier Label Rouge",
        image: "/illustration/feuille.webp",
        price: 15.99,
        stock: 30,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Épicerie
    {
        name: "Huile d'olive",
        slug: StringToSlug("Huile d'olive"),
        description: "Huile d'olive extra vierge bio",
        image: "/illustration/pots.webp",
        price: 12.99,
        stock: 40,
        Category: {
            connect: {
                name: "Épicerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Miel local",
        slug: StringToSlug("Miel local"),
        description: "Miel toutes fleurs local",
        image: "/illustration/pshit 1.webp",
        price: 8.5,
        stock: 35,
        Category: {
            connect: {
                name: "Épicerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Pâtes artisanales",
        slug: StringToSlug("Pâtes artisanales"),
        description: "Pâtes fraîches aux œufs",
        image: "/illustration/pshit 2.webp",
        price: 5.99,
        stock: 50,
        Category: {
            connect: {
                name: "Épicerie",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Boissons
    {
        name: "Vin rouge bio",
        slug: StringToSlug("Vin rouge bio"),
        description: "Vin rouge biodynamique local",
        image: "/illustration/produit 3.webp",
        price: 15.99,
        stock: 60,
        Category: {
            connect: {
                name: "Boissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Jus de pomme",
        slug: StringToSlug("Jus de pomme"),
        description: "Jus de pomme pressé artisanal",
        image: "/illustration/produit 4.webp",
        price: 4.5,
        stock: 45,
        Category: {
            connect: {
                name: "Boissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Bière artisanale",
        slug: StringToSlug("Bière artisanale"),
        description: "Bière blonde locale",
        image: "/illustration/produit 5.webp",
        price: 3.99,
        stock: 70,
        Category: {
            connect: {
                name: "Boissons",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Bio & Sans Gluten
    {
        name: "Farine sans gluten",
        slug: StringToSlug("Farine sans gluten"),
        description: "Farine de riz bio sans gluten",
        image: "/illustration/coton 1.webp",
        price: 6.99,
        stock: 40,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Granola bio",
        slug: StringToSlug("Granola bio"),
        description: "Granola bio aux fruits secs",
        image: "/illustration/coton 2.webp",
        price: 8.99,
        stock: 35,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Cookies vegan",
        slug: StringToSlug("Cookies vegan"),
        description: "Cookies bio sans gluten vegan",
        image: "/illustration/coton 3.webp",
        price: 5.5,
        stock: 45,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Surgelés
    {
        name: "Légumes surgelés",
        slug: StringToSlug("Légumes surgelés"),
        description: "Mix de légumes bio surgelés",
        image: "/illustration/cafe.webp",
        price: 6.99,
        stock: 50,
        Category: {
            connect: {
                name: "Surgelés",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Poisson surgelé",
        slug: StringToSlug("Poisson surgelé"),
        description: "Filets de cabillaud surgelés",
        image: "/illustration/eolienne.webp",
        price: 14.99,
        stock: 30,
        Category: {
            connect: {
                name: "Surgelés",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Glace artisanale",
        slug: StringToSlug("Glace artisanale"),
        description: "Crème glacée vanille de Madagascar",
        image: "/illustration/espace 1.webp",
        price: 7.99,
        stock: 25,
        Category: {
            connect: {
                name: "Surgelés",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Hygiène & Beauté
    {
        name: "Savon naturel",
        slug: StringToSlug("Savon naturel"),
        description: "Savon artisanal aux huiles essentielles",
        image: "/illustration/terre-main.webp",
        price: 5.99,
        stock: 55,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Shampooing solide",
        slug: StringToSlug("Shampooing solide"),
        description: "Shampooing solide bio zéro déchet",
        image: "/illustration/produit 1.webp",
        price: 8.99,
        stock: 40,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Crème visage",
        slug: StringToSlug("Crème visage"),
        description: "Crème hydratante bio",
        image: "/illustration/produit 2.webp",
        price: 19.99,
        stock: 30,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },

    // Maison & Entretien
    {
        name: "Lessive écologique",
        slug: StringToSlug("Lessive écologique"),
        description: "Lessive naturelle concentrée",
        image: "/illustration/lessive 1.webp",
        price: 12.99,
        stock: 45,
        Category: {
            connect: {
                name: "Maison & Entretien",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Éponges naturelles",
        slug: StringToSlug("Éponges naturelles"),
        description: "Lot de 3 éponges biodégradables",
        image: "/illustration/lessive 2.webp",
        price: 6.99,
        stock: 60,
        Category: {
            connect: {
                name: "Maison & Entretien",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
    {
        name: "Spray multi-usage",
        slug: StringToSlug("Spray multi-usage"),
        description: "Nettoyant écologique tout usage",
        image: "/illustration/brosse-a-dent.webp",
        price: 4.99,
        stock: 50,
        Category: {
            connect: {
                name: "Maison & Entretien",
            },
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            },
        },
    },
];
