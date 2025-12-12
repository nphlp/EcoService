import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { stringToSlug } from "@utils/string-format";

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
        slug: stringToSlug("Fabriquer son propre savon naturel"),
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
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                    },
                    {
                        content:
                            "Chauffez doucement les huiles jusqu'à 40°C dans un récipient en inox ou en verre. Versez progressivement la solution de soude tout en mélangeant énergiquement avec un mixeur plongeant. Continuez jusqu'à la trace, puis incorporez vos huiles essentielles préférées pour parfumer naturellement.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Versez la préparation dans un moule en silicone ou en bois doublé de papier cuisson. Laissez reposer 48h à température ambiante avant de démouler. Un temps de séchage de 4 à 6 semaines est nécessaire pour obtenir un savon doux et stable.",
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Créer un potager vertical avec des palettes",
        slug: stringToSlug("Créer un potager vertical avec des palettes"),
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
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Découpez le géotextile en rectangles légèrement plus grands que les espaces entre les lattes. Agrafez-le solidement à l'arrière et sur les côtés pour former des poches profondes. Remplissez de terreau spécial potager enrichi en compost, en tassant modérément pour préserver l'aération.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Organisez vos plantations selon les besoins en eau : les plantes gourmandes en bas, les herbes aromatiques résistantes en haut. Installez un système d'arrosage goutte-à-goutte pour une distribution uniforme. En été, surveillez l'humidité quotidiennement car les poches sèchent rapidement.",
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Fabriquer une lessive écologique maison",
        slug: stringToSlug("Fabriquer une lessive écologique maison"),
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
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                    },
                    {
                        content:
                            "Incorporez une cuillère à soupe de cristaux de soude pour leur action dégraissante puissante, particulièrement efficace sur les taches tenaces. Ajoutez 10 gouttes d'huile essentielle de lavande ou de citron pour leurs propriétés désinfectantes et leur parfum naturel agréable.",
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                    },
                    {
                        content:
                            "Transvasez la préparation refroidie dans un contenant en verre ou en plastique recyclé avec bouchon doseur. Utilisez un demi-verre (100ml) par machine. Cette lessive naturelle convient à tous types de machines et se conserve un mois à température ambiante.",
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Créer un composteur d'appartement",
        slug: stringToSlug("Créer un composteur d'appartement"),
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
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Emboîtez le seau percé dans le second qui récupérera le lixiviat, un excellent engrais liquide à diluer. Tapissez le fond du seau supérieur avec du carton qui retient les vers et fournit la première matière carbonée. Ajoutez 500g de vers Eisenia fetida.",
                        image: "/images/illustrations/8wBP80yThLU.webp",
                    },
                    {
                        content:
                            "Découpez vos déchets organiques en morceaux de 2cm maximum pour accélérer leur décomposition. Évitez agrumes, ail, oignon, produits laitiers et viande. Après chaque ajout, couvrez de matière sèche (papier, carton). Maintenez l'humidité comme une éponge essorée.",
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Fabriquer un tawashi (éponge zéro déchet)",
        slug: stringToSlug("Fabriquer un tawashi (éponge zéro déchet)"),
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
                        image: "/images/illustrations/AcSjR6BmyqE.webp",
                    },
                    {
                        content:
                            "Créez votre métier à tisser sur une planche de bois de 20x20cm en plantant 16 clous en carré, 4 par côté espacés de 2cm. Tendez 5 bandes parallèlement entre les clous opposés, puis tissez 5 autres perpendiculairement en alternant dessus/dessous à chaque croisement.",
                        image: "/images/illustrations/KRkn9QXpd8I.webp",
                    },
                    {
                        content:
                            "Une fois le tissage terminé, nouez les boucles adjacentes entre elles en commençant par un coin. Maintenez une tension uniforme pour garder la forme carrée. Détachez délicatement du support. Votre tawashi peut être lavé en machine à 60°C et durera plusieurs mois.",
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Fabriquer un sac à vrac",
        slug: stringToSlug("Fabriquer un sac à vrac"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Découpez un rectangle de 30×40 cm dans un coton serré (chute de chemise ou drap). Surfilez ou surjetez les bords pour éviter l'effilochage et marquez les repères de couture au fer pour un montage net et durable.",
                        image: "/images/illustrations/8wBP80yThLU.webp",
                    },
                    {
                        content:
                            "Pliez le haut sur 2 cm pour former une coulisse, piquez au point droit en laissant une ouverture latérale. Renforcez les extrémités par un aller‑retour afin que la traction du cordon ne déchire pas la couture.",
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                    },
                    {
                        content:
                            "Passez une cordelette à l'aide d'une épingle à nourrice, puis faites un nœud plat ou ajoutez un bloque‑cordon récupéré. Étiquetez le poids à vide pour faciliter la tare au rayon vrac.",
                        image: "/images/illustrations/AcSjR6BmyqE.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Bee wrap maison",
        slug: stringToSlug("Bee wrap maison"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Découpez un carré de coton fin et prélavé. Disposez‑le sur une plaque recouverte de papier cuisson et répartissez délicatement de la cire d'abeille râpée ou en pastilles sur toute la surface.",
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                    },
                    {
                        content:
                            "Enfournez à 80°C jusqu'à fusion, puis étalez la cire au pinceau pour bien imprégner les fibres. Ajoutez une pointe de résine de pin et d'huile pour un meilleur pouvoir adhésif et une souplesse accrue.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Saisissez le tissu aux coins, laissez s'égoutter l'excédent et faites sécher quelques minutes. Utilisez pour couvrir des bols ou emballer des aliments, en évitant la chaleur directe et les viandes crues.",
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Spray multi-usage maison",
        slug: stringToSlug("Spray multi-usage maison"),
        Author: { connect: { email: "vendor@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Dans une bouteille propre, mélangez 400 ml d'eau, 100 ml de vinaigre blanc et une cuillère à soupe d'alcool ménager. Cette base dégraisse, désodorise et sèche rapidement sans laisser de film gras.",
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                    },
                    {
                        content:
                            "Pour l'effet antibactérien et le parfum, ajoutez 10 gouttes d'huile essentielle de citron ou tea tree (facultatif). Étiquetez le flacon et agitez avant chaque utilisation pour homogénéiser la solution.",
                        image: "/images/illustrations/EvP4FOhMniM.webp",
                    },
                    {
                        content:
                            "Pulvérisez sur plans de travail, inox et vitres, puis essuyez avec un chiffon microfibre. Évitez la pierre naturelle (marbre, granite non traité) et testez sur une zone discrète si doute.",
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Composteur bokashi maison",
        slug: stringToSlug("Composteur bokashi maison"),
        Author: { connect: { email: "employee@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Percez un seau équipé d'un robinet au bas pour drainer le jus, et insérez un panier perforé servant de faux‑fond. Nettoyez soigneusement l'ensemble pour garantir une fermentation optimale.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Ajoutez vos biodéchets en fines couches en saupoudrant de son inoculé (EM) à chaque ajout. Tassez légèrement pour limiter l'air et favoriser la fermentation anaérobie caractéristique du bokashi.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Fermez hermétiquement entre chaque apport. Récupérez régulièrement le jus (à diluer avant arrosage) et, après fermentation, enterrez la matière pour une maturation achevée directement au sol.",
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Filtre à café réutilisable",
        slug: stringToSlug("Filtre à café réutilisable"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Tracez un cône sur une toile de coton non blanchie (grammage moyen) et ajoutez 1 cm de marge de couture. Coupez dans le droit‑fil pour conserver la tenue au lavage.",
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                    },
                    {
                        content:
                            "Assemblez endroit contre endroit, piquez au point droit puis surfilez la couture pour éviter l'effilochage. Retournez, repassez et surpiquez le bord supérieur pour gagner en rigidité.",
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                    },
                    {
                        content:
                            "Rincez avant la première utilisation et après chaque café. Lavez régulièrement sans assouplissant afin de préserver la perméabilité et le goût neutre.",
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Huile de finition bois naturelle",
        slug: stringToSlug("Huile de finition bois naturelle"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Mélangez 2 parts d'huile de lin avec 1 part d'huile de tung et une part d'essence d'orange pour fluidifier. Ce mélange nourrit en profondeur, relève le veinage et offre une protection respirante.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Appliquez au chiffon non pelucheux sur un bois propre et parfaitement sec, en suivant le fil. Laissez pénétrer une vingtaine de minutes puis essuyez soigneusement l'excédent.",
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                    },
                    {
                        content:
                            "Laissez sécher 24 h entre chaque couche et appliquez 2 à 3 passes selon l'exposition. Lustrez légèrement après séchage complet; un entretien semestriel préservera l'éclat et la résistance aux taches.",
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Bougies à la cire d'abeille",
        slug: stringToSlug("Bougies à la cire d'abeille"),
        Author: { connect: { email: "vendor@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Faites fondre la cire d'abeille au bain‑marie autour de 70°C et préparez des mèches en coton pré‑cirées adaptées au diamètre du contenant. Travaillez avec précaution et protégez le plan de travail.",
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                    },
                    {
                        content:
                            "Versez la cire dans des contenants résistants à la chaleur et centrez la mèche avec un support. Tapotez pour libérer les bulles d'air et assurer une surface homogène.",
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Laissez refroidir 24 h sans déplacement. Recoupez la mèche à 5–7 mm avant chaque allumage pour une combustion régulière et propre.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Démaquillant biphasé maison",
        slug: stringToSlug("Démaquillant biphasé maison"),
        Author: { connect: { email: "employee@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Mélangez 40 ml d'hydrolat apaisant (bleuet ou camomille) avec 60 ml d'huile végétale douce (amande, jojoba) dans un flacon propre. Cette formule dissout efficacement le maquillage tout en respectant la peau.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Ajoutez quelques gouttes de vitamine E comme antioxydant naturel et étiquetez la date de préparation. Agitez avant emploi pour réunir les deux phases et faciliter l'application.",
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                    },
                    {
                        content:
                            "Appliquez sur un coton lavable en gestes doux, puis rincez si nécessaire. Conservez à l'abri de la chaleur et utilisez idéalement sous deux mois.",
                        image: "/images/illustrations/8wBP80yThLU.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Cendrier de poche DIY",
        slug: stringToSlug("Cendrier de poche DIY"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Récupérez une boîte métallique plate (type pastilles) et nettoyez‑la soigneusement. Vérifiez la fermeture pour éviter toute ouverture accidentelle en poche.",
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                    },
                    {
                        content:
                            "Tapissez le fond de sable fin pour absorber et éteindre rapidement. Ajoutez un petit galet parfumé ou une pastille désodorisante pour limiter les odeurs.",
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                    },
                    {
                        content:
                            "Personnalisez l'extérieur et emportez toujours le cendrier lors de vos sorties. Ce simple geste évite la dispersion des mégots dans l'environnement.",
                        image: "/images/illustrations/EvP4FOhMniM.webp",
                    },
                ],
            },
        },
    },
    {
        title: "Poudre lave-vaisselle maison",
        slug: stringToSlug("Poudre lave-vaisselle maison"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        content:
                            "Mélangez 2 parts de cristaux de soude, 2 parts d'acide citrique et 1 part de bicarbonate dans un grand bol. Travaillez à l'abri de l'humidité et portez des gants si nécessaire.",
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                    },
                    {
                        content:
                            "Ajoutez une part de sel fin pour l'effet adoucissant et transférez dans un bocal hermétique étiqueté. Conservez au sec, à l'abri des projections d'eau.",
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Dosez environ 1 cuillère à soupe par cycle selon la dureté de l'eau. Utilisez du vinaigre blanc comme liquide de rinçage pour une vaisselle brillante et sans traces.",
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                    },
                ],
            },
        },
    },
];
