import { FetchV2 } from "@utils/FetchV2/FetchV2";
import CatalogClient from "./components/catalog";
import { CategoryListFetchParams, ProductAmountFetchParams, ProductListFetchParams } from "./components/fetchParams";
import SelectorsClient from "./components/filters";
import PaginationClient from "./components/pagination";
import CatalogProvider from "./components/provider";
import { SearchParamsCached, SearchParamsType } from "./components/searchParams";

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
        <div className="flex h-full flex-col overflow-hidden">
            <h1 className="bg-eco text-ecoco px-6 pt-6 text-4xl font-bold">Catalogue</h1>
            <div className="bg-eco px-6 pt-2 text-white">
                Retrouvez l&apos;intégralité de nos produits dans notre catalogue.
            </div>
            <div className="flex h-full flex-col justify-start overflow-hidden">
                <CatalogProvider initialData={{ productList, productAmount }}>
                    <SelectorsClient categoryList={categoryList} />
                    <div className="flex-1 overflow-y-auto">
                        <CatalogClient className="p-6" />
                        <PaginationClient className="mb-6" />
                    </div>
                </CatalogProvider>
            </div>
        </div>
    );
}
