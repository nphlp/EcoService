import ImageRatio from "@comps/server/imageRatio";
import { FetchV2 } from "@utils/FetchV2";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
    const articleList = await FetchV2({
        route: "/article",
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
    });

    if (!articleList) {
        return <div className="container mx-auto px-4 py-10">Aucun article disponible pour le moment.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">Nos articles</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articleList.map((article, index) => (
                    <Link
                        key={index}
                        href={`/article/${article.id}`}
                        className="group flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                    >
                        {/* Image */}
                        {article.Content && article.Content[0] && (
                            <div className="h-48 overflow-hidden">
                                <ImageRatio
                                    src={`/illustration/${article.Content[0].image}`}
                                    alt={article.title}
                                    className="size-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Contenu */}
                        <div className="flex flex-1 flex-col p-4">
                            <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-teal-600">
                                {article.title}
                            </h2>

                            {article.Content[0] && (
                                <p className="mb-4 line-clamp-3 text-gray-600">{article.Content[0].content}</p>
                            )}

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm text-gray-500">Par {article.Author.name}</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
