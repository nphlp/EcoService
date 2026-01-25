"use client";

import ArticleOrDiyCard, { ArticleOrDiyCardSkeleton } from "@comps/PROJECT/cards/articleOrDiyCard";
import { usePageQueryParams, useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { combo } from "@lib/combo";
import { BookOpenText } from "lucide-react";
import { Route } from "next";
import useSolid from "@/solid/solid-hook";
import { DiySearchType, diyFetchParams } from "./fetchParams";

type DiyResultsProps = {
    initialDiyList: DiySearchType[];
};

export default function DiyResults(props: DiyResultsProps) {
    const { initialDiyList } = props;

    const { page } = usePageQueryParams();
    const { search } = useSearchQueryParams();

    const { data: diyList, isLoading } = useSolid({
        route: "/solid/diy/findMany",
        params: diyFetchParams({ page, search }),
        initialData: initialDiyList,
    });

    if (isLoading) {
        return (
            <div
                className={combo(
                    "mx-auto max-w-400 px-2 md:px-5",
                    "grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4",
                )}
            >
                {Array.from({ length: 5 }).map((_, index) => (
                    <ArticleOrDiyCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (!diyList?.length) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
                <BookOpenText className="size-24 stroke-1" />
                <div className="flex flex-col items-center text-xl">
                    <div className="font-semibold">Aucun diy n&apos;a été trouvé</div>
                    <div>pour cette recherche.</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={combo(
                "mx-auto max-w-400 px-2 md:px-5",
                "grid w-full grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4",
            )}
        >
            {diyList.map((diy) => (
                <ArticleOrDiyCard
                    key={diy.slug}
                    href={`/diy/${diy.slug}` as Route}
                    articleOrDiy={diy}
                    mode="preloaded"
                />
            ))}
        </div>
    );
}
