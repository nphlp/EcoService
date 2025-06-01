"use client";

import Button from "@comps/ui/button";
import Loader from "@comps/ui/loader";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { useEffect, useState } from "react";
import { ArticleAuthorFetchResponse, ArticleFetchParams, ArticleFetchResponse } from "./fetchParams";

type ClientProps = {
    articleList: ArticleFetchResponse;
};

export default function ClientComponent(props: ClientProps) {
    // Destructur and rename props
    const { articleList: serverData } = props;

    // This data is hydrated on the server side
    // and can be updated when the user toggle the button
    const [articleList, setArticleList] = useState(serverData);

    // Toggle Author include
    const [isAuthorIncluded, setIsAuthorIncluded] = useState(true);

    // Auto-refresh data when a pramas change
    // Here it is `includeAuthor` which can be true or false
    const { data, isLoading, error } = useFetchV2({
        route: "/article",
        params: ArticleFetchParams({ includeAuthor: isAuthorIncluded }),
    });

    // Update state when data is refreshed
    useEffect(() => {
        if (data) setArticleList(data);
    }, [data]);

    // Handle error
    if (error) {
        return <div>{error ?? "There is no data."}</div>;
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="flex flex-col gap-4 rounded-lg border border-gray-200 px-10 py-8">
                <ArticleList isLoading={isLoading} articleList={articleList} />
            </div>
            <div className="flex justify-center py-4">
                <Button label="Toggle Author inclusion" onClick={() => setIsAuthorIncluded((prev) => !prev)} />
            </div>
        </div>
    );
}

type ArticleListProps = {
    articleList: ArticleFetchResponse;
    isLoading: boolean;
};

const ArticleList = (props: ArticleListProps) => {
    const { articleList, isLoading } = props;

    /**
     * Why a cast is needed?
     *
     * Selecting `Author` is a condition in `fetchParams.ts` function.
     * Due to a typescript limitation, we need to cast response type with the most complete type,
     * to get `Author` property in the `articleList` object.
     *
     * If we don't cast, we will get an error:
     * `Property 'Author' does not exist on type 'ArticleFetchResponse'.`
     *
     * Don't forget the `?` in the `article.Author?.name`
     */
    const articles = articleList as ArticleAuthorFetchResponse;

    return articles.map((article, index) => (
        <div key={index} className="flex w-full flex-col gap-2">
            {index !== 0 && <hr />}
            <div className="flex items-center gap-2">
                <strong>Title: </strong>
                <span>{article.title}</span>
            </div>
            <div className="flex items-center gap-2">
                <strong>Author: </strong>
                <span>{isLoading ? <Loader className="size-4" /> : (article.Author?.name ?? "...")}</span>
            </div>
        </div>
    ));
};
