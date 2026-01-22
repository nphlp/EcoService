import CategoryFilter from "@comps/SHARED/CategoryFilter";
import Pagination from "@comps/SHARED/PaginationFilter";
import PriceOrderFilter from "@comps/SHARED/PriceOrderFilter";
import SearchFilter from "@comps/SHARED/SearchFilter";
import TakeFilter from "@comps/SHARED/TakeFilter";
import { createSelectOptions } from "@comps/UI/select/utils";
import {
    CategoryFindManyServer,
    CategoryFindUniqueServer,
    ProductCountServer,
    ProductFindManyServer,
} from "@services/server";
import { Metadata } from "next";
import { connection } from "next/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import Catalog from "./components/catalog";
import { Context } from "./components/context";
import { categoryFetchParams, productCountParams, productFetchParams } from "./components/fetchParams";
import Provider from "./components/provider";
import { catalogQueryParamsCached } from "./components/queryParams";

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

    const { searchParams } = props;

    const { category } = await catalogQueryParamsCached.parse(searchParams);

    const categoryData = await CategoryFindUniqueServer({ where: { slug: category } });

    if (!categoryData) {
        return {
            title: "Catalogue - Eco Service",
        };
    }

    return {
        title: `Catalogue - Eco Service`,
        description: categoryData
            ? `Tous les produits de la catégorie ${categoryData.name} sur Eco Service.`
            : "Retrouvez l'intégralité de nos produits dans notre catalogue.",
        metadataBase: new URL(`${baseUrl}/catalog`),
        alternates: {
            canonical: `${baseUrl}/catalog`,
        },
    };
}

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
    const { priceOrder, page, take, category, search } = await catalogQueryParamsCached.parse(searchParams);

    // Fetch data
    const initialProductAmount = await ProductCountServer(productCountParams({ category, search }));

    const initialProductList = await ProductFindManyServer(
        productFetchParams({ priceOrder, page, take, category, search }),
    );

    const categoryList = await CategoryFindManyServer(categoryFetchParams());

    return (
        <div className="flex w-full flex-1 flex-col">
            <h1 className="bg-primary text-secondary px-6 pt-6 text-4xl font-bold">Catalogue</h1>
            <div className="bg-primary px-6 pt-2 text-white">
                Retrouvez l&apos;intégralité de nos produits dans notre catalogue.
            </div>
            <div className="flex flex-1 flex-col justify-start">
                <Provider initialProductAmount={initialProductAmount}>
                    <div className="bg-primary grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">
                        <CategoryFilter
                            categoryOptions={createSelectOptions(categoryList, { label: "name", slug: "slug" })}
                        />
                        <PriceOrderFilter />
                        <TakeFilter />
                        <SearchFilter className={{ component: "space-y-0", label: "text-white" }} />
                    </div>
                    <div className="flex flex-1 flex-col justify-start">
                        <Catalog className="p-3 sm:p-6" initialProductList={initialProductList} />
                        <Pagination className="mb-6" path="/catalog" context={Context} />
                    </div>
                </Provider>
            </div>
        </div>
    );
};
