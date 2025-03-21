import { FetchParallelized } from "@utils/FetchParallelized";
import CatalogClient from "./components/catalog.client";
import CatalogProvider from "./components/catalog.provider";
import PaginationClient from "./components/pagination.client";
import { SearchParamsCached, SearchParamsType } from "./components/searchParams";
import SelectorsClient from "./components/selectors.client";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<SearchParamsType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await SearchParamsCached.parse(searchParams);

    const [productAmount, productList, categoryList] = await FetchParallelized([
        {
            route: "/product/count",
            params: {
                where: {
                    ...(category && { categoryId: category }),
                    ...(search && { name: { contains: search } }),
                },
            },
        },
        {
            route: "/product",
            params: {
                ...(priceOrder !== "not" && { orderBy: { price: priceOrder } }),
                ...(page > 1 && { skip: (page - 1) * take }),
                take,
                where: {
                    ...(category && { categoryId: category }),
                    ...(search && { name: { contains: search } }),
                },
            },
        },
        {
            route: "/category",
            params: { orderBy: { name: "asc" as const } },
        },
    ]);

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
