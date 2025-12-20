import Pagination from "@comps/SHARED/PaginationFilter";
import SearchFilter from "@comps/SHARED/SearchFilter";
import { combo } from "@lib/combo";
import { ArticleCountServer, ArticleFindManyServer } from "@services/server";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { connection } from "next/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import ArticleResults from "./articleResults";
import { Context } from "./context";
import { articleCountParams, articleFetchParams } from "./fetchParams";
import Provider from "./provider";
import { articleQueryParamsCached } from "./queryParams";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Nos articles",
    description: "Découvrez nos articles et nos conseils pour améliorer votre maison.",
    metadataBase: new URL(`${baseUrl}/article`),
    alternates: {
        canonical: `${baseUrl}/article`,
    },
};

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { searchParams } = props;

    // Get search params
    const { page, search } = await articleQueryParamsCached.parse(searchParams);

    // Fetch data
    const initialArticleAmount = await ArticleCountServer(articleCountParams({ search }));

    const initialArticleList = await ArticleFindManyServer(articleFetchParams({ page, search }));

    return (
        <div className="container mx-auto flex flex-1 flex-col space-y-6 px-5 py-10">
            <Provider initialArticleAmount={initialArticleAmount}>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h1 className="text-center text-3xl font-bold md:text-4xl">Nos articles</h1>
                    <div className={combo("group flex flex-row items-center justify-center gap-4")}>
                        <Search
                            className={combo(
                                "text-gray-400 group-focus-within:text-gray-700",
                                "transition-all duration-150",
                            )}
                        />
                        <SearchFilter
                            className={{
                                input: "rounded-none border-x-0 border-t-0 border-b-gray-300 px-0 py-0.5 ring-transparent",
                            }}
                            noLabel
                        />
                    </div>
                </div>
                <ArticleResults initialArticleList={initialArticleList} />
                <Pagination path="/article" takeOverride={6} context={Context} />
            </Provider>
        </div>
    );
};
