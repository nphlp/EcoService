import ArticleOrDiyCard from "@comps/articleOrDiyCard";
import ImageRatio from "@comps/ui/imageRatio";
import Link from "@comps/ui/link";
import Slider from "@comps/ui/slider";
import { combo } from "@lib/combo";
import PrismaInstance from "@lib/prisma";
import { ArticleFindManyServer, ArticleFindUniqueServer } from "@services/server";
import { Metadata } from "next";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    const articles = await PrismaInstance.article.findMany({
        select: { slug: true },
        take: 30,
        // TODO: add a filter to get top 30 articles
    });

    return articles.map((article) => ({ slug: article.slug }));
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    "use cache";

    cacheLife("hours");
    cacheTag("article");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

    const { params } = props;
    const { slug } = await params;

    const article = await ArticleFindUniqueServer({ where: { slug } });

    if (!article) {
        return {
            title: "Article non trouvé - Eco Service",
        };
    }

    return {
        title: `${article.title} - Eco Service`,
        description: "Achetez des produits éco-responsables sur Eco Service.",
        // metadataBase: new URL(`${baseUrl}/article`),
        alternates: {
            canonical: `${baseUrl}/article/${slug}`,
        },
    };
}

export default async function Page(props: PageProps) {
    "use cache";

    cacheLife("hours");
    cacheTag("article");

    const { params } = props;
    const { slug } = await params;

    const article = await ArticleFindUniqueServer({
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
    });

    const otherArticleList = await ArticleFindManyServer({
        select: {
            title: true,
            slug: true,
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
        where: {
            slug: { not: slug },
        },
    });

    if (!article) notFound();

    return (
        <div className="w-full space-y-8 p-12">
            <div className="text-center">
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

            <div className="mx-auto max-w-[900px] space-y-12">
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
                            src={content.image}
                            alt={`Illustration pour ${article.title}`}
                            className="w-2/3 rounded-lg shadow-md md:w-1/3"
                        />
                    </div>
                ))}
            </div>

            <section className="space-y-6 py-8">
                <h2 className="text-center text-4xl font-bold">À lire aussi</h2>
                <Slider
                    dataListLength={otherArticleList.length}
                    linkList={otherArticleList.map((articleOrDiy) => ({
                        label: articleOrDiy.title,
                        href: `/article/${articleOrDiy.slug}`,
                    }))}
                >
                    {otherArticleList.map((articleOrDiy, index) => (
                        <ArticleOrDiyCard key={index} articleOrDiy={articleOrDiy} />
                    ))}
                </Slider>
            </section>

            <div className="flex justify-center">
                <Link href="/article" label="Retour aux articles" variant="outline">
                    Retour aux articles
                </Link>
            </div>
        </div>
    );
}
