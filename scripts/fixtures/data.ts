import { AccountModel } from "@class/AccountClass";
import { FruitModel } from "@class/FruitClass";
import { UserModel } from "@class/UserClass";

interface UserData {
    name: UserModel["name"];
    email: UserModel["email"];
    emailVerified: UserModel["emailVerified"];
    role: UserModel["role"];
    password: AccountModel["password"];
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
    name: FruitModel["name"];
    description: FruitModel["description"];
    image: FruitModel["image"];
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
                content: "L'écologie au quotidien se construit par des gestes simples mais impactants. La transition écologique n'est pas qu'une notion abstraite, elle se concrétise dans nos choix quotidiens. Que ce soit dans notre consommation, nos déplacements ou notre gestion des déchets, chaque action contribue à la préservation de notre environnement. L'effet cumulé de ces gestes individuels crée un changement significatif.",
                image: "terre-main.jpg"
            },
            {
                content: "La gestion responsable de l'eau et de l'électricité est fondamentale. Installez des mousseurs sur vos robinets, privilégiez les douches aux bains, et fermez l'eau pendant le brossage des dents. Pour l'électricité, optez pour des ampoules LED, éteignez les appareils en veille et isolez efficacement votre logement. Ces habitudes réduisent votre impact environnemental et vos factures.",
                image: "eolienne.jpg"
            },
            {
                content: "Les produits locaux et de saison offrent de nombreux avantages écologiques. Ils nécessitent moins de transport, donc moins d'émissions de CO2. Cultivés naturellement, ils sont plus savoureux et nutritifs car récoltés à maturité. Cette approche soutient l'économie locale, préserve la biodiversité et maintient les traditions agricoles de nos régions.",
                image: "produit 1.jpg"
            }
        ]
    },
    {
        title: "Les alternatives aux produits ménagers chimiques",
        authorEmail: "vendor@example.com",
        contents: [
            {
                content: "Les produits ménagers naturels rivalisent efficacement avec leurs équivalents chimiques. Ils évitent l'exposition aux substances toxiques qui peuvent provoquer allergies et irritations. Ces alternatives écologiques sont biodégradables et respectueuses de l'environnement, réduisant la pollution des eaux et la production de déchets plastiques.",
                image: "lessive 1.jpg"
            },
            {
                content: "Le trio vinaigre blanc, bicarbonate et savon noir forme la base d'un nettoyage écologique efficace. Le vinaigre désinfecte et détartre, le bicarbonate absorbe les odeurs et nettoie sans rayer, tandis que le savon noir dégraisse puissamment. Ces produits polyvalents s'utilisent purs ou combinés selon les besoins.",
                image: "lessive 2.jpg"
            },
            {
                content: "La fabrication maison des produits ménagers présente de multiples avantages. Elle réduit les emballages plastiques, permet de contrôler les ingrédients utilisés et génère des économies substantielles. Les recettes simples et personnalisables s'adaptent aux besoins spécifiques de chaque foyer, garantissant une efficacité optimale.",
                image: "produit 2.jpg"
            }
        ]
    },
    {
        title: "Jardinage écologique et permaculture",
        authorEmail: "user@example.com",
        contents: [
            {
                content: "La permaculture réinvente le jardinage en s'inspirant des écosystèmes naturels. Cette approche crée des espaces productifs et autonomes qui nécessitent peu d'entretien. En observant les interactions naturelles entre les plantes, le sol et les insectes, nous pouvons concevoir des jardins qui s'auto-régulent et produisent des aliments sains toute l'année.",
                image: "feuille.jpg"
            },
            {
                content: "Le compostage est au cœur de la permaculture, transformant les déchets organiques en un amendement riche en nutriments. Ce processus naturel améliore la structure du sol, stimule la vie microbienne et fournit aux plantes les éléments nutritifs nécessaires. Un bon compost réduit les besoins en fertilisants et optimise la rétention d'eau.",
                image: "pots.jpg"
            },
            {
                content: "Les associations de plantes compagnes constituent une stratégie efficace pour un jardin résilient. Certaines plantes repoussent naturellement les parasites, d'autres enrichissent le sol en azote ou attirent les pollinisateurs. Ces synergies naturelles permettent de réduire, voire d'éliminer, l'utilisation de pesticides tout en augmentant la biodiversité.",
                image: "produit 3.jpg"
            }
        ]
    },
    {
        title: "Réduire son empreinte carbone au quotidien",
        authorEmail: "employee@example.com",
        contents: [
            {
                content: "Les transports représentent une part majeure de notre empreinte carbone individuelle. Privilégier le vélo, la marche ou les transports en commun réduit significativement nos émissions de CO2. Le covoiturage et l'autopartage offrent des alternatives flexibles, tandis que le télétravail, quand possible, évite des déplacements inutiles.",
                image: "espace 1.jpg"
            },
            {
                content: "L'alimentation influence fortement notre impact environnemental. Réduire sa consommation de viande, même partiellement, diminue considérablement les émissions de gaz à effet de serre. Privilégier les protéines végétales et les produits locaux de saison permet de maintenir une alimentation équilibrée tout en respectant la planète.",
                image: "produit 4.jpg"
            },
            {
                content: "La consommation d'énergie domestique peut être optimisée par des choix d'équipements judicieux. Les appareils électroménagers de classe énergétique A+++ consomment jusqu'à 60% moins d'énergie. La programmation du chauffage, l'isolation efficace et l'utilisation d'ampoules LED réduisent durablement notre impact énergétique.",
                image: "produit 5.jpg"
            }
        ]
    },
    {
        title: "Hygiène personnelle zéro déchet",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Les alternatives réutilisables révolutionnent notre routine d'hygiène quotidienne. Les cotons démaquillants lavables, brosses à dents en bambou et protections périodiques réutilisables réduisent drastiquement nos déchets. Ces solutions durables, plus économiques à long terme, évitent l'accumulation de déchets plastiques tout en préservant notre confort.",
                image: "brosse-a-dent.jpg"
            },
            {
                content: "Les cosmétiques solides représentent une innovation majeure dans la beauté durable. Shampooings, savons et déodorants en format solide éliminent les emballages plastiques superflus. Plus concentrés que leurs équivalents liquides, ils durent plus longtemps et facilitent le transport. Leur fabrication nécessite moins d'eau et d'énergie.",
                image: "coton 1.jpg"
            },
            {
                content: "La fabrication maison de cosmétiques permet un contrôle total des ingrédients utilisés. En choisissant des composants naturels et biologiques, nous évitons les substances controversées présentes dans les produits industriels. Cette approche personnalisée s'adapte à nos besoins spécifiques tout en réduisant notre impact environnemental.",
                image: "coton 2.jpg"
            }
        ]
    }
];

interface DiyData {
    title: string;
    authorEmail: string;
    contents: ContentData[];
}

export const diyData: DiyData[] = [
    {
        title: "Fabriquer son propre savon naturel",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Préparez votre mélange avec 500g d'huile d'olive, 200g d'huile de coco et 95g de soude caustique diluée dans 250ml d'eau froide. La soude transforme les huiles en savon par saponification. Portez des équipements de protection et travaillez dans un espace bien ventilé. Les huiles apportent leurs propriétés nourrissantes spécifiques.",
                image: "produit 1.jpg"
            },
            {
                content: "Chauffez doucement les huiles jusqu'à 40°C dans un récipient en inox ou en verre. Versez progressivement la solution de soude tout en mélangeant énergiquement avec un mixeur plongeant. Continuez jusqu'à la trace, puis incorporez vos huiles essentielles préférées pour parfumer naturellement.",
                image: "produit 2.jpg"
            },
            {
                content: "Versez la préparation dans un moule en silicone ou en bois doublé de papier cuisson. Laissez reposer 48h à température ambiante avant de démouler. Un temps de séchage de 4 à 6 semaines est nécessaire pour obtenir un savon doux et stable.",
                image: "produit 3.jpg"
            }
        ]
    },
    {
        title: "Créer un potager vertical avec des palettes",
        authorEmail: "vendor@example.com",
        contents: [
            {
                content: "Sélectionnez une palette portant le marquage HT (traitement thermique) et poncez-la soigneusement pour éviter les échardes. Appliquez deux couches d'huile de lin pure pour protéger le bois des intempéries. Cette préparation garantit la durabilité de votre potager et la sécurité de vos futures récoltes.",
                image: "pots.jpg"
            },
            {
                content: "Découpez le géotextile en rectangles légèrement plus grands que les espaces entre les lattes. Agrafez-le solidement à l'arrière et sur les côtés pour former des poches profondes. Remplissez de terreau spécial potager enrichi en compost, en tassant modérément pour préserver l'aération.",
                image: "feuille.jpg"
            },
            {
                content: "Organisez vos plantations selon les besoins en eau : les plantes gourmandes en bas, les herbes aromatiques résistantes en haut. Installez un système d'arrosage goutte-à-goutte pour une distribution uniforme. En été, surveillez l'humidité quotidiennement car les poches sèchent rapidement.",
                image: "terre-main.jpg"
            }
        ]
    },
    {
        title: "Fabriquer une lessive écologique maison",
        authorEmail: "user@example.com",
        contents: [
            {
                content: "Râpez finement 50g de véritable savon de Marseille (72% d'huile d'olive minimum) et faites-le fondre dans 1L d'eau chaude à 60°C. Ajoutez une cuillère à soupe de bicarbonate de soude qui adoucit l'eau et renforce le pouvoir nettoyant. Remuez régulièrement pour éviter les grumeaux.",
                image: "lessive 1.jpg"
            },
            {
                content: "Incorporez une cuillère à soupe de cristaux de soude pour leur action dégraissante puissante, particulièrement efficace sur les taches tenaces. Ajoutez 10 gouttes d'huile essentielle de lavande ou de citron pour leurs propriétés désinfectantes et leur parfum naturel agréable.",
                image: "lessive 2.jpg"
            },
            {
                content: "Transvasez la préparation refroidie dans un contenant en verre ou en plastique recyclé avec bouchon doseur. Utilisez un demi-verre (100ml) par machine. Cette lessive naturelle convient à tous types de machines et se conserve un mois à température ambiante.",
                image: "produit 4.jpg"
            }
        ]
    },
    {
        title: "Créer un composteur d'appartement",
        authorEmail: "employee@example.com",
        contents: [
            {
                content: "Choisissez deux seaux identiques de 10-15L avec couvercles hermétiques. Dans le premier, percez une vingtaine de trous de 5-8mm uniformément répartis sur le fond pour assurer drainage et aération. Collez une moustiquaire fine sous le couvercle pour éviter les insectes tout en maintenant la ventilation.",
                image: "produit 5.jpg"
            },
            {
                content: "Emboîtez le seau percé dans le second qui récupérera le lixiviat, un excellent engrais liquide à diluer. Tapissez le fond du seau supérieur avec du carton qui retient les vers et fournit la première matière carbonée. Ajoutez 500g de vers Eisenia fetida.",
                image: "coton 1.jpg"
            },
            {
                content: "Découpez vos déchets organiques en morceaux de 2cm maximum pour accélérer leur décomposition. Évitez agrumes, ail, oignon, produits laitiers et viande. Après chaque ajout, couvrez de matière sèche (papier, carton). Maintenez l'humidité comme une éponge essorée.",
                image: "coton 2.jpg"
            }
        ]
    },
    {
        title: "Fabriquer un tawashi (éponge zéro déchet)",
        authorEmail: "admin@example.com",
        contents: [
            {
                content: "Sélectionnez des chaussettes ou t-shirts en coton usagés, évitez les tissus synthétiques qui libèrent des microplastiques. Découpez des bandes régulières de 3cm de large. Les chaussettes sont idéales car déjà tubulaires, pour les t-shirts commencez par créer un tube en coupant sous les aisselles.",
                image: "coton 3.jpg"
            },
            {
                content: "Créez votre métier à tisser sur une planche de bois de 20x20cm en plantant 16 clous en carré, 4 par côté espacés de 2cm. Tendez 5 bandes parallèlement entre les clous opposés, puis tissez 5 autres perpendiculairement en alternant dessus/dessous à chaque croisement.",
                image: "brosse-a-dent.jpg"
            },
            {
                content: "Une fois le tissage terminé, nouez les boucles adjacentes entre elles en commençant par un coin. Maintenez une tension uniforme pour garder la forme carrée. Détachez délicatement du support. Votre tawashi peut être lavé en machine à 60°C et durera plusieurs mois.",
                image: "cafe.jpg"
            }
        ]
    }
];
