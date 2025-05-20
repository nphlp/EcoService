import ProductSlider from "@comps/productSlider";
import ImageRatio from "@comps/server/imageRatio";
import { ProductFetchParams } from "@comps/sliderFetchParams";
import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import PrismaInstance from "@lib/prisma";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { Metadata } from "next";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export const generateStaticParams = async () => {
    const diys = await PrismaInstance.diy.findMany({
        select: { slug: true },
        take: 30,
        // TODO: add a filter to get top 30 diys
    });

    return diys.map((diy) => ({ slug: diy.slug }));
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    "use cache";

    cacheLife("hours");
    cacheTag("diy");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

    const { params } = props;
    const { slug } = await params;

    const diy = await FetchV2({
        route: "/diy/unique",
        params: {
            where: { slug },
            select: {
                title: true,
                Author: {
                    select: {
                        name: true,
                    },
                },
            },
        },
    });

    if (!diy) {
        return {
            title: "Tutoriel DIY non trouvé - Eco Service",
        };
    }

    return {
        title: `${diy.title} - Eco Service`,
        description: "Achetez des produits éco-responsables sur Eco Service.",
        // metadataBase: new URL(`${baseUrl}/diy`),
        alternates: {
            canonical: `${baseUrl}/diy/${slug}`,
        },
    };
}

export default async function Page(props: PageProps) {
    "use cache";

    cacheLife("hours");
    cacheTag("diy");

    const { params } = props;
    const { slug } = await params;

    const diy = await FetchV2({
        route: "/diy/unique",
        params: {
            where: { slug },
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
    });

    const productList = await FetchV2({
        route: "/product",
        params: ProductFetchParams,
    });

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

            <ProductSlider productList={productList} title="Produits recommandés" />

            <div className="mt-16 flex justify-center">
                <Link href="/diy" label="Retour aux DIY" variant="outline">
                    Retour aux DIY
                </Link>
            </div>
        </div>
    );
}
