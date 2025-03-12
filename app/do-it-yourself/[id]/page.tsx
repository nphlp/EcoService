import { Fetch } from "@api/utils/Fetch";
import ButtonClient from "@comps/client/Button";
import ImageRatio from "@comps/server/ImageRatio";

export const dynamic = 'force-dynamic';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const diy = await Fetch({
        route: "/doItYourselves/unique",
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

    if (!diy) {
        return <div className="container mx-auto px-4 py-10">DIY non trouvé</div>;
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

            <div className="space-y-16">
                {diy.Content?.map((content, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                    >
                        {/* Texte */}
                        <div className="flex-1">
                            <p className="text-lg leading-relaxed">{content.content}</p>
                        </div>

                        {/* Image */}
                        <div className="flex-1">
                            <ImageRatio
                                src={`/illustration/${content.image}`}
                                alt={`Illustration pour ${diy.title}`}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <ButtonClient type="link" href="/do-it-yourself" label="Retour aux DIY" variant="outline">
                    Retour aux DIY
                </ButtonClient>
            </div>
        </div>
    );
}
