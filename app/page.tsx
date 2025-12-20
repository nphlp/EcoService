import { ArticleOrDiySlider } from "@comps/PROJECT/sliders/articleOrDiySlider";
import ProductSlider from "@comps/PROJECT/sliders/productSlider";
import { ArticleOrDiyFetchParams, ProductFetchParams } from "@comps/PROJECT/sliders/sliderFetchParams";
import ImageRatio from "@comps/UI/imageRatio";
import { combo } from "@lib/combo";
import { ArticleFindManyServer, DiyFindManyServer, ProductFindManyServer } from "@services/server";
import { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

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
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

const SuspendedPage = async () => {
    await connection();

    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded shadow-lg";

    // Data fetching
    const articleList = await ArticleFindManyServer(ArticleOrDiyFetchParams);
    const diyList = await DiyFindManyServer(ArticleOrDiyFetchParams);
    const productList = await ProductFindManyServer(ProductFetchParams);

    return (
        <div className="w-full">
            <section
                className="flex flex-row items-center justify-between gap-12 p-8 backdrop-blur-md"
                style={{
                    backgroundImage: "url('/home.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                }}
            >
                <div className="w-full text-4xl font-bold text-nowrap sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white text-shadow-lg">Passez au</div>
                    <div className="text-secondary text-shadow-lg">zéro déchet</div>
                </div>

                <div className="flex flex-row items-center justify-center gap-8">
                    <ImageRatio
                        src="/images/illustrations/BRVqq2uak4E.webp"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
                        mode="preloaded"
                    />
                    <ImageRatio
                        src="/images/illustrations/cTmJbqysgV8.webp"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
                        mode="preloaded"
                    />
                </div>
            </section>

            <div className="space-y-16 px-7 py-16">
                <section className="flex flex-col items-center gap-12 px-2 text-center lg:flex-row lg:justify-between lg:text-left">
                    <div className="space-y-4 lg:w-1/2">
                        <h1 className="text-secondary text-xl font-bold md:text-3xl">Réinventez Votre Quotidien !</h1>
                        <p className="text-gray-700">
                            Dans un monde où la surconsommation génère des tonnes de déchets chaque jour, le zéro déchet
                            apparaît comme une solution incontournable pour préserver notre environnement.
                        </p>
                        <p className="text-gray-700">
                            En choisissant des alternatives durables comme les produits réutilisables, les achats en
                            vrac et les objets réparables, vous pouvez diminuer considérablement votre impact écologique
                            tout en réalisant des économies.
                        </p>
                        <p className="text-gray-700">
                            Ce mode de vie repose sur un principe simple : réduire au maximum la production de déchets
                            en favorisant le réemploi, la réutilisation et le recyclage. En choisissant des alternatives
                            durables comme les produits réutilisables, les achats en vrac et les objets réparables, vous
                            pouvez diminuer considérablement votre impact écologique tout en réalisant des économies.
                        </p>
                    </div>
                    <ImageRatio
                        src="/images/illustrations/gtdSDl5IkKw.webp"
                        alt="produit"
                        className="rounded-lg shadow-md max-lg:w-full lg:h-80"
                        mode="preloaded"
                    />
                </section>

                <ProductSlider
                    productList={productList}
                    title="Nos produits vedettes"
                    description="Les produits bio et écologiques sont cultivés et fabriqués dans le respect de l'environnement, sans pesticides ni produits chimiques nocifs. Ils favorisent une agriculture durable, préservent la biodiversité et réduisent l'empreinte carbone de notre consommation quotidienne. Choisir bio, c'est agir pour sa santé tout en protégeant notre planète pour les générations futures."
                />
                <ArticleOrDiySlider
                    articleOrDiy={diyList}
                    link="/diy"
                    title="Nos Do It Yourself"
                    description="Apprenez à fabriquer vos propres produits écologiques et découvrez comment combiner nos articles pour un quotidien plus durable. Nos tutoriels vous guident pas à pas vers l'autonomie et la créativité responsable."
                />
                <ArticleOrDiySlider
                    articleOrDiy={articleList}
                    link="/article"
                    title="Nos articles"
                    description="Plongez dans l'univers de nos créateurs engagés et découvrez les valeurs qui animent chaque produit. Nos articles vous font rencontrer les artisans derrière nos collections et explorent les enjeux d'une consommation plus responsable."
                />
            </div>
        </div>
    );
};
