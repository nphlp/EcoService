import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { StringToSlug } from "@utils/StringToSlug";

export const insertArticles = async () => {
    try {
        for (const data of articleData) {
            await PrismaInstance.article.create({ data });
        }
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des articles -> " + (error as Error).message);
    }
};

export const articleData: Prisma.ArticleCreateInput[] = [
    {
        title: "Vivre écologiquement au quotidien",
        slug: StringToSlug("Vivre écologiquement au quotidien"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/illustration/terre-main.webp",
                        content:
                            "L'écologie au quotidien se construit par des gestes simples mais impactants. La transition écologique n'est pas qu'une notion abstraite, elle se concrétise dans nos choix quotidiens. Que ce soit dans notre consommation, nos déplacements ou notre gestion des déchets, chaque action contribue à la préservation de notre environnement. L'effet cumulé de ces gestes individuels crée un changement significatif.",
                    },
                    {
                        image: "/illustration/eolienne.webp",
                        content:
                            "La gestion responsable de l'eau et de l'électricité est fondamentale. Installez des mousseurs sur vos robinets, privilégiez les douches aux bains, et fermez l'eau pendant le brossage des dents. Pour l'électricité, optez pour des ampoules LED, éteignez les appareils en veille et isolez efficacement votre logement. Ces habitudes réduisent votre impact environnemental et vos factures.",
                    },
                    {
                        image: "/illustration/produit 1.webp",
                        content:
                            "Les produits locaux et de saison offrent de nombreux avantages écologiques. Ils nécessitent moins de transport, donc moins d'émissions de CO2. Cultivés naturellement, ils sont plus savoureux et nutritifs car récoltés à maturité. Cette approche soutient l'économie locale, préserve la biodiversité et maintient les traditions agricoles de nos régions.",
                    },
                ],
            },
        },
    },
    {
        title: "Les alternatives aux produits ménagers chimiques",
        slug: StringToSlug("Les alternatives aux produits ménagers chimiques"),
        Author: {
            connect: {
                email: "vendor@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/illustration/lessive 1.webp",
                        content:
                            "Les produits ménagers naturels rivalisent efficacement avec leurs équivalents chimiques. Ils évitent l'exposition aux substances toxiques qui peuvent provoquer allergies et irritations. Ces alternatives écologiques sont biodégradables et respectueuses de l'environnement, réduisant la pollution des eaux et la production de déchets plastiques.",
                    },
                    {
                        image: "/illustration/lessive 2.webp",
                        content:
                            "Le trio vinaigre blanc, bicarbonate et savon noir forme la base d'un nettoyage écologique efficace. Le vinaigre désinfecte et détartre, le bicarbonate absorbe les odeurs et nettoie sans rayer, tandis que le savon noir dégraisse puissamment. Ces produits polyvalents s'utilisent purs ou combinés selon les besoins.",
                    },
                    {
                        image: "/illustration/produit 2.webp",
                        content:
                            "La fabrication maison des produits ménagers présente de multiples avantages. Elle réduit les emballages plastiques, permet de contrôler les ingrédients utilisés et génère des économies substantielles. Les recettes simples et personnalisables s'adaptent aux besoins spécifiques de chaque foyer, garantissant une efficacité optimale.",
                    },
                ],
            },
        },
    },
    {
        title: "Jardinage écologique et permaculture",
        slug: StringToSlug("Jardinage écologique et permaculture"),
        Author: {
            connect: {
                email: "user@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/illustration/feuille.webp",
                        content:
                            "La permaculture réinvente le jardinage en s'inspirant des écosystèmes naturels. Cette approche crée des espaces productifs et autonomes qui nécessitent peu d'entretien. En observant les interactions naturelles entre les plantes, le sol et les insectes, nous pouvons concevoir des jardins qui s'auto-régulent et produisent des aliments sains toute l'année.",
                    },
                    {
                        image: "/illustration/pots.webp",
                        content:
                            "Le compostage est au cœur de la permaculture, transformant les déchets organiques en un amendement riche en nutriments. Ce processus naturel améliore la structure du sol, stimule la vie microbienne et fournit aux plantes les éléments nutritifs nécessaires. Un bon compost réduit les besoins en fertilisants et optimise la rétention d'eau.",
                    },
                    {
                        image: "/illustration/produit 3.webp",
                        content:
                            "Les associations de plantes compagnes constituent une stratégie efficace pour un jardin résilient. Certaines plantes repoussent naturellement les parasites, d'autres enrichissent le sol en azote ou attirent les pollinisateurs. Ces synergies naturelles permettent de réduire, voire d'éliminer, l'utilisation de pesticides tout en augmentant la biodiversité.",
                    },
                ],
            },
        },
    },
    {
        title: "Réduire son empreinte carbone au quotidien",
        slug: StringToSlug("Réduire son empreinte carbone au quotidien"),
        Author: {
            connect: {
                email: "employee@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/illustration/espace 1.webp",
                        content:
                            "Les transports représentent une part majeure de notre empreinte carbone individuelle. Privilégier le vélo, la marche ou les transports en commun réduit significativement nos émissions de CO2. Le covoiturage et l'autopartage offrent des alternatives flexibles, tandis que le télétravail, quand possible, évite des déplacements inutiles.",
                    },
                    {
                        image: "/illustration/produit 4.webp",
                        content:
                            "L'alimentation influence fortement notre impact environnemental. Réduire sa consommation de viande, même partiellement, diminue considérablement les émissions de gaz à effet de serre. Privilégier les protéines végétales et les produits locaux de saison permet de maintenir une alimentation équilibrée tout en respectant la planète.",
                    },
                    {
                        image: "/illustration/produit 5.webp",
                        content:
                            "La consommation d'énergie domestique peut être optimisée par des choix d'équipements judicieux. Les appareils électroménagers de classe énergétique A+++ consomment jusqu'à 60% moins d'énergie. La programmation du chauffage, l'isolation efficace et l'utilisation d'ampoules LED réduisent durablement notre impact énergétique.",
                    },
                ],
            },
        },
    },
    {
        title: "Hygiène personnelle zéro déchet",
        slug: StringToSlug("Hygiène personnelle zéro déchet"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/illustration/brosse-a-dent.webp",
                        content:
                            "Les alternatives réutilisables révolutionnent notre routine d'hygiène quotidienne. Les cotons démaquillants lavables, brosses à dents en bambou et protections périodiques réutilisables réduisent drastiquement nos déchets. Ces solutions durables, plus économiques à long terme, évitent l'accumulation de déchets plastiques tout en préservant notre confort.",
                    },
                    {
                        image: "/illustration/coton 1.webp",
                        content:
                            "Les cosmétiques solides représentent une innovation majeure dans la beauté durable. Shampooings, savons et déodorants en format solide éliminent les emballages plastiques superflus. Plus concentrés que leurs équivalents liquides, ils durent plus longtemps et facilitent le transport. Leur fabrication nécessite moins d'eau et d'énergie.",
                    },
                    {
                        image: "/illustration/coton 2.webp",
                        content:
                            "La fabrication maison de cosmétiques permet un contrôle total des ingrédients utilisés. En choisissant des composants naturels et biologiques, nous évitons les substances controversées présentes dans les produits industriels. Cette approche personnalisée s'adapte à nos besoins spécifiques tout en réduisant notre impact environnemental.",
                    },
                ],
            },
        },
    },
];
