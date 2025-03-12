import { Fetch } from "@app/api/utils/Fetch";
import ButtonClient from "@comps/client/Button";
import ImageRatio from "@comps/server/ImageRatio";

export const dynamic = 'force-dynamic';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const article = await Fetch({
        route: "/articles/unique",
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

    if (!article) {
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

            <div className="space-y-16">
                {article.Content?.map((content, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                    >
                        <div className="flex-1">
                            <p className="text-lg leading-relaxed">{content.content}</p>
                        </div>

                        <div className="flex-1">
                            <ImageRatio
                                src={`/illustration/${content.image}`}
                                alt={`Illustration pour ${article.title}`}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <ButtonClient type="link" href="/articles" label="Retour aux articles" variant="outline">
                    Retour aux articles
                </ButtonClient>
            </div>
        </div>
    );
}
