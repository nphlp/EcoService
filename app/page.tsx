import { SliderClient } from "@comps/client/Slider";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { FetchParallelized } from "./api/utils/FetchParallelized";

export const dynamic = "force-dynamic";

export default async function Page() {
    const imageClass = "h-[100px] sm:h-[150px] md:h-[120px] lg:h-[160px] xl:h-[220px] rounded";

    const [articleList, diyList] = await FetchParallelized([
        {
            route: "/articles",
            params: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    Content: {
                        select: {
                            content: true,
                            image: true,
                        },
                    },
                    Author: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
        {
            route: "/doItYourselves",
            params: {
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    Content: {
                        select: {
                            content: true,
                            image: true,
                        },
                    },
                    Author: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    ]);

    if (!articleList || !diyList) {
        return <div className="container mx-auto px-4 py-10">Aucun article disponible pour le moment.</div>;
    }

    return (
        <>
            <section className="flex flex-row items-center justify-between gap-12 bg-primary p-8 md:p-16">
                <div className="w-full text-nowrap text-4xl font-bold sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <div className="text-white">Passez au</div>
                    <div className="text-secondary">zéro déchet</div>
                </div>
                <div className="flex flex-row items-center justify-center gap-4">
                    <ImageRatio src="/illustration/produit 2.jpg" alt="produit" className={imageClass} />
                    <ImageRatio
                        src="/illustration/coton 3.jpg"
                        alt="coton"
                        className={combo("max-md:hidden", imageClass)}
                    />
                </div>
            </section>
            <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold">Nos articles</h2>
                <SliderClient dataList={articleList} />
            </section>
            <section className="space-y-6 bg-primary px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold text-white">Nos Do It Yourself</h2>
                <SliderClient dataList={diyList} />
            </section>
            <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-4xl font-bold">Nos articles</h2>
                <SliderClient dataList={articleList} />
            </section>
        </>
    );
}
