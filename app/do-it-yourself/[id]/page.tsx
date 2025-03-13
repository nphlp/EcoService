import { Fetch } from "@api/utils/Fetch";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";

export const dynamic = "force-dynamic";

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

            {/* <div className="mt-16 flex justify-center">
                <ButtonClient type="link"  href="/do-it-yourself" label="Retour aux DIY" variant="outline">
                    Retour aux DIY
                </ButtonClient>
            </div> */}
        </div>
    );
}
