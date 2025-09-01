"use client";

import ArticleOrDiyCard, { ArticleOrDiyCardSkeleton } from "@comps/PROJECT/cards/articleOrDiyCard";
import { usePageQueryParams, useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import Link from "@comps/UI/button/link";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { BookOpenText } from "lucide-react";
import { ArticleSearchType, articleFetchParams } from "./fetchParams";

type ArticleResultsProps = {
    initialArticleList: ArticleSearchType[];
};

export default function ArticleResults(props: ArticleResultsProps) {
    const { initialArticleList } = props;

    const { page } = usePageQueryParams();
    const { search } = useSearchQueryParams();

    const { data: articleList, isLoading } = useFetchV2({
        route: "/article/findMany",
        params: articleFetchParams({ page, search }),
        initialData: initialArticleList,
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

    if (!articleList?.length) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
                <BookOpenText className="size-24 stroke-1" />
                <div className="flex flex-col items-center text-xl">
                    <div className="font-semibold">Aucun article n&apos;a été trouvé</div>
                    <div>pour cette recherche.</div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
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
    );
}
