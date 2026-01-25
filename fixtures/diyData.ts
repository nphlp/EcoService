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
                            "Préparez votre mélange avec 500g d'huile d'olive, 200g d'huile de coco et 95g de soude caustique diluée dans 250ml d'eau froide. La soude transforme les huiles en savon par saponification. Portez des équipements de protection et travaillez dans un espace bien ventilé. Les huiles apportent leurs propriétés nourrissantes spécifiques. L'huile d'olive offre douceur et hydratation, tandis que l'huile de coco apporte la mousse et le pouvoir nettoyant. Vous pouvez personnaliser votre recette en ajoutant du beurre de karité pour plus de douceur ou de l'huile de ricin pour une mousse plus crémeuse.",
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                    },
                    {
                        content:
                            "Chauffez doucement les huiles jusqu'à 40°C dans un récipient en inox ou en verre. Versez progressivement la solution de soude tout en mélangeant énergiquement avec un mixeur plongeant. Continuez jusqu'à la trace, puis incorporez vos huiles essentielles préférées pour parfumer naturellement. La trace est atteinte lorsque le mélange laisse une marque visible à la surface. Les huiles essentielles de lavande, tea tree ou agrumes sont particulièrement adaptées. Vous pouvez également ajouter des colorants naturels comme l'argile ou le curcuma.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Versez la préparation dans un moule en silicone ou en bois doublé de papier cuisson. Laissez reposer 48h à température ambiante avant de démouler. Un temps de séchage de 4 à 6 semaines est nécessaire pour obtenir un savon doux et stable. Ce temps de cure permet à la saponification de se terminer complètement et au savon de durcir. Retournez les savons régulièrement pour un séchage uniforme et stockez-les dans un endroit sec et aéré. Un savon bien curé durera plus longtemps et sera plus doux pour la peau.",
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
                            "Sélectionnez une palette portant le marquage HT (traitement thermique) et poncez-la soigneusement pour éviter les échardes. Appliquez deux couches d'huile de lin pure pour protéger le bois des intempéries. Cette préparation garantit la durabilité de votre potager et la sécurité de vos futures récoltes. Évitez les palettes marquées MB qui ont été traitées au bromure de méthyle, un produit toxique. Les palettes EUR ou EPAL sont généralement de bonne qualité et faciles à trouver. Laissez sécher complètement l'huile de lin entre chaque couche.",
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Découpez le géotextile en rectangles légèrement plus grands que les espaces entre les lattes. Agrafez-le solidement à l'arrière et sur les côtés pour former des poches profondes. Remplissez de terreau spécial potager enrichi en compost, en tassant modérément pour préserver l'aération. Le géotextile retient la terre tout en permettant le drainage de l'excès d'eau. Doublez le fond des poches pour plus de solidité car le poids de la terre humide est conséquent. Prévoyez des attaches solides pour fixer la palette au mur.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Organisez vos plantations selon les besoins en eau : les plantes gourmandes en bas, les herbes aromatiques résistantes en haut. Installez un système d'arrosage goutte-à-goutte pour une distribution uniforme. En été, surveillez l'humidité quotidiennement car les poches sèchent rapidement. Les fraisiers, salades et aromates s'adaptent particulièrement bien à la culture verticale. Évitez les légumes à fort développement racinaire comme les carottes. Un paillage en surface des poches limite l'évaporation et maintient la fraîcheur du terreau.",
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
                            "Râpez finement 50g de véritable savon de Marseille (72% d'huile d'olive minimum) et faites-le fondre dans 1L d'eau chaude à 60°C. Ajoutez une cuillère à soupe de bicarbonate de soude qui adoucit l'eau et renforce le pouvoir nettoyant. Remuez régulièrement pour éviter les grumeaux. Vérifiez la composition du savon de Marseille pour éviter les contrefaçons contenant des graisses animales ou des additifs. Un vrai savon de Marseille ne contient que des huiles végétales et de la soude. La température de l'eau est importante pour une dissolution complète.",
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                    },
                    {
                        content:
                            "Incorporez une cuillère à soupe de cristaux de soude pour leur action dégraissante puissante, particulièrement efficace sur les taches tenaces. Ajoutez 10 gouttes d'huile essentielle de lavande ou de citron pour leurs propriétés désinfectantes et leur parfum naturel agréable. Les cristaux de soude sont plus puissants que le bicarbonate et nécessitent le port de gants lors de la manipulation. L'huile essentielle de tea tree est également excellente pour ses propriétés antibactériennes. Évitez les huiles essentielles si vous avez des bébés ou des animaux sensibles.",
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                    },
                    {
                        content:
                            "Transvasez la préparation refroidie dans un contenant en verre ou en plastique recyclé avec bouchon doseur. Utilisez un demi-verre (100ml) par machine. Cette lessive naturelle convient à tous types de machines et se conserve un mois à température ambiante. La lessive peut se solidifier en refroidissant, ce qui est normal. Secouez simplement le bidon avant utilisation ou ajoutez un peu d'eau chaude pour la fluidifier. Pour le linge blanc, ajoutez du percarbonate de soude directement dans le tambour.",
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
                            "Choisissez deux seaux identiques de 10-15L avec couvercles hermétiques. Dans le premier, percez une vingtaine de trous de 5-8mm uniformément répartis sur le fond pour assurer drainage et aération. Collez une moustiquaire fine sous le couvercle pour éviter les insectes tout en maintenant la ventilation. Les seaux alimentaires récupérés sont parfaits pour ce projet. Assurez-vous que les seaux s'emboîtent avec un espace suffisant pour collecter le jus. Percez également quelques trous sur les côtés du seau supérieur pour améliorer l'aération latérale.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Emboîtez le seau percé dans le second qui récupérera le lixiviat, un excellent engrais liquide à diluer. Tapissez le fond du seau supérieur avec du carton qui retient les vers et fournit la première matière carbonée. Ajoutez 500g de vers Eisenia fetida. Ces vers rouges sont différents des vers de terre du jardin et se procurent auprès de fournisseurs spécialisés ou de particuliers. Laissez-les s'acclimater quelques jours avant d'ajouter les premiers déchets. Le lixiviat se dilue à 1/10 avant utilisation sur les plantes.",
                        image: "/images/illustrations/8wBP80yThLU.webp",
                    },
                    {
                        content:
                            "Découpez vos déchets organiques en morceaux de 2cm maximum pour accélérer leur décomposition. Évitez agrumes, ail, oignon, produits laitiers et viande. Après chaque ajout, couvrez de matière sèche (papier, carton). Maintenez l'humidité comme une éponge essorée. Les épluchures de légumes, le marc de café avec son filtre et les sachets de thé sont parfaits. Évitez de surcharger le composteur, les vers ont besoin de temps pour traiter les apports. En cas de mauvaises odeurs, ajoutez plus de matière sèche et réduisez les apports.",
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
                            "Sélectionnez des chaussettes ou t-shirts en coton usagés, évitez les tissus synthétiques qui libèrent des microplastiques. Découpez des bandes régulières de 3cm de large. Les chaussettes sont idéales car déjà tubulaires, pour les t-shirts commencez par créer un tube en coupant sous les aisselles. Privilégiez les textiles épais qui résisteront mieux aux frottements répétés. Les collants peuvent servir pour les surfaces délicates mais s'usent plus vite. Préparez une dizaine de bandes de même largeur pour un tawashi bien régulier.",
                        image: "/images/illustrations/AcSjR6BmyqE.webp",
                    },
                    {
                        content:
                            "Créez votre métier à tisser sur une planche de bois de 20x20cm en plantant 16 clous en carré, 4 par côté espacés de 2cm. Tendez 5 bandes parallèlement entre les clous opposés, puis tissez 5 autres perpendiculairement en alternant dessus/dessous à chaque croisement. Vous pouvez aussi utiliser une boîte à chaussures en perçant des encoches régulières sur les bords opposés. Le tissage alterné crée la structure solide du tawashi. Maintenez une tension uniforme pour un résultat régulier et esthétique.",
                        image: "/images/illustrations/KRkn9QXpd8I.webp",
                    },
                    {
                        content:
                            "Une fois le tissage terminé, nouez les boucles adjacentes entre elles en commençant par un coin. Maintenez une tension uniforme pour garder la forme carrée. Détachez délicatement du support. Votre tawashi peut être lavé en machine à 60°C et durera plusieurs mois. La technique de nouage consiste à passer chaque boucle dans la suivante pour créer une bordure solide. Créez plusieurs tawashis d'avance pour toujours avoir un échange propre. Un tawashi remplace avantageusement les éponges jetables pendant plusieurs mois d'utilisation intensive.",
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
                            "Découpez un rectangle de 30×40 cm dans un coton serré (chute de chemise ou drap). Surfilez ou surjetez les bords pour éviter l'effilochage et marquez les repères de couture au fer pour un montage net et durable. Les tissus légers comme l'organza ou le tulle conviennent aussi et permettent de voir le contenu. Prévoyez plusieurs tailles de sacs pour différents usages : petit pour les épices, moyen pour les légumineuses, grand pour les fruits et légumes.",
                        image: "/images/illustrations/8wBP80yThLU.webp",
                    },
                    {
                        content:
                            "Pliez le haut sur 2 cm pour former une coulisse, piquez au point droit en laissant une ouverture latérale. Renforcez les extrémités par un aller‑retour afin que la traction du cordon ne déchire pas la couture. La coulisse doit être assez large pour laisser passer le cordon facilement. Cousez d'abord les côtés du sac, endroit contre endroit, puis retournez avant de faire la coulisse. Un point zigzag sur les bords bruts évite l'effilochage au fil des lavages.",
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                    },
                    {
                        content:
                            "Passez une cordelette à l'aide d'une épingle à nourrice, puis faites un nœud plat ou ajoutez un bloque‑cordon récupéré. Étiquetez le poids à vide pour faciliter la tare au rayon vrac. Un feutre textile indélébile permet d'inscrire la tare directement sur le tissu. Vous pouvez aussi coudre une petite étiquette avec le poids. Gardez vos sacs à vrac dans un sac en tissu plus grand pour les avoir toujours à portée lors de vos courses.",
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
                            "Découpez un carré de coton fin et prélavé. Disposez‑le sur une plaque recouverte de papier cuisson et répartissez délicatement de la cire d'abeille râpée ou en pastilles sur toute la surface. Préparez plusieurs tailles de carrés pour différents usages : petits pour couvrir des citrons coupés, moyens pour les bols, grands pour emballer du pain. Le prélavage du tissu est important pour éviter le rétrécissement ultérieur. Choisissez des motifs joyeux pour des bee wraps attrayants.",
                        image: "/images/illustrations/3W-CTJ7Yz7w.webp",
                    },
                    {
                        content:
                            "Enfournez à 80°C jusqu'à fusion, puis étalez la cire au pinceau pour bien imprégner les fibres. Ajoutez une pointe de résine de pin et d'huile pour un meilleur pouvoir adhésif et une souplesse accrue. La résine de pin (colophane) apporte le côté collant qui permet au bee wrap d'adhérer sur lui-même. L'huile de jojoba assouplit l'ensemble et évite que le tissu ne devienne trop rigide au froid. Un pinceau en silicone facilite l'étalement uniforme de la cire fondue.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Saisissez le tissu aux coins, laissez s'égoutter l'excédent et faites sécher quelques minutes. Utilisez pour couvrir des bols ou emballer des aliments, en évitant la chaleur directe et les viandes crues. La chaleur de vos mains suffit à modeler le bee wrap autour des récipients ou des aliments. Nettoyez à l'eau froide avec un peu de savon doux et laissez sécher à l'air. Lorsque le bee wrap perd son adhérence, réimprégnez-le de cire au four pour lui redonner une seconde vie.",
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
                            "Dans une bouteille propre, mélangez 400 ml d'eau, 100 ml de vinaigre blanc et une cuillère à soupe d'alcool ménager. Cette base dégraisse, désodorise et sèche rapidement sans laisser de film gras. Utilisez de préférence de l'eau déminéralisée pour éviter les traces de calcaire sur les surfaces. L'alcool ménager accélère le séchage et renforce le pouvoir désinfectant. Une bouteille spray récupérée fait parfaitement l'affaire après un nettoyage minutieux.",
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                    },
                    {
                        content:
                            "Pour l'effet antibactérien et le parfum, ajoutez 10 gouttes d'huile essentielle de citron ou tea tree (facultatif). Étiquetez le flacon et agitez avant chaque utilisation pour homogénéiser la solution. L'huile essentielle de citron apporte fraîcheur et propriétés dégraissantes, le tea tree est reconnu pour ses vertus antiseptiques. Vous pouvez aussi infuser des écorces d'agrumes dans le vinaigre pendant deux semaines pour un parfum naturel sans huiles essentielles.",
                        image: "/images/illustrations/EvP4FOhMniM.webp",
                    },
                    {
                        content:
                            "Pulvérisez sur plans de travail, inox et vitres, puis essuyez avec un chiffon microfibre. Évitez la pierre naturelle (marbre, granite non traité) et testez sur une zone discrète si doute. Ce spray convient à la plupart des surfaces de la cuisine et de la salle de bain. Pour les vitres, utilisez du papier journal froissé qui ne laisse aucune trace. Ce produit multi-usage remplace avantageusement plusieurs flacons de nettoyants spécialisés et réduit considérablement vos déchets.",
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
                            "Percez un seau équipé d'un robinet au bas pour drainer le jus, et insérez un panier perforé servant de faux‑fond. Nettoyez soigneusement l'ensemble pour garantir une fermentation optimale. Le seau doit être parfaitement hermétique car le bokashi fonctionne en anaérobie, sans oxygène. Le faux-fond maintient les déchets hors du jus et facilite le drainage. Un seau de 15 à 20 litres convient parfaitement pour une famille de quatre personnes.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Ajoutez vos biodéchets en fines couches en saupoudrant de son inoculé (EM) à chaque ajout. Tassez légèrement pour limiter l'air et favoriser la fermentation anaérobie caractéristique du bokashi. Le son de bokashi contient des micro-organismes efficaces qui fermentent les déchets sans les décomposer complètement. Contrairement au compost classique, le bokashi accepte viandes, poissons et produits laitiers. Coupez les gros morceaux pour accélérer le processus.",
                        image: "/images/illustrations/BZg6FvH1NO0.webp",
                    },
                    {
                        content:
                            "Fermez hermétiquement entre chaque apport. Récupérez régulièrement le jus (à diluer avant arrosage) et, après fermentation, enterrez la matière pour une maturation achevée directement au sol. Le jus de bokashi est un fertilisant puissant à diluer au 1/100 pour l'arrosage. Une fois le seau plein, laissez fermenter encore deux semaines avant d'enterrer. En appartement, vous pouvez mélanger le bokashi fermenté à du terreau dans un grand bac pour finaliser la décomposition.",
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
                            "Tracez un cône sur une toile de coton non blanchie (grammage moyen) et ajoutez 1 cm de marge de couture. Coupez dans le droit‑fil pour conserver la tenue au lavage. Utilisez un filtre jetable comme gabarit pour obtenir la forme exacte adaptée à votre cafetière. Le coton non blanchi évite les résidus chimiques et se bonifie avec les lavages. Prévoyez deux ou trois filtres pour avoir toujours un rechange propre disponible.",
                        image: "/images/illustrations/AuhPy2NofM0.webp",
                    },
                    {
                        content:
                            "Assemblez endroit contre endroit, piquez au point droit puis surfilez la couture pour éviter l'effilochage. Retournez, repassez et surpiquez le bord supérieur pour gagner en rigidité. La couture doit être solide car elle sera sollicitée lors du nettoyage. Un point serré évite que le marc de café ne s'infiltre dans les coutures. Le repassage à la vapeur aide à bien former le cône et facilite son positionnement dans le porte-filtre.",
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                    },
                    {
                        content:
                            "Rincez avant la première utilisation et après chaque café. Lavez régulièrement sans assouplissant afin de préserver la perméabilité et le goût neutre. Le marc de café peut être composté ou utilisé comme engrais pour les plantes. Un trempage occasionnel dans une solution de bicarbonate élimine les résidus de café qui peuvent colmater les fibres. Le filtre réutilisable vous fera économiser des centaines de filtres jetables chaque année.",
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
                            "Mélangez 2 parts d'huile de lin avec 1 part d'huile de tung et une part d'essence d'orange pour fluidifier. Ce mélange nourrit en profondeur, relève le veinage et offre une protection respirante. L'huile de lin pénètre le bois en profondeur et durcit par oxydation, tandis que l'huile de tung apporte une finition plus satinée et résistante à l'eau. L'essence d'orange, en plus de son parfum agréable, facilite l'application et accélère le séchage.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Appliquez au chiffon non pelucheux sur un bois propre et parfaitement sec, en suivant le fil. Laissez pénétrer une vingtaine de minutes puis essuyez soigneusement l'excédent. Le bois doit être préalablement poncé avec un grain fin pour ouvrir les pores et favoriser l'absorption. Travaillez dans un espace bien ventilé car les huiles siccatives dégagent des vapeurs. L'excédent non essuyé peut former une surface collante et irrégulière.",
                        image: "/images/illustrations/IbfC88l5u8c.webp",
                    },
                    {
                        content:
                            "Laissez sécher 24 h entre chaque couche et appliquez 2 à 3 passes selon l'exposition. Lustrez légèrement après séchage complet; un entretien semestriel préservera l'éclat et la résistance aux taches. Cette finition naturelle est idéale pour les plans de travail, les jouets en bois et les meubles en contact avec les aliments. Contrairement aux vernis, elle peut se réparer localement sans décaper l'ensemble. Conservez les chiffons imbibés à plat et immergés dans l'eau car ils peuvent s'enflammer spontanément.",
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
                            "Faites fondre la cire d'abeille au bain‑marie autour de 70°C et préparez des mèches en coton pré‑cirées adaptées au diamètre du contenant. Travaillez avec précaution et protégez le plan de travail. La cire d'abeille pure dégage un parfum naturel de miel lors de la combustion. Choisissez une mèche adaptée au diamètre : trop fine elle se noiera, trop épaisse elle fumera. Le bain-marie évite la surchauffe qui dégrade les propriétés de la cire.",
                        image: "/images/illustrations/66OgXiZ-pWk.webp",
                    },
                    {
                        content:
                            "Versez la cire dans des contenants résistants à la chaleur et centrez la mèche avec un support. Tapotez pour libérer les bulles d'air et assurer une surface homogène. Récupérez des pots en verre, tasses ébréchées ou coquilles de noix de coco pour des contenants originaux. Un crayon posé en travers du récipient maintient la mèche droite pendant la prise. Versez lentement pour éviter les bulles et laissez refroidir sans déplacer le contenant.",
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Laissez refroidir 24 h sans déplacement. Recoupez la mèche à 5–7 mm avant chaque allumage pour une combustion régulière et propre. La cire d'abeille brûle plus longtemps que la paraffine et purifie l'air en libérant des ions négatifs. Une bougie bien entretenue ne fume pas et se consume entièrement. Vous pouvez récupérer les restes de cire pour fabriquer de nouvelles bougies, réduisant ainsi le gaspillage à zéro.",
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
                            "Mélangez 40 ml d'hydrolat apaisant (bleuet ou camomille) avec 60 ml d'huile végétale douce (amande, jojoba) dans un flacon propre. Cette formule dissout efficacement le maquillage tout en respectant la peau. L'hydrolat de bleuet est particulièrement adapté aux yeux sensibles et décongestionne le contour des yeux. L'huile de jojoba régule le sébum et convient à tous les types de peau. Cette formule biphasée allie l'efficacité de l'huile pour dissoudre le maquillage et la fraîcheur de l'eau florale.",
                        image: "/images/illustrations/3g7YZVUV0A0.webp",
                    },
                    {
                        content:
                            "Ajoutez quelques gouttes de vitamine E comme antioxydant naturel et étiquetez la date de préparation. Agitez avant emploi pour réunir les deux phases et faciliter l'application. La vitamine E protège les huiles de l'oxydation et prolonge la durée de conservation du produit. Vous pouvez également ajouter une goutte d'huile essentielle de lavande pour ses propriétés apaisantes. Le flacon pompe est pratique pour doser et éviter la contamination du produit.",
                        image: "/images/illustrations/AB-HJwWN6Zk.webp",
                    },
                    {
                        content:
                            "Appliquez sur un coton lavable en gestes doux, puis rincez si nécessaire. Conservez à l'abri de la chaleur et utilisez idéalement sous deux mois. Les cotons lavables en bambou ou coton bio sont doux pour la peau et se lavent facilement en machine. Cette formule élimine même le maquillage waterproof sans frotter. Un rinçage à l'eau claire ou un passage de tonique complète parfaitement le démaquillage pour une peau nette et hydratée.",
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
                            "Récupérez une boîte métallique plate (type pastilles) et nettoyez‑la soigneusement. Vérifiez la fermeture pour éviter toute ouverture accidentelle en poche. Les boîtes de bonbons, pastilles à la menthe ou petits contenants métalliques sont parfaits pour ce projet. Assurez-vous que le métal ne rouille pas au contact des cendres humides. Une boîte de 5 à 8 cm de diamètre se glisse facilement dans une poche ou un sac.",
                        image: "/images/illustrations/7xcn6e8vixk.webp",
                    },
                    {
                        content:
                            "Tapissez le fond de sable fin pour absorber et éteindre rapidement. Ajoutez un petit galet parfumé ou une pastille désodorisante pour limiter les odeurs. Le sable étouffe la braise instantanément et absorbe l'humidité résiduelle. Vous pouvez aussi utiliser du marc de café séché qui neutralise les odeurs naturellement. Changez le sable régulièrement pour maintenir l'efficacité du système d'extinction.",
                        image: "/images/illustrations/DVfqws3bRxE.webp",
                    },
                    {
                        content:
                            "Personnalisez l'extérieur et emportez toujours le cendrier lors de vos sorties. Ce simple geste évite la dispersion des mégots dans l'environnement. Un mégot met jusqu'à 12 ans à se décomposer et pollue jusqu'à 500 litres d'eau. Décorez votre cendrier avec de la peinture, des stickers ou du washi tape pour le rendre unique et facilement identifiable. Videz-le dans une poubelle adaptée et non dans la nature ou les caniveaux.",
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
                            "Mélangez 2 parts de cristaux de soude, 2 parts d'acide citrique et 1 part de bicarbonate dans un grand bol. Travaillez à l'abri de l'humidité et portez des gants si nécessaire. Les cristaux de soude dégraissent puissamment, l'acide citrique combat le calcaire et fait briller, tandis que le bicarbonate neutralise les odeurs et adoucit l'eau. Mesurez avec précision car les proportions garantissent l'équilibre du pH et l'efficacité du nettoyage.",
                        image: "/images/illustrations/J9_a3-O7vGs.webp",
                    },
                    {
                        content:
                            "Ajoutez une part de sel fin pour l'effet adoucissant et transférez dans un bocal hermétique étiqueté. Conservez au sec, à l'abri des projections d'eau. Le sel régénère les résines du lave-vaisselle et prévient les dépôts de calcaire. Un bocal en verre avec couvercle à joint est idéal pour protéger la poudre de l'humidité qui la ferait prendre en bloc. Ajoutez un sachet de silice récupéré pour absorber l'humidité résiduelle.",
                        image: "/images/illustrations/BgbcekiNBlo.webp",
                    },
                    {
                        content:
                            "Dosez environ 1 cuillère à soupe par cycle selon la dureté de l'eau. Utilisez du vinaigre blanc comme liquide de rinçage pour une vaisselle brillante et sans traces. Le vinaigre dans le bac de rinçage élimine les résidus de détergent et fait briller les verres. Ajustez la dose selon la saleté de la vaisselle et la dureté de votre eau. Cette poudre maison coûte une fraction du prix des tablettes industrielles et ne contient aucun agent de blanchiment agressif ni parfum synthétique.",
                        image: "/images/illustrations/JHpAm3IQg5Q.webp",
                    },
                ],
            },
        },
    },
];
