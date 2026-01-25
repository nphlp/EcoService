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
                            "L'écologie au quotidien se construit par des gestes simples mais impactants. La transition écologique n'est pas qu'une notion abstraite, elle se concrétise dans nos choix quotidiens. Que ce soit dans notre consommation, nos déplacements ou notre gestion des déchets, chaque action contribue à la préservation de notre environnement. L'effet cumulé de ces gestes individuels crée un changement significatif. Il est essentiel de comprendre que chaque petit pas compte dans cette démarche collective. En adoptant progressivement des habitudes plus respectueuses de la planète, nous participons à un mouvement global de transformation. Les générations futures bénéficieront directement de nos efforts actuels, et c'est cette vision à long terme qui doit guider nos actions quotidiennes.",
                    },
                    {
                        image: "/images/illustrations/B2tKxL9KVqA.webp",
                        content:
                            "La gestion responsable de l'eau et de l'électricité est fondamentale. Installez des mousseurs sur vos robinets, privilégiez les douches aux bains, et fermez l'eau pendant le brossage des dents. Pour l'électricité, optez pour des ampoules LED, éteignez les appareils en veille et isolez efficacement votre logement. Ces habitudes réduisent votre impact environnemental et vos factures. De plus, pensez à récupérer l'eau de pluie pour arroser vos plantes et à installer des thermostats programmables pour optimiser votre chauffage. Chaque geste compte et s'inscrit dans une démarche globale de sobriété énergétique. En sensibilisant votre entourage à ces pratiques, vous multipliez l'impact positif de vos actions.",
                    },
                    {
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                        content:
                            "Les produits locaux et de saison offrent de nombreux avantages écologiques. Ils nécessitent moins de transport, donc moins d'émissions de CO2. Cultivés naturellement, ils sont plus savoureux et nutritifs car récoltés à maturité. Cette approche soutient l'économie locale, préserve la biodiversité et maintient les traditions agricoles de nos régions. En privilégiant les circuits courts, vous établissez un lien direct avec les producteurs et comprenez mieux l'origine de votre alimentation. Les marchés locaux et les AMAP sont d'excellents moyens de s'approvisionner tout en tissant des liens sociaux avec votre communauté.",
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
                            "Les produits ménagers naturels rivalisent efficacement avec leurs équivalents chimiques. Ils évitent l'exposition aux substances toxiques qui peuvent provoquer allergies et irritations. Ces alternatives écologiques sont biodégradables et respectueuses de l'environnement, réduisant la pollution des eaux et la production de déchets plastiques. En optant pour ces solutions naturelles, vous protégez également la santé de vos proches et de vos animaux domestiques. Les ingrédients naturels ne laissent pas de résidus nocifs sur les surfaces et ne contribuent pas à la résistance bactérienne contrairement à certains antibactériens chimiques.",
                    },
                    {
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                        content:
                            "Le trio vinaigre blanc, bicarbonate et savon noir forme la base d'un nettoyage écologique efficace. Le vinaigre désinfecte et détartre, le bicarbonate absorbe les odeurs et nettoie sans rayer, tandis que le savon noir dégraisse puissamment. Ces produits polyvalents s'utilisent purs ou combinés selon les besoins. Le vinaigre blanc est particulièrement efficace pour nettoyer les vitres et faire briller l'inox, tandis que le bicarbonate excelle pour désodoriser les tapis et rafraîchir les canalisations. Le savon noir, quant à lui, est idéal pour les sols et les surfaces grasses de la cuisine.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "La fabrication maison des produits ménagers présente de multiples avantages. Elle réduit les emballages plastiques, permet de contrôler les ingrédients utilisés et génère des économies substantielles. Les recettes simples et personnalisables s'adaptent aux besoins spécifiques de chaque foyer, garantissant une efficacité optimale. Vous pouvez ajouter des huiles essentielles pour parfumer naturellement vos préparations ou ajuster les concentrations selon la dureté de votre eau. Cette approche DIY vous permet également de transmettre ces savoirs à vos enfants et de les sensibiliser aux enjeux environnementaux.",
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
                            "La permaculture réinvente le jardinage en s'inspirant des écosystèmes naturels. Cette approche crée des espaces productifs et autonomes qui nécessitent peu d'entretien. En observant les interactions naturelles entre les plantes, le sol et les insectes, nous pouvons concevoir des jardins qui s'auto-régulent et produisent des aliments sains toute l'année. Les principes de la permaculture vont au-delà du simple jardinage : ils proposent une philosophie de vie basée sur le respect de la terre, le soin des personnes et le partage équitable des ressources. En appliquant ces principes, vous créez un écosystème résilient capable de s'adapter aux changements climatiques.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Le compostage est au cœur de la permaculture, transformant les déchets organiques en un amendement riche en nutriments. Ce processus naturel améliore la structure du sol, stimule la vie microbienne et fournit aux plantes les éléments nutritifs nécessaires. Un bon compost réduit les besoins en fertilisants et optimise la rétention d'eau. Pour réussir votre compost, alternez les matières vertes riches en azote avec les matières brunes riches en carbone, maintenez une humidité adéquate et aérez régulièrement le tas. En quelques mois, vous obtiendrez un or noir qui transformera la qualité de votre sol.",
                    },
                    {
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                        content:
                            "Les associations de plantes compagnes constituent une stratégie efficace pour un jardin résilient. Certaines plantes repoussent naturellement les parasites, d'autres enrichissent le sol en azote ou attirent les pollinisateurs. Ces synergies naturelles permettent de réduire, voire d'éliminer, l'utilisation de pesticides tout en augmentant la biodiversité. Par exemple, les capucines attirent les pucerons loin des légumes, tandis que le basilic planté près des tomates améliore leur saveur et éloigne certains ravageurs. Les légumineuses fixent l'azote atmosphérique dans le sol, bénéficiant ainsi aux cultures voisines.",
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
                            "Les transports représentent une part majeure de notre empreinte carbone individuelle. Privilégier le vélo, la marche ou les transports en commun réduit significativement nos émissions de CO2. Le covoiturage et l'autopartage offrent des alternatives flexibles, tandis que le télétravail, quand possible, évite des déplacements inutiles. Pour les trajets plus longs, le train émet jusqu'à 50 fois moins de CO2 que l'avion par passager-kilomètre. Planifier ses déplacements, regrouper ses courses et optimiser ses trajets sont autant de moyens de réduire son impact sur le climat.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "L'alimentation influence fortement notre impact environnemental. Réduire sa consommation de viande, même partiellement, diminue considérablement les émissions de gaz à effet de serre. Privilégier les protéines végétales et les produits locaux de saison permet de maintenir une alimentation équilibrée tout en respectant la planète. L'élevage intensif est responsable d'une part importante des émissions mondiales de méthane et de la déforestation. En adoptant un régime flexitarien quelques jours par semaine, vous réduisez significativement votre empreinte carbone alimentaire tout en découvrant de nouvelles saveurs.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "La consommation d'énergie domestique peut être optimisée par des choix d'équipements judicieux. Les appareils électroménagers de classe énergétique A+++ consomment jusqu'à 60% moins d'énergie. La programmation du chauffage, l'isolation efficace et l'utilisation d'ampoules LED réduisent durablement notre impact énergétique. Investir dans une bonne isolation thermique est souvent le geste le plus rentable à long terme, réduisant à la fois vos factures et votre consommation d'énergie. Les petits gestes comptent aussi : débrancher les chargeurs inutilisés et utiliser des multiprises à interrupteur.",
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
                            "Les alternatives réutilisables révolutionnent notre routine d'hygiène quotidienne. Les cotons démaquillants lavables, brosses à dents en bambou et protections périodiques réutilisables réduisent drastiquement nos déchets. Ces solutions durables, plus économiques à long terme, évitent l'accumulation de déchets plastiques tout en préservant notre confort. Une femme utilise en moyenne 10 000 protections périodiques jetables au cours de sa vie, un chiffre que les cups menstruelles et culottes lavables peuvent réduire à néant. Les oriculi remplacent avantageusement les cotons-tiges, tandis que les rasoirs de sûreté en métal offrent un rasage de qualité sans plastique.",
                    },
                    {
                        image: "/images/illustrations/8wBP80yThLU.webp",
                        content:
                            "Les cosmétiques solides représentent une innovation majeure dans la beauté durable. Shampooings, savons et déodorants en format solide éliminent les emballages plastiques superflus. Plus concentrés que leurs équivalents liquides, ils durent plus longtemps et facilitent le transport. Leur fabrication nécessite moins d'eau et d'énergie. Un shampooing solide équivaut en moyenne à deux ou trois bouteilles de shampooing liquide, tout en offrant des formules souvent plus naturelles. Les dentifrices solides ou en pastilles gagnent également en popularité, proposant une alternative efficace aux tubes en plastique difficiles à recycler.",
                    },
                    {
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                        content:
                            "La fabrication maison de cosmétiques permet un contrôle total des ingrédients utilisés. En choisissant des composants naturels et biologiques, nous évitons les substances controversées présentes dans les produits industriels. Cette approche personnalisée s'adapte à nos besoins spécifiques tout en réduisant notre impact environnemental. Réaliser son propre baume à lèvres, sa crème hydratante ou son déodorant devient un acte créatif et gratifiant. Les recettes de base sont souvent simples : huiles végétales, beurres naturels, cires et huiles essentielles suffisent pour créer une gamme complète de soins.",
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
                            "Planifiez vos repas à partir d'un inventaire précis des placards et du réfrigérateur afin d'utiliser d'abord les produits à date courte. Cuisinez les restes en gratins, soupes, poêlées ou quiches pour créer de nouveaux plats savoureux. Congelez en portions individuelles étiquetées (date/quantité) pour faciliter le réemploi et éviter les pertes alimentaires. La planification hebdomadaire des menus est une stratégie efficace pour acheter uniquement ce dont vous avez besoin. Faites une liste de courses précise et respectez-la pour éviter les achats impulsifs qui finissent souvent à la poubelle.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "Valorisez les parties délaissées: fanes de carottes en pesto onctueux, tiges de brocolis râpées en salade, croûtes de fromages infusées dans les soupes. Les épluchures de légumes séchées puis mixées composent un assaisonnement maison riche en arômes pour relever vos préparations sans gaspiller. Les feuilles de céleri ajoutent du parfum aux bouillons, les trognons de pommes se transforment en vinaigre maison et les peaux de bananes peuvent être confites. Cette cuisine créative vous pousse à voir les aliments différemment et à explorer de nouvelles saveurs insoupçonnées.",
                    },
                    {
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                        content:
                            "Achetez en vrac pour ajuster les quantités au plus juste et éviter les surplus. Conservez dans des bocaux transparents étiquetés pour visualiser les stocks et organiser une rotation efficace (premier entré, premier sorti). Mesurez avec des ustensiles adaptés afin de respecter les doses et limiter les restes superflus. Le vrac permet également de découvrir de nouveaux ingrédients en petite quantité avant de s'engager sur un paquet entier. Investissez dans des contenants de qualité et des sacs réutilisables pour faciliter vos courses et éviter l'accumulation de produits qui périment.",
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
                            "Le désencombrement libère de l'espace physique et mental, favorisant des habitudes de consommation plus conscientes. Triez par catégorie (vêtements, livres, cuisine), valorisez le don et la revente, et recyclez ce qui ne peut être réutilisé. Chaque objet conservé doit répondre à un usage réel et identifié. Le minimalisme n'est pas une privation mais une libération des possessions superflues qui encombrent notre vie. En questionnant chaque achat, vous développez une relation plus saine avec les objets et privilégiez la qualité sur la quantité pour un quotidien plus serein.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Organisez vos espaces avec des contenants réutilisables et modulaires, étiquetez clairement et rangez verticalement pour améliorer la visibilité. Cette méthode réduit les achats en double, simplifie l'entretien et instaure des routines plus durables au quotidien. Un espace bien organisé facilite le nettoyage et réduit le temps passé à chercher des objets. Attribuez une place précise à chaque chose et prenez l'habitude de ranger immédiatement après utilisation pour maintenir l'ordre naturellement.",
                    },
                    {
                        image: "/images/illustrations/B2tKxL9KVqA.webp",
                        content:
                            "Privilégiez des objets durables, réparables et intemporels, conçus avec des matériaux responsables. Entretenez-les pour prolonger leur durée de vie et réduisez les achats impulsifs: ce choix parcimonieux a un impact positif mesurable sur votre empreinte environnementale et votre budget. Avant chaque achat, posez-vous la question de la nécessité réelle et de la durabilité du produit. Préférez les marques qui proposent des pièces détachées et des services de réparation pour accompagner vos objets dans la durée.",
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
                            "Faites vos emplettes au rayon vrac pour les pâtes, céréales et légumineuses, en apportant des sacs à vrac et boîtes réutilisables pré-pesés. Notez la tare sur chaque contenant pour un passage en caisse fluide et une réduction tangible des emballages plastiques. De plus en plus de supermarchés développent leurs rayons vrac, proposant épices, huiles, produits d'entretien et cosmétiques. Préparez vos contenants à l'avance et gardez un kit de courses dans votre sac pour ne jamais être pris au dépourvu.",
                    },
                    {
                        image: "/images/illustrations/KRkn9QXpd8I.webp",
                        content:
                            "Remplacez les produits jetables par des alternatives durables: brosse à dents en bois, cotons démaquillants lavables, cosmétiques solides. Privilégiez les recharges et systèmes consignés pour limiter les déchets à la source. Les magasins spécialisés et certaines grandes surfaces proposent désormais des stations de recharge pour la lessive, le liquide vaisselle et même certains cosmétiques. Les systèmes de consigne pour les bouteilles en verre se développent à nouveau, rappelant les pratiques d'antan plus respectueuses de l'environnement.",
                    },
                    {
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                        content:
                            "Choisissez des matériaux recyclables et durables (verre, métal, carton) et évitez les suremballages. Comparez les conditionnements à produit équivalent et optez pour le format le plus sobre afin de réduire votre empreinte plastique globale. Le verre est recyclable à l'infini sans perte de qualité, contrairement au plastique qui se dégrade à chaque cycle. Les conserves en métal sont également excellentes pour la conservation longue durée. Apprenez à décrypter les logos de recyclage pour faire des choix éclairés.",
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
                            "Le vermicompostage et le bokashi s'adaptent parfaitement aux petites surfaces urbaines. Ces méthodes transforment efficacement les biodéchets en ressources fertiles, réduisant le volume des poubelles tout en fermant la boucle au sein du foyer. Le vermicomposteur utilise des vers Eisenia fetida qui digèrent les déchets organiques et produisent un compost de haute qualité. Le bokashi, d'origine japonaise, fermente les déchets grâce à des micro-organismes efficaces et accepte même les restes de viande et de poisson.",
                    },
                    {
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                        content:
                            "Alternez matières vertes (épluchures, marc de café) et brunes (carton, feuilles sèches) pour maintenir un bon rapport carbone/azote. Contrôlez l'humidité et l'aération: la texture idéale s'apparente à une éponge légèrement essorée. Un compost trop humide devient anaérobie et malodorant, tandis qu'un compost trop sec ralentit la décomposition. Coupez les déchets en petits morceaux pour accélérer le processus et évitez les agrumes en grande quantité qui acidifient le milieu.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Une fois mûr, le compost se tamise pour obtenir un amendement fin et homogène. Réincorporez les morceaux grossiers dans le bac afin de poursuivre leur décomposition et d'enrichir la prochaine fournée. Le compost mûr a une odeur agréable de sous-bois et une texture friable. Utilisez-le pour rempoter vos plantes d'intérieur, enrichir vos jardinières ou nourrir votre potager de balcon. En compostant vos biodéchets, vous réduisez d'environ 30% le volume de vos ordures ménagères.",
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
                            "Un kit de base (tournevis, colle multi-supports, fil solide, patchs thermocollants) permet de réparer une grande variété d'objets du quotidien. Cette boîte à outils, associée à quelques tutoriels, prolonge considérablement la durée de vie des biens. Investissez dans des outils de qualité qui dureront des années et apprenez progressivement les gestes de base. Internet regorge de tutoriels vidéo pour réparer presque tout, des fermetures éclair aux appareils électroniques. La satisfaction de redonner vie à un objet est incomparable.",
                    },
                    {
                        image: "/images/illustrations/AcSjR6BmyqE.webp",
                        content:
                            "Appuyez-vous sur les Repair Cafés pour bénéficier de conseils et d'entraide. Documentez vos réparations (photos, étapes, références) pour les reproduire plus facilement et gagner en autonomie technique au fil du temps. Les Repair Cafés sont des événements conviviaux où des bénévoles partagent leurs compétences gratuitement. Vous y trouverez de l'aide pour réparer vélos, vêtements, petits appareils électroménagers et bien plus. Ces rencontres sont aussi l'occasion d'apprendre de nouvelles techniques.",
                    },
                    {
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                        content:
                            "Réparer évite des déchets et valorise les savoir-faire manuels. Débutez par des objets simples (textiles, meubles, petit électroménager), puis élargissez progressivement vos compétences pour maximiser l'impact environnemental et économique. La réparation développe la patience, la créativité et la compréhension du fonctionnement des objets. Elle crée un lien différent avec nos possessions, qui deviennent uniques et chargées d'histoire. Face à l'obsolescence programmée, réparer est un acte de résistance.",
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
                            "Choisissez des textiles naturels et certifiés (coton bio, laine, lin, chanvre) plus durables et agréables à porter. Limitez les fibres synthétiques qui libèrent des microplastiques au lavage et préférez des mailles denses réparables. Le coton biologique utilise 91% moins d'eau que le coton conventionnel et ne recourt pas aux pesticides chimiques. Le lin, cultivé principalement en Europe, nécessite peu d'irrigation et de traitements. Ces fibres naturelles vieillissent mieux que les synthétiques et se recyclent plus facilement.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "Privilégiez la seconde main, le troc et l'upcycling pour prolonger le cycle de vie des vêtements. Ciblez des coupes intemporelles, entretenez correctement et apprenez quelques réparations de base pour limiter le renouvellement. Les friperies, vide-dressings et plateformes de revente en ligne offrent un choix immense à des prix abordables. L'upcycling transforme des vêtements démodés ou abîmés en pièces uniques et personnalisées. Construisez une garde-robe capsule avec des basiques de qualité qui se combinent facilement entre eux.",
                    },
                    {
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                        content:
                            "Analysez les étiquettes (composition, lieux de fabrication) et privilégiez les marques transparentes sur la traçabilité et la rémunération. Un vêtement bien sourcé et bien conçu se porte plus longtemps et se répare plus facilement. Les certifications comme GOTS, Oeko-Tex ou Fair Trade garantissent le respect de critères environnementaux et sociaux. Méfiez-vous du greenwashing et renseignez-vous sur les pratiques réelles des marques. Le coût par port d'un vêtement de qualité est souvent inférieur à celui d'un article de fast-fashion.",
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
                            "Combinez marche, vélo et transports en commun pour fluidifier vos déplacements urbains. Le vélo à assistance électrique étend le rayon d'action sans effort excessif et remplace avantageusement des trajets automobiles courts. La marche, gratuite et accessible à tous, reste le mode de déplacement le plus écologique et bénéficie directement à votre santé. Les transports en commun, lorsqu'ils sont disponibles, offrent un temps de trajet utilisable pour lire, travailler ou se détendre tout en réduisant votre empreinte carbone.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Planifiez vos trajets avec des itinéraires cyclables sécurisés, équipez votre vélo d'un bon éclairage et portez des éléments réfléchissants. Un antivol en U limite les risques de vol lors des stationnements prolongés. Les applications de navigation proposent désormais des itinéraires spécifiques pour les cyclistes, évitant les axes dangereux et privilégiant les pistes cyclables. Entretenez régulièrement votre vélo pour garantir votre sécurité. Des équipements comme les garde-boue et les sacoches rendent le vélo pratique au quotidien.",
                    },
                    {
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                        content:
                            "Le covoiturage et l'autopartage réduisent coûts et empreinte carbone tout en conservant de la flexibilité. Les locations ponctuelles permettent d'éviter l'achat d'un véhicule individuel peu utilisé. Les plateformes de covoiturage facilitent la mise en relation pour les trajets quotidiens comme pour les longs voyages. L'autopartage donne accès à une voiture quand vous en avez vraiment besoin, sans les contraintes de possession comme l'assurance, l'entretien et le stationnement.",
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
                            "Réglez le chauffe-eau autour de 55°C, traitez les ponts thermiques et posez des joints d'étanchéité pour réduire les déperditions. Ces ajustements simples améliorent le confort et diminuent durablement la facture énergétique. L'eau chaude représente une part importante de la consommation énergétique domestique, et chaque degré supplémentaire augmente la facture d'environ 7%. Les ponts thermiques sont responsables de pertes de chaleur significatives que des solutions simples comme le calfeutrage peuvent réduire.",
                    },
                    {
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                        content:
                            "Désactivez les veilles avec des multiprises à interrupteur, installez des thermostats programmables et remplacez systématiquement par des LED performantes. L'effet cumulé de ces gestes se ressent rapidement sur la consommation. Les appareils en veille peuvent représenter jusqu'à 10% de votre facture d'électricité. Les LED consomment jusqu'à 80% moins d'énergie que les ampoules à incandescence et durent beaucoup plus longtemps. Ces investissements modestes sont rapidement amortis par les économies réalisées.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Mesurez la consommation réelle avec un wattmètre pour repérer les appareils énergivores et ajuster vos usages. Remplacez progressivement par des modèles classés très efficaces afin d'optimiser l'impact budgétaire et environnemental. Un wattmètre révèle souvent des surprises : certains appareils consomment beaucoup plus qu'on ne l'imagine, même en veille. Lors du remplacement d'un appareil, consultez l'étiquette énergie et calculez le coût total de possession incluant la consommation sur la durée de vie.",
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
                            "Choisissez des bacs percés avec couche drainante (billes d'argile) et un terreau riche, adapté au potager en contenant. Visez 6 heures de soleil pour tomates et aromatiques et adaptez les volumes au système racinaire de chaque plante. Les contenants doivent être suffisamment profonds : au moins 20 cm pour les herbes aromatiques, 40 cm pour les tomates et poivrons. Le drainage est crucial pour éviter le pourrissement des racines. L'observation de l'ensoleillement de votre balcon vous aidera à placer chaque plante au bon endroit.",
                    },
                    {
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                        content:
                            "Arrosez de préférence le matin et paillez généreusement pour limiter l'évaporation. Associez fleurs mellifères et cultures pour attirer pollinisateurs et auxiliaires, et renforcer la résilience de vos plantations. Le paillage maintient l'humidité, limite les mauvaises herbes et protège les racines des variations de température. Les soucis, capucines et lavandes attirent les insectes bénéfiques tout en ajoutant de la couleur à votre balcon. Un arrosage régulier mais modéré est préférable à des arrosages copieux espacés.",
                    },
                    {
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                        content:
                            "Faites tourner les bacs pour uniformiser la lumière et semez en succession pour échelonner les récoltes. Surveillez le vent en hauteur et fixez les tuteurs pour sécuriser les plants sur balcon. Les balcons élevés sont souvent exposés à des vents plus forts qui dessèchent les plantes et peuvent casser les tiges fragiles. Protégez vos cultures avec des brise-vent ou regroupez les pots pour créer un microclimat plus favorable. Un carnet de jardinage vous aidera à améliorer vos pratiques.",
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
                            "Installez mousseurs, douchettes économes et chasses d'eau à double débit pour réduire la consommation sans perdre en confort. Coupez l'eau pendant le brossage et récupérez l'eau claire pour l'arrosage d'appoint des plantes. Les mousseurs réduisent le débit de 30 à 50% en mélangeant l'air à l'eau, maintenant une sensation de pression satisfaisante. Une douchette économe consomme environ 6 litres par minute contre 15 à 20 pour un modèle classique. Ces équipements peu coûteux sont amortis en quelques mois.",
                    },
                    {
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                        content:
                            "Surveillez les fuites en observant le compteur la nuit et remplacez rapidement joints et robinets défectueux. Purgez radiateurs et chauffe-eau et entretenez la plomberie pour limiter les pertes invisibles. Une fuite goutte à goutte peut gaspiller jusqu'à 120 litres d'eau par jour, soit plus de 40 000 litres par an. Vérifiez régulièrement l'état des joints de vos robinets et remplacez-les dès les premiers signes d'usure. Un entretien préventif régulier évite ces gaspillages coûteux.",
                    },
                    {
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                        content:
                            "Privilégiez les cycles courts et les basses températures lorsque le linge le permet, et remplissez correctement les machines. Un entretien régulier optimise la performance et réduit la consommation d'eau et d'énergie. Un lave-linge moderne consomme environ 50 litres par cycle, contre 100 à 120 litres pour les anciens modèles. Attendre que la machine soit pleine avant de lancer un cycle maximise l'efficacité. Les programmes éco, bien que plus longs, consomment généralement moins d'eau et d'énergie.",
                    },
                ],
            },
        },
    },
];
