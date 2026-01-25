import { ArticleOrDiySlider } from "@comps/PROJECT/sliders/articleOrDiySlider";
import Link from "@comps/UI/button/link";
import ImageRatio from "@comps/UI/imageRatio";
import { combo } from "@lib/combo";
import { ArticleFindManyServer, ArticleFindUniqueServer } from "@services/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
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
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

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
        <div className={combo("mx-auto w-full max-w-400 px-4 md:px-7", "space-y-8 py-12")}>
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

            <div className="space-y-12">
                {article.Content.map((content, index) => (
                    <div
                        key={index}
                        className={combo(
                            "flex flex-col items-center gap-8",
                            index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse",
                        )}
                    >
                        <p className="w-full">{content.content}</p>

                        <ImageRatio
                            src={content.image}
                            alt={`Illustration pour ${article.title}`}
                            className={combo("flex-none rounded-lg shadow-md", "w-full sm:w-1/3 md:w-1/4 lg:w-1/5")}
                            mode="preloaded"
                        />
                    </div>
                ))}
            </div>

            <ArticleOrDiySlider articleOrDiy={otherArticleList} title="À lire aussi" link="/article" />

            <div className="flex justify-center">
                <Link href="/article" label="Retour aux articles" variant="outline">
                    Retour aux articles
                </Link>
            </div>
        </div>
    );
};
