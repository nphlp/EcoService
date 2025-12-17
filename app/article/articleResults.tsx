"use client";

import ArticleOrDiyCard, { ArticleOrDiyCardSkeleton } from "@comps/PROJECT/cards/articleOrDiyCard";
import { usePageQueryParams, useSearchQueryParams } from "@comps/SHARED/queryParamsClientHooks";
import { BookOpenText } from "lucide-react";
import { Route } from "next";
import useSolid from "@/solid/solid-hook";
import { ArticleSearchType, articleFetchParams } from "./fetchParams";

type ArticleResultsProps = {
    initialArticleList: ArticleSearchType[];
};

export default function ArticleResults(props: ArticleResultsProps) {
    const { initialArticleList } = props;

    const { page } = usePageQueryParams();
    const { search } = useSearchQueryParams();

    const { data: articleList, isLoading } = useSolid({
        route: "/solid/article/findMany",
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
            {articleList.map((article) => (
                <ArticleOrDiyCard
                    key={article.slug}
                    href={`/article/${article.slug}` as Route}
                    articleOrDiy={article}
                    mode="preloaded"
                />
            ))}
        </div>
    );
}
