import { ArticleOrDiySlider } from "@comps/articleOrDiySlider";
import ImageRatio from "@comps/server/imageRatio";
import { ArticleOrDiyFetchParams } from "@comps/sliderFetchParams";
import Link from "@comps/ui/link";
import { combo } from "@lib/combo";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
export const dynamic = "force-dynamic";

type PageProps = {
    params: Promise<{ id: string }>;
};

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

            <section className="space-y-6 border-t border-gray-200 px-6 py-8 md:px-12 md:py-16">
                <h2 className="text-center text-3xl font-bold">À lire aussi</h2>
                <p className="text-center text-gray-600">D&apos;autres articles qui pourraient vous intéresser</p>
                <ArticleOrDiySlider articleOrDiy={otherArticleList} link="/article" />
            </section>

            <div className="mt-16 flex justify-center">
                <Link href="/article" label="Retour aux articles" variant="outline">
                    Retour aux articles
                </Link>
            </div>
        </div>
    );
}
