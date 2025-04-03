import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";

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
        description: "Assortiment de fruits de saison bio",
        image: "/illustration/produit 1.jpg",
        price: 25.99,
        stock: 50,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Légumes locaux",
        description: "Mix de légumes frais de producteurs locaux",
        image: "/illustration/produit 2.jpg",
        price: 18.5,
        stock: 40,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Herbes aromatiques",
        description: "Assortiment d'herbes fraîches bio",
        image: "/illustration/produit 3.jpg",
        price: 4.99,
        stock: 30,
        Category: {
            connect: {
                name: "Fruits & Légumes",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Produits Laitiers
    {
        name: "Fromage fermier",
        description: "Fromage artisanal de vache",
        image: "/illustration/produit 4.jpg",
        price: 7.99,
        stock: 25,
        Category: {
            connect: {
                name: "Produits Laitiers",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Yaourt bio",
        description: "Pack de yaourts nature bio",
        image: "/illustration/produit 5.jpg",
        price: 4.5,
        stock: 60,
        Category: {
            connect: {
                name: "Produits Laitiers",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Beurre fermier",
        description: "Beurre traditionnel de baratte",
        image: "/illustration/coton 1.jpg",
        price: 3.99,
        stock: 45,
        Category: {
            connect: {
                name: "Produits Laitiers",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Boulangerie
    {
        name: "Pain au levain",
        description: "Pain traditionnel au levain naturel",
        image: "/illustration/coton 2.jpg",
        price: 4.5,
        stock: 30,
        Category: {
            connect: {
                name: "Boulangerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Croissants",
        description: "Lot de 4 croissants pur beurre",
        image: "/illustration/coton 3.jpg",
        price: 6.99,
        stock: 40,
        Category: {
            connect: {
                name: "Boulangerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Baguette tradition",
        description: "Baguette artisanale à l'ancienne",
        image: "/illustration/cafe.jpg",
        price: 1.5,
        stock: 100,
        Category: {
            connect: {
                name: "Boulangerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Viandes & Poissons
    {
        name: "Filet de bœuf",
        description: "Filet de bœuf local race Charolaise",
        image: "/illustration/eolienne.jpg",
        price: 32.99,
        stock: 20,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Saumon frais",
        description: "Filet de saumon de l'Atlantique",
        image: "/illustration/espace 1.jpg",
        price: 24.99,
        stock: 25,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Poulet fermier",
        description: "Poulet fermier Label Rouge",
        image: "/illustration/feuille.jpg",
        price: 15.99,
        stock: 30,
        Category: {
            connect: {
                name: "Viandes & Poissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Épicerie
    {
        name: "Huile d'olive",
        description: "Huile d'olive extra vierge bio",
        image: "/illustration/pots.jpg",
        price: 12.99,
        stock: 40,
        Category: {
            connect: {
                name: "Épicerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Miel local",
        description: "Miel toutes fleurs local",
        image: "/illustration/pshit 1.jpg",
        price: 8.5,
        stock: 35,
        Category: {
            connect: {
                name: "Épicerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Pâtes artisanales",
        description: "Pâtes fraîches aux œufs",
        image: "/illustration/pshit 2.jpg",
        price: 5.99,
        stock: 50,
        Category: {
            connect: {
                name: "Épicerie",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Boissons
    {
        name: "Vin rouge bio",
        description: "Vin rouge biodynamique local",
        image: "/illustration/produit 3.jpg",
        price: 15.99,
        stock: 60,
        Category: {
            connect: {
                name: "Boissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Jus de pomme",
        description: "Jus de pomme pressé artisanal",
        image: "/illustration/produit 4.jpg",
        price: 4.5,
        stock: 45,
        Category: {
            connect: {
                name: "Boissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Bière artisanale",
        description: "Bière blonde locale",
        image: "/illustration/produit 5.jpg",
        price: 3.99,
        stock: 70,
        Category: {
            connect: {
                name: "Boissons",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Bio & Sans Gluten
    {
        name: "Farine sans gluten",
        description: "Farine de riz bio sans gluten",
        image: "/illustration/coton 1.jpg",
        price: 6.99,
        stock: 40,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Granola bio",
        description: "Granola bio aux fruits secs",
        image: "/illustration/coton 2.jpg",
        price: 8.99,
        stock: 35,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Cookies vegan",
        description: "Cookies bio sans gluten vegan",
        image: "/illustration/coton 3.jpg",
        price: 5.5,
        stock: 45,
        Category: {
            connect: {
                name: "Bio & Sans Gluten",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Surgelés
    {
        name: "Légumes surgelés",
        description: "Mix de légumes bio surgelés",
        image: "/illustration/cafe.jpg",
        price: 6.99,
        stock: 50,
        Category: {
            connect: {
                name: "Surgelés",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Poisson surgelé",
        description: "Filets de cabillaud surgelés",
        image: "/illustration/eolienne.jpg",
        price: 14.99,
        stock: 30,
        Category: {
            connect: {
                name: "Surgelés",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Glace artisanale",
        description: "Crème glacée vanille de Madagascar",
        image: "/illustration/espace 1.jpg",
        price: 7.99,
        stock: 25,
        Category: {
            connect: {
                name: "Surgelés",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Hygiène & Beauté
    {
        name: "Savon naturel",
        description: "Savon artisanal aux huiles essentielles",
        image: "/illustration/terre-main.jpg",
        price: 5.99,
        stock: 55,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Shampooing solide",
        description: "Shampooing solide bio zéro déchet",
        image: "/illustration/produit 1.jpg",
        price: 8.99,
        stock: 40,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Crème visage",
        description: "Crème hydratante bio",
        image: "/illustration/produit 2.jpg",
        price: 19.99,
        stock: 30,
        Category: {
            connect: {
                name: "Hygiène & Beauté",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },

    // Maison & Entretien
    {
        name: "Lessive écologique",
        description: "Lessive naturelle concentrée",
        image: "/illustration/lessive 1.jpg",
        price: 12.99,
        stock: 45,
        Category: {
            connect: {
                name: "Maison & Entretien",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Éponges naturelles",
        description: "Lot de 3 éponges biodégradables",
        image: "/illustration/lessive 2.jpg",
        price: 6.99,
        stock: 60,
        Category: {
            connect: {
                name: "Maison & Entretien",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
    {
        name: "Spray multi-usage",
        description: "Nettoyant écologique tout usage",
        image: "/illustration/brosse-a-dent.jpg",
        price: 4.99,
        stock: 50,
        Category: {
            connect: {
                name: "Maison & Entretien",
            }
        },
        Vendor: {
            connect: {
                email: "vendor@example.com",
            }
        }
    },
];
