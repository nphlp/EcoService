import ProductSlider from "@comps/client/ProductSlider";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { FetchParallelizedV2 } from "@utils/FetchParallelizedV2";
export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const [diy, productList] = await FetchParallelizedV2([
        {
            route: "/diy/unique",
            params: {
                where: { id },
                select: {
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
            },
        },
        {
            route: "/product",
            params: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 10,
            },
        },
    ]);

    if (!diy || !productList) {
        return <div className="container mx-auto px-4 py-10">Something went wrong...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="mb-10 text-center">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">{diy.title}</h1>
                {diy.Author && (
                    <p className="text-gray-600">
                        Par {diy.Author.name} •{" "}
                        {new Date(diy.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                )}
            </div>

            <div className="mx-auto max-w-[900px] space-y-16">
                {diy.Content?.map((content, index) => (
                    <div
                        key={index}
                        className={combo(
                            "flex flex-col items-center gap-8",
                            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                        )}
                    >
                        <p className="w-full md:w-2/3">{content.content}</p>

                        <ImageRatio
                            src={`/illustration/${content.image}`}
                            alt={`Illustration pour ${diy.title}`}
                            className="w-2/3 rounded-lg shadow-md md:w-1/3"
                        />
                    </div>
                ))}
            </div>

            {/* Ajoute un slider */}
            <section className="space-y-6 border-t border-gray-200 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-3xl font-bold">Produits recommandés</h2>
                <p className="text-center text-gray-600">Découvrez notre sélection de produits zéro déchet</p>
                <ProductSlider dataList={productList} />
            </section>

            {/* <div className="mt-16 flex justify-center">
                <ButtonClient type="link"  href="/do-it-yourself" label="Retour aux DIY" variant="outline">
                    Retour aux DIY
                </ButtonClient>
            </div> */}
        </div>
    );
}
