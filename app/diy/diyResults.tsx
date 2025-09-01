"use client";

import ArticleOrDiyCard, { ArticleOrDiyCardSkeleton } from "@comps/PROJECT/cards/articleOrDiyCard";
import { usePageQueryParams, useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import Link from "@comps/UI/button/link";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { BookOpenText } from "lucide-react";
import { DiySearchType, diyFetchParams } from "./fetchParams";

type DiyResultsProps = {
    initialDiyList: DiySearchType[];
};

export default function DiyResults(props: DiyResultsProps) {
    const { initialDiyList } = props;

    const { page } = usePageQueryParams();
    const { search } = useSearchQueryParams();

    const { data: diyList, isLoading } = useFetchV2({
        route: "/diy/findMany",
        params: diyFetchParams({ page, search }),
        initialData: initialDiyList,
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {diyList.map((diy, index) => (
                <Link
                    key={index}
                    label={diy.title}
                    href={`/diy/${diy.slug}`}
                    variant="none"
                    className="transition-scale rounded-xl duration-300 hover:scale-101"
                >
                    <ArticleOrDiyCard articleOrDiy={diy} mode="preloaded" />
                </Link>
            ))}
        </div>
    );
}
