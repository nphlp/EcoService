import { FetchParallelized } from "@app/api/utils/FetchParallelized";
import CatalogClient from "./components/catalog.client";
import CatalogProvider from "./components/catalog.provider";
import SelectorsClient from "./components/selectors.client";
import PaginationClient from "./components/pagination.client";
import { QueryParamsType, queryParamsCached } from "./components/searchParams";

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams: Promise<QueryParamsType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await queryParamsCached.parse(searchParams);

    const [productAmount, productList, categoryList] = await FetchParallelized([
        {
            route: "/products/count",
            params: {
                where: {
                    ...(category && { categoryId: category }),
                    ...(search && { name: { contains: search } }),
                },
            },
        },
        {
            route: "/products",
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
            route: "/categories",
            params: { orderBy: { name: "asc" as const } },
        },
    ]);

    if (!categoryList || !productAmount) {
        throw new Error("Something went wrong...");
    }

    return (
        <div className="flex flex-1 flex-col">
            <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalogue</h1>
            <div className="bg-primary px-6 pt-2 text-white">
                Retrouvez l&apos;intégralité de nos produits dans notre catalogue.
            </div>
            <div className="flex flex-1 flex-col justify-start overflow-hidden">
                <CatalogProvider productList={productList} productAmount={productAmount}>
                    <SelectorsClient categoryList={categoryList} />
                    <CatalogClient className="p-6" />
                    <PaginationClient className="mb-6" />
                </CatalogProvider>
            </div>
        </div>
    );
}
