import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { stringToSlug } from "@utils/string-format";

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
        slug: stringToSlug("Vivre écologiquement au quotidien"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                        content:
                            "L'écologie au quotidien se construit par des gestes simples mais impactants. La transition écologique n'est pas qu'une notion abstraite, elle se concrétise dans nos choix quotidiens. Que ce soit dans notre consommation, nos déplacements ou notre gestion des déchets, chaque action contribue à la préservation de notre environnement. L'effet cumulé de ces gestes individuels crée un changement significatif.",
                    },
                    {
                        image: "/images/illustrations/B2tKxL9KVqA.webp",
                        content:
                            "La gestion responsable de l'eau et de l'électricité est fondamentale. Installez des mousseurs sur vos robinets, privilégiez les douches aux bains, et fermez l'eau pendant le brossage des dents. Pour l'électricité, optez pour des ampoules LED, éteignez les appareils en veille et isolez efficacement votre logement. Ces habitudes réduisent votre impact environnemental et vos factures.",
                    },
                    {
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                        content:
                            "Les produits locaux et de saison offrent de nombreux avantages écologiques. Ils nécessitent moins de transport, donc moins d'émissions de CO2. Cultivés naturellement, ils sont plus savoureux et nutritifs car récoltés à maturité. Cette approche soutient l'économie locale, préserve la biodiversité et maintient les traditions agricoles de nos régions.",
                    },
                ],
            },
        },
    },
    {
        title: "Les alternatives aux produits ménagers chimiques",
        slug: stringToSlug("Les alternatives aux produits ménagers chimiques"),
        Author: {
            connect: {
                email: "vendor@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                        content:
                            "Les produits ménagers naturels rivalisent efficacement avec leurs équivalents chimiques. Ils évitent l'exposition aux substances toxiques qui peuvent provoquer allergies et irritations. Ces alternatives écologiques sont biodégradables et respectueuses de l'environnement, réduisant la pollution des eaux et la production de déchets plastiques.",
                    },
                    {
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                        content:
                            "Le trio vinaigre blanc, bicarbonate et savon noir forme la base d'un nettoyage écologique efficace. Le vinaigre désinfecte et détartre, le bicarbonate absorbe les odeurs et nettoie sans rayer, tandis que le savon noir dégraisse puissamment. Ces produits polyvalents s'utilisent purs ou combinés selon les besoins.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "La fabrication maison des produits ménagers présente de multiples avantages. Elle réduit les emballages plastiques, permet de contrôler les ingrédients utilisés et génère des économies substantielles. Les recettes simples et personnalisables s'adaptent aux besoins spécifiques de chaque foyer, garantissant une efficacité optimale.",
                    },
                ],
            },
        },
    },
    {
        title: "Jardinage écologique et permaculture",
        slug: stringToSlug("Jardinage écologique et permaculture"),
        Author: {
            connect: {
                email: "user@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "La permaculture réinvente le jardinage en s'inspirant des écosystèmes naturels. Cette approche crée des espaces productifs et autonomes qui nécessitent peu d'entretien. En observant les interactions naturelles entre les plantes, le sol et les insectes, nous pouvons concevoir des jardins qui s'auto-régulent et produisent des aliments sains toute l'année.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Le compostage est au cœur de la permaculture, transformant les déchets organiques en un amendement riche en nutriments. Ce processus naturel améliore la structure du sol, stimule la vie microbienne et fournit aux plantes les éléments nutritifs nécessaires. Un bon compost réduit les besoins en fertilisants et optimise la rétention d'eau.",
                    },
                    {
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                        content:
                            "Les associations de plantes compagnes constituent une stratégie efficace pour un jardin résilient. Certaines plantes repoussent naturellement les parasites, d'autres enrichissent le sol en azote ou attirent les pollinisateurs. Ces synergies naturelles permettent de réduire, voire d'éliminer, l'utilisation de pesticides tout en augmentant la biodiversité.",
                    },
                ],
            },
        },
    },
    {
        title: "Réduire son empreinte carbone au quotidien",
        slug: stringToSlug("Réduire son empreinte carbone au quotidien"),
        Author: {
            connect: {
                email: "employee@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/BRVqq2uak4E.webp",
                        content:
                            "Les transports représentent une part majeure de notre empreinte carbone individuelle. Privilégier le vélo, la marche ou les transports en commun réduit significativement nos émissions de CO2. Le covoiturage et l'autopartage offrent des alternatives flexibles, tandis que le télétravail, quand possible, évite des déplacements inutiles.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "L'alimentation influence fortement notre impact environnemental. Réduire sa consommation de viande, même partiellement, diminue considérablement les émissions de gaz à effet de serre. Privilégier les protéines végétales et les produits locaux de saison permet de maintenir une alimentation équilibrée tout en respectant la planète.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "La consommation d'énergie domestique peut être optimisée par des choix d'équipements judicieux. Les appareils électroménagers de classe énergétique A+++ consomment jusqu'à 60% moins d'énergie. La programmation du chauffage, l'isolation efficace et l'utilisation d'ampoules LED réduisent durablement notre impact énergétique.",
                    },
                ],
            },
        },
    },
    {
        title: "Hygiène personnelle zéro déchet",
        slug: stringToSlug("Hygiène personnelle zéro déchet"),
        Author: {
            connect: {
                email: "admin@example.com",
            },
        },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/KRkn9QXpd8I.webp",
                        content:
                            "Les alternatives réutilisables révolutionnent notre routine d'hygiène quotidienne. Les cotons démaquillants lavables, brosses à dents en bambou et protections périodiques réutilisables réduisent drastiquement nos déchets. Ces solutions durables, plus économiques à long terme, évitent l'accumulation de déchets plastiques tout en préservant notre confort.",
                    },
                    {
                        image: "/images/illustrations/8wBP80yThLU.webp",
                        content:
                            "Les cosmétiques solides représentent une innovation majeure dans la beauté durable. Shampooings, savons et déodorants en format solide éliminent les emballages plastiques superflus. Plus concentrés que leurs équivalents liquides, ils durent plus longtemps et facilitent le transport. Leur fabrication nécessite moins d'eau et d'énergie.",
                    },
                    {
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                        content:
                            "La fabrication maison de cosmétiques permet un contrôle total des ingrédients utilisés. En choisissant des composants naturels et biologiques, nous évitons les substances controversées présentes dans les produits industriels. Cette approche personnalisée s'adapte à nos besoins spécifiques tout en réduisant notre impact environnemental.",
                    },
                ],
            },
        },
    },

    {
        title: "Cuisine anti-gaspi: astuces et recettes",
        slug: stringToSlug("Cuisine anti-gaspi: astuces et recettes"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                        content:
                            "Planifiez vos repas à partir d'un inventaire précis des placards et du réfrigérateur afin d'utiliser d'abord les produits à date courte. Cuisinez les restes en gratins, soupes, poêlées ou quiches pour créer de nouveaux plats savoureux. Congelez en portions individuelles étiquetées (date/quantité) pour faciliter le réemploi et éviter les pertes alimentaires.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "Valorisez les parties délaissées: fanes de carottes en pesto onctueux, tiges de brocolis râpées en salade, croûtes de fromages infusées dans les soupes. Les épluchures de légumes séchées puis mixées composent un assaisonnement maison riche en arômes pour relever vos préparations sans gaspiller.",
                    },
                    {
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                        content:
                            "Achetez en vrac pour ajuster les quantités au plus juste et éviter les surplus. Conservez dans des bocaux transparents étiquetés pour visualiser les stocks et organiser une rotation efficace (premier entré, premier sorti). Mesurez avec des ustensiles adaptés afin de respecter les doses et limiter les restes superflus.",
                    },
                ],
            },
        },
    },
    {
        title: "Minimalisme: désencombrer pour mieux vivre",
        slug: stringToSlug("Minimalisme: désencombrer pour mieux vivre"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                        content:
                            "Le désencombrement libère de l'espace physique et mental, favorisant des habitudes de consommation plus conscientes. Triez par catégorie (vêtements, livres, cuisine), valorisez le don et la revente, et recyclez ce qui ne peut être réutilisé. Chaque objet conservé doit répondre à un usage réel et identifié.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Organisez vos espaces avec des contenants réutilisables et modulaires, étiquetez clairement et rangez verticalement pour améliorer la visibilité. Cette méthode réduit les achats en double, simplifie l'entretien et instaure des routines plus durables au quotidien.",
                    },
                    {
                        image: "/images/illustrations/B2tKxL9KVqA.webp",
                        content:
                            "Privilégiez des objets durables, réparables et intemporels, conçus avec des matériaux responsables. Entretenez-les pour prolonger leur durée de vie et réduisez les achats impulsifs: ce choix parcimonieux a un impact positif mesurable sur votre empreinte environnementale et votre budget.",
                    },
                ],
            },
        },
    },
    {
        title: "Zéro plastique au supermarché",
        slug: stringToSlug("Zéro plastique au supermarché"),
        Author: { connect: { email: "vendor@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                        content:
                            "Faites vos emplettes au rayon vrac pour les pâtes, céréales et légumineuses, en apportant des sacs à vrac et boîtes réutilisables pré-pesés. Notez la tare sur chaque contenant pour un passage en caisse fluide et une réduction tangible des emballages plastiques.",
                    },
                    {
                        image: "/images/illustrations/KRkn9QXpd8I.webp",
                        content:
                            "Remplacez les produits jetables par des alternatives durables: brosse à dents en bois, cotons démaquillants lavables, cosmétiques solides. Privilégiez les recharges et systèmes consignés pour limiter les déchets à la source.",
                    },
                    {
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                        content:
                            "Choisissez des matériaux recyclables et durables (verre, métal, carton) et évitez les suremballages. Comparez les conditionnements à produit équivalent et optez pour le format le plus sobre afin de réduire votre empreinte plastique globale.",
                    },
                ],
            },
        },
    },
    {
        title: "Composter en ville: solutions pratiques",
        slug: stringToSlug("Composter en ville: solutions pratiques"),
        Author: { connect: { email: "employee@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Le vermicompostage et le bokashi s'adaptent parfaitement aux petites surfaces urbaines. Ces méthodes transforment efficacement les biodéchets en ressources fertiles, réduisant le volume des poubelles tout en fermant la boucle au sein du foyer.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Alternez matières vertes (épluchures, marc de café) et brunes (carton, feuilles sèches) pour maintenir un bon rapport carbone/azote. Contrôlez l'humidité et l'aération: la texture idéale s'apparente à une éponge légèrement essorée.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Une fois mûr, le compost se tamise pour obtenir un amendement fin et homogène. Réincorporez les morceaux grossiers dans le bac afin de poursuivre leur décomposition et d'enrichir la prochaine fournée.",
                    },
                ],
            },
        },
    },
    {
        title: "Réparer plutôt que jeter",
        slug: stringToSlug("Réparer plutôt que jeter"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                        content:
                            "Un kit de base (tournevis, colle multi-supports, fil solide, patchs thermocollants) permet de réparer une grande variété d'objets du quotidien. Cette boîte à outils, associée à quelques tutoriels, prolonge considérablement la durée de vie des biens.",
                    },
                    {
                        image: "/images/illustrations/AcSjR6BmyqE.webp",
                        content:
                            "Appuyez-vous sur les Repair Cafés pour bénéficier de conseils et d'entraide. Documentez vos réparations (photos, étapes, références) pour les reproduire plus facilement et gagner en autonomie technique au fil du temps.",
                    },
                    {
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                        content:
                            "Réparer évite des déchets et valorise les savoir-faire manuels. Débutez par des objets simples (textiles, meubles, petit électroménager), puis élargissez progressivement vos compétences pour maximiser l'impact environnemental et économique.",
                    },
                ],
            },
        },
    },
    {
        title: "Mode éthique: bien choisir ses vêtements",
        slug: stringToSlug("Mode éthique: bien choisir ses vêtements"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/8wBP80yThLU.webp",
                        content:
                            "Choisissez des textiles naturels et certifiés (coton bio, laine, lin, chanvre) plus durables et agréables à porter. Limitez les fibres synthétiques qui libèrent des microplastiques au lavage et préférez des mailles denses réparables.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "Privilégiez la seconde main, le troc et l'upcycling pour prolonger le cycle de vie des vêtements. Ciblez des coupes intemporelles, entretenez correctement et apprenez quelques réparations de base pour limiter le renouvellement.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "Analysez les étiquettes (composition, lieux de fabrication) et privilégiez les marques transparentes sur la traçabilité et la rémunération. Un vêtement bien sourcé et bien conçu se porte plus longtemps et se répare plus facilement.",
                    },
                ],
            },
        },
    },
    {
        title: "Mobilité douce en ville",
        slug: stringToSlug("Mobilité douce en ville"),
        Author: { connect: { email: "employee@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/BRVqq2uak4E.webp",
                        content:
                            "Combinez marche, vélo et transports en commun pour fluidifier vos déplacements urbains. Le vélo à assistance électrique étend le rayon d'action sans effort excessif et remplace avantageusement des trajets automobiles courts.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Planifiez vos trajets avec des itinéraires cyclables sécurisés, équipez votre vélo d'un bon éclairage et portez des éléments réfléchissants. Un antivol en U limite les risques de vol lors des stationnements prolongés.",
                    },
                    {
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                        content:
                            "Le covoiturage et l'autopartage réduisent coûts et empreinte carbone tout en conservant de la flexibilité. Les locations ponctuelles permettent d'éviter l'achat d'un véhicule individuel peu utilisé.",
                    },
                ],
            },
        },
    },
    {
        title: "Énergie à la maison: réduire sa conso",
        slug: stringToSlug("Énergie à la maison: réduire sa conso"),
        Author: { connect: { email: "vendor@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/B2tKxL9KVqA.webp",
                        content:
                            "Réglez le chauffe-eau autour de 55°C, traitez les ponts thermiques et posez des joints d'étanchéité pour réduire les déperditions. Ces ajustements simples améliorent le confort et diminuent durablement la facture énergétique.",
                    },
                    {
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                        content:
                            "Désactivez les veilles avec des multiprises à interrupteur, installez des thermostats programmables et remplacez systématiquement par des LED performantes. L'effet cumulé de ces gestes se ressent rapidement sur la consommation.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Mesurez la consommation réelle avec un wattmètre pour repérer les appareils énergivores et ajuster vos usages. Remplacez progressivement par des modèles classés très efficaces afin d'optimiser l'impact budgétaire et environnemental.",
                    },
                ],
            },
        },
    },
    {
        title: "Jardinage sur balcon: bien démarrer",
        slug: stringToSlug("Jardinage sur balcon: bien démarrer"),
        Author: { connect: { email: "user@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Choisissez des bacs percés avec couche drainante (billes d'argile) et un terreau riche, adapté au potager en contenant. Visez 6 heures de soleil pour tomates et aromatiques et adaptez les volumes au système racinaire de chaque plante.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Arrosez de préférence le matin et paillez généreusement pour limiter l'évaporation. Associez fleurs mellifères et cultures pour attirer pollinisateurs et auxiliaires, et renforcer la résilience de vos plantations.",
                    },
                    {
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                        content:
                            "Faites tourner les bacs pour uniformiser la lumière et semez en succession pour échelonner les récoltes. Surveillez le vent en hauteur et fixez les tuteurs pour sécuriser les plants sur balcon.",
                    },
                ],
            },
        },
    },
    {
        title: "Économies d'eau au quotidien",
        slug: stringToSlug("Économies d'eau au quotidien"),
        Author: { connect: { email: "admin@example.com" } },
        Content: {
            createMany: {
                data: [
                    {
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                        content:
                            "Installez mousseurs, douchettes économes et chasses d'eau à double débit pour réduire la consommation sans perdre en confort. Coupez l'eau pendant le brossage et récupérez l'eau claire pour l'arrosage d'appoint des plantes.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "Surveillez les fuites en observant le compteur la nuit et remplacez rapidement joints et robinets défectueux. Purgez radiateurs et chauffe-eau et entretenez la plomberie pour limiter les pertes invisibles.",
                    },
                    {
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                        content:
                            "Privilégiez les cycles courts et les basses températures lorsque le linge le permet, et remplissez correctement les machines. Un entretien régulier optimise la performance et réduit la consommation d'eau et d'énergie.",
                    },
                ],
            },
        },
    },
];
