import { FetchV2 } from "@utils/FetchV2";
import CatalogClient from "./components/catalog.client";
import CatalogProvider from "./components/catalog.provider";
import { CategoryListFetchParams, ProductAmountFetchParams, ProductListFetchParams } from "./components/fetchParams";
import PaginationClient from "./components/pagination.client";
import { SearchParamsCached, SearchParamsType } from "./components/searchParams";
import SelectorsClient from "./components/selectors.client";

type PageProps = {
    searchParams: Promise<SearchParamsType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await SearchParamsCached.parse(searchParams);

    const productAmount = await FetchV2({
        route: "/product/count",
        params: ProductAmountFetchParams({ category, search }),
    });

    const productList = await FetchV2({
        route: "/product",
        params: ProductListFetchParams({ priceOrder, page, take, category, search }),
    });

    const categoryList = await FetchV2({
        route: "/category",
        params: CategoryListFetchParams,
    });

    if (!categoryList.length || !productAmount || !productList.length) {
        throw new Error("Something went wrong...");
    }

    return (
        <div className="flex flex-1 flex-col">
            <h1 className="bg-primary text-secondary px-6 pt-6 text-4xl font-bold">Catalogue</h1>
            <div className="bg-primary px-6 pt-2 text-white">
                Retrouvez l&apos;intégralité de nos produits dans notre catalogue.
            </div>
            <div className="flex flex-1 flex-col justify-start overflow-hidden">
                <CatalogProvider initialData={{ productList, productAmount }}>
                    <SelectorsClient categoryList={categoryList} />
                    <CatalogClient className="p-6" />
                    <PaginationClient className="mb-6" />
                </CatalogProvider>
            </div>
        </div>
    );
}
