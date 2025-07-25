"use cache";

import ImageRatio from "@comps/ui/imageRatio";
import { DiyFindManyServer } from "@services/server";
import { Metadata } from "next";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Nos tutoriels DIY",
    description: "Découvrez nos tutoriels DIY et nos conseils pour améliorer votre maison.",
    // metadataBase: new URL(`${baseUrl}/diy`),
    alternates: {
        canonical: `${baseUrl}/diy`,
    },
};

export default async function Page() {
    cacheLife("hours");
    cacheTag("diys");

    const diyList = await DiyFindManyServer({
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
    });

    if (!diyList) {
        return <div className="container mx-auto px-4 py-10">Aucun tutoriel DIY disponible pour le moment.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="mb-10 text-center text-3xl font-bold md:text-4xl">Nos tutoriels DIY</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {diyList.map((diy, index) => (
                    <Link
                        key={index}
                        href={`/diy/${diy.slug}`}
                        className="group flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
                    >
                        {/* Image */}
                        {diy.Content[0] && <ImageRatio src={diy.Content[0].image} alt={diy.title} />}

                        {/* Contenu */}
                        <div className="flex flex-1 flex-col p-4">
                            <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-teal-600">
                                {diy.title}
                            </h2>

                            {diy.Content[0] && (
                                <p className="mb-4 line-clamp-3 text-gray-600">{diy.Content[0].content}</p>
                            )}

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm text-gray-500">Par {diy.Author.name}</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(diy.createdAt).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
