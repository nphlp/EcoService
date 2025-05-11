import { ArticleOrDiySlider } from "@comps/articleOrDiySlider";
import ImageRatio from "@comps/server/imageRatio";
import { ArticleOrDiyFetchParams } from "@comps/sliderFetchParams";
import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import PrismaInstance from "@lib/prisma";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");
}

export const dynamic = "auto";
export const revalidate = 3600;

export const generateStaticParams = async () => {
    const articles = await PrismaInstance.article.findMany({
        select: { id: true },
        take: 30,
        // TODO: add a filter to get top 30 articles
    });

    return articles.map((article) => ({ id: article.id }));
};

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const { params } = props;
    const { id } = await params;

    const article = await FetchV2({
        route: "/article/unique",
        params: {
            where: { id },
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

    return {
        title: article ? `${article.title} - Eco Service` : "Produit - Eco Service",
        description: article
            ? `Un article de ${article.Author?.name} sur Eco Service.`
            : "Achetez des produits éco-responsables sur Eco Service.",
        metadataBase: new URL(article ? `${baseUrl}/article/${id}` : `${baseUrl}/article`),
        alternates: {
            canonical: article ? `${baseUrl}/article/${id}` : `${baseUrl}/article`,
        },
        openGraph: {
            title: article ? `${article.title} - Eco Service` : "Produit - Eco Service",
            description: article
                ? `Un article de ${article.Author?.name} sur Eco Service.`
                : "Achetez des produits éco-responsables sur Eco Service.",
            url: article ? `${baseUrl}/article/${id}` : `${baseUrl}/article`,
            siteName: "Eco Service",
            locale: "fr_FR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: article ? `${article.title} - Eco Service` : "Produit - Eco Service",
            description: article
                ? `Un article de ${article.Author?.name} sur Eco Service.`
                : "Achetez des produits éco-responsables sur Eco Service.",
            images: [`${baseUrl}/icon-512x512.png`],
        },
    };
}

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const article = await FetchV2({
        route: "/article/unique",
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
    });

    const otherArticleList = await FetchV2({
        route: "/article",
        params: ArticleOrDiyFetchParams,
    });

    if (!article || !otherArticleList) {
        return <div className="container mx-auto px-4 py-10">Article non trouvé</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            {/* En-tête de l'article */}
            <div className="mb-10 text-center">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">{article.title}</h1>
                {article.Author && (
                    <p className="text-gray-600">
                        Par {article.Author.name} •{" "}
                        {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                )}
            </div>

            <div className="mx-auto max-w-[900px] space-y-16">
                {article.Content.map((content, index) => (
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
                            alt={`Illustration pour ${article.title}`}
                            className="w-2/3 rounded-lg shadow-md md:w-1/3"
                        />
                    </div>
                ))}
            </div>

            <ArticleOrDiySlider articleOrDiy={otherArticleList} link="/article" title="À lire aussi" />

            <div className="mt-16 flex justify-center">
                <Link href="/article" label="Retour aux articles" variant="outline">
                    Retour aux articles
                </Link>
            </div>
        </div>
    );
}
