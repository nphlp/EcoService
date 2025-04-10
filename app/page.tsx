import ImageRatio from "@comps/server/imageRatio";
import { combo } from "@lib/combo";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import ProductSlider from "@comps/productSlider";
import { ArticleOrDiyFetchParams, ProductFetchParams } from "@comps/sliderFetchParams";
import { ArticleOrDiySlider } from "@comps/articleOrDiySlider";

export default async function Page() {
    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded";

    const articleList = await FetchV2({
        route: "/article",
        params: ArticleOrDiyFetchParams,
    });

    const diyList = await FetchV2({
        route: "/diy",
        params: ArticleOrDiyFetchParams,
    });

    const productList = await FetchV2({
        route: "/product",
        params: ProductFetchParams,
    });

    if (!articleList || !diyList || !productList) {
        return <div className="container mx-auto px-4 py-10">Aucun article disponible pour le moment.</div>;
    }

    return (
        <>
            <section className="bg-primary flex flex-row items-center justify-between gap-12 p-8 md:p-16">
                <div className="w-full text-4xl font-bold text-nowrap sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white">Passez au</div>
                    <div className="text-secondary">zéro déchet</div>
                </div>
                <div className="flex flex-row items-center justify-center gap-8">
                    <ImageRatio
                        src="/illustration/produit 2.jpg"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
                    />
                    <ImageRatio
                        src="/illustration/produit 3.jpg"
                        alt="produit"
                        className={combo("max-md:hidden", imageClass)}
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
                    src="/illustration/produit 2.jpg"
                    alt="produit"
                    className="rounded-lg shadow-md max-lg:w-full lg:h-80"
                />
            </section>
            <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold">Nos produits vedettes</h2>
                <ProductSlider productList={productList} />
            </section>
            <section className="bg-primary space-y-6 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold text-white">Nos Do It Yourself</h2>
                <ArticleOrDiySlider articleOrDiy={diyList} link="/diy" />
            </section>
            <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold">Nos articles</h2>
                <ArticleOrDiySlider articleOrDiy={articleList} link="/article" />
            </section>
        </>
    );
}
