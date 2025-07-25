"use cache";

import { ArticleOrDiySlider } from "@comps/articleOrDiySlider";
import ProductSlider from "@comps/productSlider";
import { ArticleOrDiyFetchParams, ProductFetchParams } from "@comps/sliderFetchParams";
import ImageRatio from "@comps/ui/imageRatio";
import { combo } from "@lib/combo";
import { ArticleFindManyServer, DiyFindManyServer, ProductFindManyServer } from "@services/server";
import { Metadata } from "next";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Eco Service",
    description: "Achetez des produits éco-responsables sur Eco Service.",
    metadataBase: new URL(baseUrl),
    alternates: {
        canonical: `${baseUrl}`,
    },
};

export default async function Page() {
    cacheLife("hours");
    cacheTag("home");

    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded shadow-lg";

    // Data fetching
    const articleList = await ArticleFindManyServer(ArticleOrDiyFetchParams);
    const diyList = await DiyFindManyServer(ArticleOrDiyFetchParams);
    const productList = await ProductFindManyServer(ProductFetchParams);

    return (
        <div className="w-full">
            <section
                className="flex flex-row items-center justify-between gap-12 p-8 backdrop-blur-md md:p-16"
                style={{
                    backgroundImage: "url('/illustration/produit 4.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div className="w-full text-4xl font-bold text-nowrap sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white text-shadow-lg">Passez au</div>
                    <div className="text-secondary text-shadow-lg">zéro déchet</div>
                </div>
                <div className="flex flex-row items-center justify-center gap-8">
                    <ImageRatio
                        src="/illustration/produit 2.webp"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
                        priority
                    />
                    <ImageRatio
                        src="/illustration/produit 3.webp"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
                        priority
                    />
                </div>
            </section>
            <section className="flex flex-col items-center gap-12 px-8 pt-8 text-center lg:flex-row lg:justify-between lg:px-16 lg:pt-16 lg:text-left">
                <div className="space-y-4 lg:w-1/2">
                    <h1 className="text-secondary text-xl font-bold md:text-3xl">Réinventez Votre Quotidien !</h1>
                    <p className="mt-2 text-gray-700">
                        Dans un monde où la surconsommation génère des tonnes de déchets chaque jour, le zéro déchet
                        apparaît comme une solution incontournable pour préserver notre environnement.
                    </p>
                    <p className="mt-2 text-gray-700">
                        En choisissant des alternatives durables comme les produits réutilisables, les achats en vrac et
                        les objets réparables, vous pouvez diminuer considérablement votre impact écologique tout en
                        réalisant des économies.
                    </p>
                    <p className="mt-2 text-gray-700">
                        Ce mode de vie repose sur un principe simple : réduire au maximum la production de déchets en
                        favorisant le réemploi, la réutilisation et le recyclage. En choisissant des alternatives
                        durables comme les produits réutilisables, les achats en vrac et les objets réparables, vous
                        pouvez diminuer considérablement votre impact écologique tout en réalisant des économies.
                    </p>
                </div>
                <ImageRatio
                    src="/illustration/produit 5.webp"
                    alt="produit"
                    className="rounded-lg shadow-md max-lg:w-full lg:h-80"
                    priority
                />
            </section>
            <ProductSlider productList={productList} title="Nos produits vedettes" />
            <ArticleOrDiySlider articleOrDiy={diyList} link="/diy" title="Nos Do It Yourself" />
            <ArticleOrDiySlider articleOrDiy={articleList} link="/article" title="Nos articles" />
        </div>
    );
}
