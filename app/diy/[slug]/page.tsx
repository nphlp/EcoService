import ArticleOrDiyCard from "@comps/articleOrDiyCard";
import ImageRatio from "@comps/ui/imageRatio";
import Link from "@comps/ui/link";
import Slider from "@comps/ui/slider";
import { combo } from "@lib/combo";
import PrismaInstance from "@lib/prisma";
import { DiyFindManyServer, DiyFindUniqueServer } from "@services/server";
import { Metadata } from "next";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    const diyList = await PrismaInstance.diy.findMany({
        select: { slug: true },
        take: 30,
        // TODO: add a filter to get top 30 diy
    });

    return diyList.map((diy) => ({ slug: diy.slug }));
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

    const diy = await DiyFindUniqueServer({ where: { slug } });

    if (!diy) {
        return {
            title: "DIY non trouvé - Eco Service",
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

    const diy = await DiyFindUniqueServer({
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

    const otherDiyList = await DiyFindManyServer({
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

    if (!diy) notFound();

    return (
        <div className="w-full space-y-8 p-12">
            <div className="text-center">
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

            <div className="mx-auto max-w-[900px] space-y-12">
                {diy.Content.map((content, index) => (
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
                            alt={`Illustration pour ${diy.title}`}
                            className="w-2/3 rounded-lg shadow-md md:w-1/3"
                        />
                    </div>
                ))}
            </div>

            <section className="space-y-6 py-8">
                <h2 className="text-center text-4xl font-bold">À lire aussi</h2>
                <Slider
                    dataListLength={otherDiyList.length}
                    linkList={otherDiyList.map((diy) => ({
                        label: diy.title,
                        href: `/diy/${diy.slug}`,
                    }))}
                >
                    {otherDiyList.map((diy, index) => (
                        <ArticleOrDiyCard key={index} articleOrDiy={diy} />
                    ))}
                </Slider>
            </section>

            <div className="flex justify-center">
                <Link href="/diy" label="Retour aux diy" variant="outline">
                    Retour aux diy
                </Link>
            </div>
        </div>
    );
}
