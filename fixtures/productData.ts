import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { stringToSlug } from "@utils/string-format";

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
        slug: stringToSlug("Panier de fruits bio"),
        description: "Assortiment de fruits de saison bio",
        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
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
        slug: stringToSlug("Légumes locaux"),
        description: "Mix de légumes frais de producteurs locaux",
        image: "/images/illustrations/3g7YZVUV0A0.webp",
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
        slug: stringToSlug("Herbes aromatiques"),
        description: "Assortiment d'herbes fraîches bio",
        image: "/images/illustrations/66OgXiZ-pWk.webp",
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
        slug: stringToSlug("Fromage fermier"),
        description: "Fromage artisanal de vache",
        image: "/images/illustrations/7xcn6e8vixk.webp",
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
        slug: stringToSlug("Yaourt bio"),
        description: "Pack de yaourts nature bio",
        image: "/images/illustrations/BZg6FvH1NO0.webp",
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
        slug: stringToSlug("Beurre fermier"),
        description: "Beurre traditionnel de baratte",
        image: "/images/illustrations/8wBP80yThLU.webp",
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
        slug: stringToSlug("Pain au levain"),
        description: "Pain traditionnel au levain naturel",
        image: "/images/illustrations/AB-HJwWN6Zk.webp",
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
        slug: stringToSlug("Croissants"),
        description: "Lot de 4 croissants pur beurre",
        image: "/images/illustrations/AcSjR6BmyqE.webp",
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
        slug: stringToSlug("Baguette tradition"),
        description: "Baguette artisanale à l'ancienne",
        image: "/images/illustrations/AuhPy2NofM0.webp",
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
        slug: stringToSlug("Filet de bœuf"),
        description: "Filet de bœuf local race Charolaise",
        image: "/images/illustrations/B2tKxL9KVqA.webp",
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
        slug: stringToSlug("Saumon frais"),
        description: "Filet de saumon de l'Atlantique",
        image: "/images/illustrations/BRVqq2uak4E.webp",
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
        slug: stringToSlug("Poulet fermier"),
        description: "Poulet fermier Label Rouge",
        image: "/images/illustrations/BZg6FvH1NO0.webp",
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
        slug: stringToSlug("Huile d'olive"),
        description: "Huile d'olive extra vierge bio",
        image: "/images/illustrations/BgbcekiNBlo.webp",
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
        slug: stringToSlug("Miel local"),
        description: "Miel toutes fleurs local",
        image: "/images/illustrations/DVfqws3bRxE.webp",
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
        slug: stringToSlug("Pâtes artisanales"),
        description: "Pâtes fraîches aux œufs",
        image: "/images/illustrations/EvP4FOhMniM.webp",
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
        slug: stringToSlug("Vin rouge bio"),
        description: "Vin rouge biodynamique local",
        image: "/images/illustrations/66OgXiZ-pWk.webp",
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
        slug: stringToSlug("Jus de pomme"),
        description: "Jus de pomme pressé artisanal",
        image: "/images/illustrations/7xcn6e8vixk.webp",
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
        slug: stringToSlug("Bière artisanale"),
        description: "Bière blonde locale",
        image: "/images/illustrations/BZg6FvH1NO0.webp",
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
        slug: stringToSlug("Farine sans gluten"),
        description: "Farine de riz bio sans gluten",
        image: "/images/illustrations/8wBP80yThLU.webp",
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
        slug: stringToSlug("Granola bio"),
        description: "Granola bio aux fruits secs",
        image: "/images/illustrations/AB-HJwWN6Zk.webp",
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
        slug: stringToSlug("Cookies vegan"),
        description: "Cookies bio sans gluten vegan",
        image: "/images/illustrations/AcSjR6BmyqE.webp",
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
        slug: stringToSlug("Légumes surgelés"),
        description: "Mix de légumes bio surgelés",
        image: "/images/illustrations/AuhPy2NofM0.webp",
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
        slug: stringToSlug("Poisson surgelé"),
        description: "Filets de cabillaud surgelés",
        image: "/images/illustrations/B2tKxL9KVqA.webp",
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
        slug: stringToSlug("Glace artisanale"),
        description: "Crème glacée vanille de Madagascar",
        image: "/images/illustrations/BRVqq2uak4E.webp",
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
        slug: stringToSlug("Savon naturel"),
        description: "Savon artisanal aux huiles essentielles",
        image: "/images/illustrations/IbfC88l5u8c.webp",
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
        slug: stringToSlug("Shampooing solide"),
        description: "Shampooing solide bio zéro déchet",
        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
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
        slug: stringToSlug("Crème visage"),
        description: "Crème hydratante bio",
        image: "/images/illustrations/3g7YZVUV0A0.webp",
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
        slug: stringToSlug("Lessive écologique"),
        description: "Lessive naturelle concentrée",
        image: "/images/illustrations/J9_a3-O7vGs.webp",
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
        slug: stringToSlug("Éponges naturelles"),
        description: "Lot de 3 éponges biodégradables",
        image: "/images/illustrations/JHpAm3IQg5Q.webp",
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
        slug: stringToSlug("Spray multi-usage"),
        description: "Nettoyant écologique tout usage",
        image: "/images/illustrations/KRkn9QXpd8I.webp",
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
    {
        name: "Tomates anciennes bio",
        slug: stringToSlug("Tomates anciennes bio"),
        description: "Variétés anciennes, goût authentique et sucré",
        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
        price: 3.99,
        stock: 80,
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
        name: "Paniers d'herbes fraîches",
        slug: stringToSlug("Paniers d'herbes fraîches"),
        description: "Menthe, basilic, persil – prêt à cuisiner",
        image: "/images/illustrations/3g7YZVUV0A0.webp",
        price: 5.5,
        stock: 60,
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
        name: "Lait fermier entier",
        slug: stringToSlug("Lait fermier entier"),
        description: "Lait entier pasteurisé issu de fermes locales",
        image: "/images/illustrations/66OgXiZ-pWk.webp",
        price: 1.6,
        stock: 120,
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
        name: "Fromage de chèvre frais",
        slug: stringToSlug("Fromage de chèvre frais"),
        description: "Petit chèvre crémeux et parfumé",
        image: "/images/illustrations/7xcn6e8vixk.webp",
        price: 4.2,
        stock: 50,
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
        name: "Pain complet bio",
        slug: stringToSlug("Pain complet bio"),
        description: "Pain complet aux farines bio moulues sur pierre",
        image: "/images/illustrations/AuhPy2NofM0.webp",
        price: 3.2,
        stock: 70,
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
        name: "Cookies artisanaux",
        slug: stringToSlug("Cookies artisanaux"),
        description: "Cookies pépites de chocolat et farine locale",
        image: "/images/illustrations/AcSjR6BmyqE.webp",
        price: 4.99,
        stock: 90,
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
        name: "Saucisses de volaille",
        slug: stringToSlug("Saucisses de volaille"),
        description: "Saucisses 100% volaille élevées en plein air",
        image: "/images/illustrations/B2tKxL9KVqA.webp",
        price: 8.99,
        stock: 45,
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
        name: "Truite fumée artisanale",
        slug: stringToSlug("Truite fumée artisanale"),
        description: "Truite fumée au bois de hêtre",
        image: "/images/illustrations/BRVqq2uak4E.webp",
        price: 9.5,
        stock: 35,
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
        name: "Riz complet bio",
        slug: stringToSlug("Riz complet bio"),
        description: "Riz long complet issu de l'agriculture biologique",
        image: "/images/illustrations/DVfqws3bRxE.webp",
        price: 3.49,
        stock: 110,
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
        name: "Pois chiches en bocal",
        slug: stringToSlug("Pois chiches en bocal"),
        description: "Pois chiches cuits, prêts à consommer",
        image: "/images/illustrations/EvP4FOhMniM.webp",
        price: 2.3,
        stock: 140,
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
        name: "Kombucha artisanal",
        slug: stringToSlug("Kombucha artisanal"),
        description: "Boisson fermentée rafraîchissante au thé",
        image: "/images/illustrations/66OgXiZ-pWk.webp",
        price: 2.99,
        stock: 100,
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
        name: "Tisane relaxante",
        slug: stringToSlug("Tisane relaxante"),
        description: "Mélange de plantes bio pour le soir",
        image: "/images/illustrations/BZg6FvH1NO0.webp",
        price: 4.2,
        stock: 80,
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
        name: "Pain sans gluten",
        slug: stringToSlug("Pain sans gluten"),
        description: "Pain au sarrasin et riz, moelleux",
        image: "/images/illustrations/AB-HJwWN6Zk.webp",
        price: 5.2,
        stock: 55,
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
        name: "Farine de pois chiche",
        slug: stringToSlug("Farine de pois chiche"),
        description: "Farine riche en protéines pour socca et falafels",
        image: "/images/illustrations/8wBP80yThLU.webp",
        price: 3.8,
        stock: 75,
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
        name: "Myrtilles surgelées",
        slug: stringToSlug("Myrtilles surgelées"),
        description: "Myrtilles sélectionnées et surgelées flash",
        image: "/images/illustrations/AuhPy2NofM0.webp",
        price: 6.2,
        stock: 65,
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
        name: "Soupe de légumes surgelée",
        slug: stringToSlug("Soupe de légumes surgelée"),
        description: "Soupe prête à réchauffer, recettes maison",
        image: "/images/illustrations/B2tKxL9KVqA.webp",
        price: 3.9,
        stock: 90,
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
        name: "Déodorant solide",
        slug: stringToSlug("Déodorant solide"),
        description: "Déodorant naturel au bicarbonate et karité",
        image: "/images/illustrations/3g7YZVUV0A0.webp",
        price: 7.5,
        stock: 70,
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
        name: "Baume à lèvres bio",
        slug: stringToSlug("Baume à lèvres bio"),
        description: "Baume nourrissant aux huiles végétales",
        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
        price: 3.2,
        stock: 120,
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
        name: "Liquide vaisselle éco",
        slug: stringToSlug("Liquide vaisselle éco"),
        description: "Liquide vaisselle concentré d'origine végétale",
        image: "/images/illustrations/J9_a3-O7vGs.webp",
        price: 2.9,
        stock: 150,
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
        name: "Brosse vaisselle bois",
        slug: stringToSlug("Brosse vaisselle bois"),
        description: "Brosse tête remplaçable en fibres naturelles",
        image: "/images/illustrations/KRkn9QXpd8I.webp",
        price: 4.1,
        stock: 85,
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
