import ArticleOrDiyCard from "@comps/PROJECT/cards/articleOrDiyCard";
import Link from "@comps/UI/button/link";
import { ArticleFindManyServer } from "@services/server";
import { Metadata } from "next";
import { SearchParams } from "nuqs/server";
import { articleQueryParamsCached } from "./queryParams";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Nos articles",
    description: "Découvrez nos articles et nos conseils pour améliorer votre maison.",
    // metadataBase: new URL(`${baseUrl}/article`),
    alternates: {
        canonical: `${baseUrl}/article`,
    },
};

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;
    const { search } = await articleQueryParamsCached.parse(searchParams);

    const articleList = await ArticleFindManyServer({
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
        orderBy: {
            createdAt: "desc",
        },
        where: {
            OR: [
                { title: { contains: search } },
                { slug: { contains: search } },
                {
                    Content: {
                        some: {
                            content: { contains: search },
                        },
                    },
                },
                {
                    Author: {
                        name: { contains: search },
                    },
                },
            ],
        },
    });

    if (!articleList) {
        return <div className="container mx-auto px-4 py-10">Aucun article disponible pour le moment.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">Nos articles</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {articleList.map((article, index) => (
                    <Link
                        key={index}
                        label={article.title}
                        href={`/article/${article.slug}`}
                        variant="none"
                        className="transition-scale rounded-xl duration-300 hover:scale-101"
                    >
                        <ArticleOrDiyCard articleOrDiy={article} mode="preloaded" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
