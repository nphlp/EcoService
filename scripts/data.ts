import { FruitType } from "@actions/(examples)/Fruit";
import { AccountType } from "@actions/types/Account";
import { UserType } from "@actions/types/User";

interface UserData {
    name: UserType["name"];
    email: UserType["email"];
    emailVerified: UserType["emailVerified"];
    role: UserType["role"];
    password: AccountType["password"];
}

export const userData: UserData[] = [
    {
        name: "User Lastname",
        email: "user@example.com",
        emailVerified: true,
        role: "USER",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Vendor Lastname",
        email: "vendor@example.com",
        emailVerified: true,
        role: "VENDOR",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Employee Lastname",
        email: "employee@example.com",
        emailVerified: true,
        role: "EMPLOYEE",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
    {
        name: "Admin Lastname",
        email: "admin@example.com",
        emailVerified: true,
        role: "ADMIN",
        password:
            "90e263724fdae11e158546bb8fe3e245:aa3cff1d8e5069c3697e8ea9e9adcfc6106b1f9abd31ebbf571843316cc48a21b289926b37b1ae55866a366fec84ed4fbe7af8ad9af66fa4c2977a694a13fdb1",
    },
];

interface FruitData {
    name: FruitType["name"];
    description: FruitType["description"];
    image: FruitType["image"];
}

export const fruitData: FruitData[] = [
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

interface CategoryData {
    name: string;
    description: string;
}

export const categoryData: CategoryData[] = [
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

interface ProductData {
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    category: string;
}

export const productData: ProductData[] = [
    // Fruits & Légumes
    {
        name: "Panier de fruits bio",
        description: "Assortiment de fruits de saison bio",
        image: "/illustration/produit 1.jpg",
        price: 25.99,
        stock: 50,
        category: "Fruits & Légumes",
    },
    {
        name: "Légumes locaux",
        description: "Mix de légumes frais de producteurs locaux",
        image: "/illustration/produit 2.jpg",
        price: 18.5,
        stock: 40,
        category: "Fruits & Légumes",
    },
    {
        name: "Herbes aromatiques",
        description: "Assortiment d'herbes fraîches bio",
        image: "/illustration/produit 3.jpg",
        price: 4.99,
        stock: 30,
        category: "Fruits & Légumes",
    },

    // Produits Laitiers
    {
        name: "Fromage fermier",
        description: "Fromage artisanal de vache",
        image: "/illustration/produit 4.jpg",
        price: 7.99,
        stock: 25,
        category: "Produits Laitiers",
    },
    {
        name: "Yaourt bio",
        description: "Pack de yaourts nature bio",
        image: "/illustration/produit 5.jpg",
        price: 4.5,
        stock: 60,
        category: "Produits Laitiers",
    },
    {
        name: "Beurre fermier",
        description: "Beurre traditionnel de baratte",
        image: "/illustration/coton 1.jpg",
        price: 3.99,
        stock: 45,
        category: "Produits Laitiers",
    },

    // Boulangerie
    {
        name: "Pain au levain",
        description: "Pain traditionnel au levain naturel",
        image: "/illustration/coton 2.jpg",
        price: 4.5,
        stock: 30,
        category: "Boulangerie",
    },
    {
        name: "Croissants",
        description: "Lot de 4 croissants pur beurre",
        image: "/illustration/coton 3.jpg",
        price: 6.99,
        stock: 40,
        category: "Boulangerie",
    },
    {
        name: "Baguette tradition",
        description: "Baguette artisanale à l'ancienne",
        image: "/illustration/cafe.jpg",
        price: 1.5,
        stock: 100,
        category: "Boulangerie",
    },

    // Viandes & Poissons
    {
        name: "Filet de bœuf",
        description: "Filet de bœuf local race Charolaise",
        image: "/illustration/eolienne.jpg",
        price: 32.99,
        stock: 20,
        category: "Viandes & Poissons",
    },
    {
        name: "Saumon frais",
        description: "Filet de saumon de l'Atlantique",
        image: "/illustration/espace 1.jpg",
        price: 24.99,
        stock: 25,
        category: "Viandes & Poissons",
    },
    {
        name: "Poulet fermier",
        description: "Poulet fermier Label Rouge",
        image: "/illustration/feuille.jpg",
        price: 15.99,
        stock: 30,
        category: "Viandes & Poissons",
    },

    // Épicerie
    {
        name: "Huile d'olive",
        description: "Huile d'olive extra vierge bio",
        image: "/illustration/pots.jpg",
        price: 12.99,
        stock: 40,
        category: "Épicerie",
    },
    {
        name: "Miel local",
        description: "Miel toutes fleurs local",
        image: "/illustration/pshit 1.jpg",
        price: 8.5,
        stock: 35,
        category: "Épicerie",
    },
    {
        name: "Pâtes artisanales",
        description: "Pâtes fraîches aux œufs",
        image: "/illustration/pshit 2.jpg",
        price: 5.99,
        stock: 50,
        category: "Épicerie",
    },

    // Boissons
    {
        name: "Vin rouge bio",
        description: "Vin rouge biodynamique local",
        image: "/illustration/produit 3.jpg",
        price: 15.99,
        stock: 60,
        category: "Boissons",
    },
    {
        name: "Jus de pomme",
        description: "Jus de pomme pressé artisanal",
        image: "/illustration/produit 4.jpg",
        price: 4.5,
        stock: 45,
        category: "Boissons",
    },
    {
        name: "Bière artisanale",
        description: "Bière blonde locale",
        image: "/illustration/produit 5.jpg",
        price: 3.99,
        stock: 70,
        category: "Boissons",
    },

    // Bio & Sans Gluten
    {
        name: "Farine sans gluten",
        description: "Farine de riz bio sans gluten",
        image: "/illustration/coton 1.jpg",
        price: 6.99,
        stock: 40,
        category: "Bio & Sans Gluten",
    },
    {
        name: "Granola bio",
        description: "Granola bio aux fruits secs",
        image: "/illustration/coton 2.jpg",
        price: 8.99,
        stock: 35,
        category: "Bio & Sans Gluten",
    },
    {
        name: "Cookies vegan",
        description: "Cookies bio sans gluten vegan",
        image: "/illustration/coton 3.jpg",
        price: 5.5,
        stock: 45,
        category: "Bio & Sans Gluten",
    },

    // Surgelés
    {
        name: "Légumes surgelés",
        description: "Mix de légumes bio surgelés",
        image: "/illustration/cafe.jpg",
        price: 6.99,
        stock: 50,
        category: "Surgelés",
    },
    {
        name: "Poisson surgelé",
        description: "Filets de cabillaud surgelés",
        image: "/illustration/eolienne.jpg",
        price: 14.99,
        stock: 30,
        category: "Surgelés",
    },
    {
        name: "Glace artisanale",
        description: "Crème glacée vanille de Madagascar",
        image: "/illustration/espace 1.jpg",
        price: 7.99,
        stock: 25,
        category: "Surgelés",
    },

    // Hygiène & Beauté
    {
        name: "Savon naturel",
        description: "Savon artisanal aux huiles essentielles",
        image: "/illustration/terre-main.jpg",
        price: 5.99,
        stock: 55,
        category: "Hygiène & Beauté",
    },
    {
        name: "Shampooing solide",
        description: "Shampooing solide bio zéro déchet",
        image: "/illustration/produit 1.jpg",
        price: 8.99,
        stock: 40,
        category: "Hygiène & Beauté",
    },
    {
        name: "Crème visage",
        description: "Crème hydratante bio",
        image: "/illustration/produit 2.jpg",
        price: 19.99,
        stock: 30,
        category: "Hygiène & Beauté",
    },

    // Maison & Entretien
    {
        name: "Lessive écologique",
        description: "Lessive naturelle concentrée",
        image: "/illustration/lessive 1.jpg",
        price: 12.99,
        stock: 45,
        category: "Maison & Entretien",
    },
    {
        name: "Éponges naturelles",
        description: "Lot de 3 éponges biodégradables",
        image: "/illustration/lessive 2.jpg",
        price: 6.99,
        stock: 60,
        category: "Maison & Entretien",
    },
    {
        name: "Spray multi-usage",
        description: "Nettoyant écologique tout usage",
        image: "/illustration/brosse-a-dent.jpg",
        price: 4.99,
        stock: 50,
        category: "Maison & Entretien",
    },
];

interface ArticleData {
    title: string;
    authorEmail: string;
    contents: ContentData[];
}

interface ContentData {
    content: string;
    image: string;
}

export const articleData: ArticleData[] = [
    {
        title: "Vivre écologiquement au quotidien",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "L'écologie commence par de petits gestes quotidiens. Chaque action compte pour préserver notre planète.",
                image: "terre-main.jpg"
            },
            {
                content: "Réduire sa consommation d'eau et d'électricité est un premier pas important vers un mode de vie plus durable.",
                image: "eolienne.jpg"
            },
            {
                content: "Privilégier les produits locaux et de saison permet de réduire considérablement son empreinte carbone.",
                image: "produit 1.jpg"
            }
        ]
    },
    {
        title: "Les alternatives aux produits ménagers chimiques",
        authorEmail: "vendor@example.com",
        contents: [
            {
                content: "Les produits ménagers naturels sont tout aussi efficaces que leurs équivalents chimiques, sans les dangers pour la santé.",
                image: "lessive 1.jpg"
            },
            {
                content: "Le vinaigre blanc, le bicarbonate de soude et le savon noir sont la base d'une maison propre et écologique.",
                image: "lessive 2.jpg"
            },
            {
                content: "Fabriquer ses propres produits ménagers permet de réduire considérablement les déchets plastiques.",
                image: "produit 2.jpg"
            }
        ]
    },
    {
        title: "Jardinage écologique et permaculture",
        authorEmail: "user@example.com",
        contents: [
            {
                content: "La permaculture s'inspire des écosystèmes naturels pour créer des jardins productifs et durables.",
                image: "feuille.jpg"
            },
            {
                content: "Le compostage transforme les déchets organiques en un amendement précieux pour le sol.",
                image: "pots.jpg"
            },
            {
                content: "Les plantes compagnes s'entraident naturellement, réduisant le besoin en pesticides.",
                image: "produit 3.jpg"
            }
        ]
    },
    {
        title: "Réduire son empreinte carbone au quotidien",
        authorEmail: "employee@example.com",
        contents: [
            {
                content: "Les transports représentent une part importante de notre empreinte carbone. Privilégier le vélo ou les transports en commun fait une réelle différence.",
                image: "espace 1.jpg"
            },
            {
                content: "Réduire sa consommation de viande, même partiellement, a un impact significatif sur les émissions de gaz à effet de serre.",
                image: "produit 4.jpg"
            },
            {
                content: "Choisir des appareils électroménagers économes en énergie permet de réduire sa consommation sur le long terme.",
                image: "produit 5.jpg"
            }
        ]
    },
    {
        title: "Hygiène personnelle zéro déchet",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Les alternatives réutilisables aux produits d'hygiène jetables permettent de réduire considérablement ses déchets.",
                image: "brosse-a-dent.jpg"
            },
            {
                content: "Les cosmétiques solides durent plus longtemps et ne nécessitent pas d'emballage plastique.",
                image: "coton 1.jpg"
            },
            {
                content: "Fabriquer ses propres cosmétiques permet de contrôler les ingrédients et d'éviter les substances nocives.",
                image: "coton 2.jpg"
            }
        ]
    }
];

interface DoItYourselfData {
    title: string;
    authorEmail: string;
    contents: ContentData[];
}

export const doItYourselfData: DoItYourselfData[] = [
    {
        title: "Fabriquer son propre savon naturel",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Pour fabriquer votre savon, vous aurez besoin d'huile d'olive, d'huile de coco, de soude caustique et d'huiles essentielles de votre choix.",
                image: "produit 1.jpg"
            },
            {
                content: "Mélangez les huiles chauffées avec la solution de soude, en remuant jusqu'à obtenir la trace. Ajoutez ensuite les huiles essentielles.",
                image: "produit 2.jpg"
            },
            {
                content: "Versez dans un moule et laissez reposer 24 à 48 heures avant de démouler. Laissez sécher 4 à 6 semaines avant utilisation.",
                image: "produit 3.jpg"
            }
        ]
    },
    {
        title: "Créer un potager vertical avec des palettes",
        authorEmail: "vendor@example.com",
        contents: [
            {
                content: "Récupérez une palette en bois non traitée et poncez-la pour éviter les échardes. Appliquez une huile de lin pour la protéger.",
                image: "pots.jpg"
            },
            {
                content: "Fixez un géotextile à l'arrière et sur les côtés pour créer des poches. Remplissez ces poches de terreau de qualité.",
                image: "feuille.jpg"
            },
            {
                content: "Plantez des herbes aromatiques, des fraises ou des salades dans les poches. Arrosez régulièrement mais sans excès.",
                image: "terre-main.jpg"
            }
        ]
    },
    {
        title: "Fabriquer une lessive écologique maison",
        authorEmail: "user@example.com",
        contents: [
            {
                content: "Râpez 50g de savon de Marseille pur et faites-le fondre dans 1L d'eau chaude. Ajoutez 1 cuillère à soupe de bicarbonate de soude.",
                image: "lessive 1.jpg"
            },
            {
                content: "Ajoutez 1 cuillère à soupe de cristaux de soude et 10 gouttes d'huile essentielle de lavande ou de citron pour parfumer.",
                image: "lessive 2.jpg"
            },
            {
                content: "Laissez refroidir et versez dans une bouteille. Secouez avant chaque utilisation et utilisez environ 1/2 verre par machine.",
                image: "produit 4.jpg"
            }
        ]
    },
    {
        title: "Créer un composteur d'appartement",
        authorEmail: "employee@example.com",
        contents: [
            {
                content: "Procurez-vous deux seaux en plastique de taille identique. Percez des trous dans le fond du premier pour l'aération et le drainage.",
                image: "produit 5.jpg"
            },
            {
                content: "Placez le seau percé dans le second qui servira à récupérer le liquide. Ajoutez une couche de carton, puis des vers de compost.",
                image: "coton 1.jpg"
            },
            {
                content: "Ajoutez vos déchets organiques en petits morceaux et couvrez d'une couche de matière sèche (papier journal, carton). Fermez avec un couvercle.",
                image: "coton 2.jpg"
            }
        ]
    },
    {
        title: "Fabriquer un tawashi (éponge zéro déchet)",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Récupérez des chaussettes usagées ou des t-shirts et découpez-les en bandes d'environ 3 cm de large.",
                image: "coton 3.jpg"
            },
            {
                content: "Créez un métier à tisser avec une planche et des clous disposés en carré. Tendez 5 bandes dans un sens, puis tissez 5 autres bandes perpendiculairement.",
                image: "brosse-a-dent.jpg"
            },
            {
                content: "Nouez les extrémités ensemble et retirez délicatement du métier. Votre tawashi est prêt à l'emploi et lavable en machine.",
                image: "cafe.jpg"
            }
        ]
    }
];
