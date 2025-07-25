import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { StringToSlug } from "@utils/StringToSlug";

export const insertDIYs = async () => {
    try {
        for (const data of diyData) {
            await PrismaInstance.diy.create({ data });
        }
    } catch (error) {
        throw new Error("❌ Erreur lors de la création des DIYs -> " + (error as Error).message);
    }
};

export const diyData: Prisma.DiyCreateInput[] = [
    {
        title: "Fabriquer son propre savon naturel",
        slug: StringToSlug("Fabriquer son propre savon naturel"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Préparez votre mélange avec 500g d'huile d'olive, 200g d'huile de coco et 95g de soude caustique diluée dans 250ml d'eau froide. La soude transforme les huiles en savon par saponification. Portez des équipements de protection et travaillez dans un espace bien ventilé. Les huiles apportent leurs propriétés nourrissantes spécifiques.",
                        image: "/illustration/produit 1.webp",
                    },
                    {
                        content:
                            "Chauffez doucement les huiles jusqu'à 40°C dans un récipient en inox ou en verre. Versez progressivement la solution de soude tout en mélangeant énergiquement avec un mixeur plongeant. Continuez jusqu'à la trace, puis incorporez vos huiles essentielles préférées pour parfumer naturellement.",
                        image: "/illustration/produit 2.webp",
                    },
                    {
                        content:
                            "Versez la préparation dans un moule en silicone ou en bois doublé de papier cuisson. Laissez reposer 48h à température ambiante avant de démouler. Un temps de séchage de 4 à 6 semaines est nécessaire pour obtenir un savon doux et stable.",
                        image: "/illustration/produit 3.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Créer un potager vertical avec des palettes",
        slug: StringToSlug("Créer un potager vertical avec des palettes"),
        Author: {
            connect: {
                email: "vendor@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Sélectionnez une palette portant le marquage HT (traitement thermique) et poncez-la soigneusement pour éviter les échardes. Appliquez deux couches d'huile de lin pure pour protéger le bois des intempéries. Cette préparation garantit la durabilité de votre potager et la sécurité de vos futures récoltes.",
                        image: "/illustration/pots.webp",
                    },
                    {
                        content:
                            "Découpez le géotextile en rectangles légèrement plus grands que les espaces entre les lattes. Agrafez-le solidement à l'arrière et sur les côtés pour former des poches profondes. Remplissez de terreau spécial potager enrichi en compost, en tassant modérément pour préserver l'aération.",
                        image: "/illustration/feuille.webp",
                    },
                    {
                        content:
                            "Organisez vos plantations selon les besoins en eau : les plantes gourmandes en bas, les herbes aromatiques résistantes en haut. Installez un système d'arrosage goutte-à-goutte pour une distribution uniforme. En été, surveillez l'humidité quotidiennement car les poches sèchent rapidement.",
                        image: "/illustration/terre-main.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Fabriquer une lessive écologique maison",
        slug: StringToSlug("Fabriquer une lessive écologique maison"),
        Author: {
            connect: {
                email: "user@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Râpez finement 50g de véritable savon de Marseille (72% d'huile d'olive minimum) et faites-le fondre dans 1L d'eau chaude à 60°C. Ajoutez une cuillère à soupe de bicarbonate de soude qui adoucit l'eau et renforce le pouvoir nettoyant. Remuez régulièrement pour éviter les grumeaux.",
                        image: "/illustration/lessive 1.webp",
                    },
                    {
                        content:
                            "Incorporez une cuillère à soupe de cristaux de soude pour leur action dégraissante puissante, particulièrement efficace sur les taches tenaces. Ajoutez 10 gouttes d'huile essentielle de lavande ou de citron pour leurs propriétés désinfectantes et leur parfum naturel agréable.",
                        image: "/illustration/lessive 2.webp",
                    },
                    {
                        content:
                            "Transvasez la préparation refroidie dans un contenant en verre ou en plastique recyclé avec bouchon doseur. Utilisez un demi-verre (100ml) par machine. Cette lessive naturelle convient à tous types de machines et se conserve un mois à température ambiante.",
                        image: "/illustration/produit 4.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Créer un composteur d'appartement",
        slug: StringToSlug("Créer un composteur d'appartement"),
        Author: {
            connect: {
                email: "employee@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Choisissez deux seaux identiques de 10-15L avec couvercles hermétiques. Dans le premier, percez une vingtaine de trous de 5-8mm uniformément répartis sur le fond pour assurer drainage et aération. Collez une moustiquaire fine sous le couvercle pour éviter les insectes tout en maintenant la ventilation.",
                        image: "/illustration/produit 5.webp",
                    },
                    {
                        content:
                            "Emboîtez le seau percé dans le second qui récupérera le lixiviat, un excellent engrais liquide à diluer. Tapissez le fond du seau supérieur avec du carton qui retient les vers et fournit la première matière carbonée. Ajoutez 500g de vers Eisenia fetida.",
                        image: "/illustration/coton 1.webp",
                    },
                    {
                        content:
                            "Découpez vos déchets organiques en morceaux de 2cm maximum pour accélérer leur décomposition. Évitez agrumes, ail, oignon, produits laitiers et viande. Après chaque ajout, couvrez de matière sèche (papier, carton). Maintenez l'humidité comme une éponge essorée.",
                        image: "/illustration/coton 2.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Fabriquer un tawashi (éponge zéro déchet)",
        slug: StringToSlug("Fabriquer un tawashi (éponge zéro déchet)"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Sélectionnez des chaussettes ou t-shirts en coton usagés, évitez les tissus synthétiques qui libèrent des microplastiques. Découpez des bandes régulières de 3cm de large. Les chaussettes sont idéales car déjà tubulaires, pour les t-shirts commencez par créer un tube en coupant sous les aisselles.",
                        image: "/illustration/coton 3.webp",
                    },
                    {
                        content:
                            "Créez votre métier à tisser sur une planche de bois de 20x20cm en plantant 16 clous en carré, 4 par côté espacés de 2cm. Tendez 5 bandes parallèlement entre les clous opposés, puis tissez 5 autres perpendiculairement en alternant dessus/dessous à chaque croisement.",
                        image: "/illustration/brosse-a-dent.webp",
                    },
                    {
                        content:
                            "Une fois le tissage terminé, nouez les boucles adjacentes entre elles en commençant par un coin. Maintenez une tension uniforme pour garder la forme carrée. Détachez délicatement du support. Votre tawashi peut être lavé en machine à 60°C et durera plusieurs mois.",
                        image: "/illustration/cafe.webp",
                    },
                ],
            },
        },
    },
];
