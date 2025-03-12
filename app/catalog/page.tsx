import { Fetch } from "@api/utils/Fetch";
import CatalogClient from "./components/catalogClient";
import CatalogContextProvider from "./components/contextProvider";
import { QueryParamType, queryParamCached } from "./components/filterTypes";
import PaginationClient from "./components/paginationClient";
import SelectorsClient from "./components/selectorsClient";

export const dynamic = 'force-dynamic';

type PageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await queryParamCached.parse(searchParams);

    const categoryList = await Fetch({ route: "/categories", params: { orderBy: { name: "asc" } } });
    if (!categoryList) {
        throw new Error("We don't have any category...");
    }

    const productAmount = await Fetch({
        route: "/products/count",
        params: {
            where: {
                ...(category && { categoryId: category }),
                ...(search && {
                    name: {
                        contains: search,
                    },
                }),
            },
        },
    });
    if (!productAmount) {
        throw new Error("We don't have any product...");
    }

    const productList = await Fetch({
        route: "/products",
        params: {
            ...(priceOrder !== "not" && {
                orderBy: { price: priceOrder },
            }),
            ...(page > 1 && {
                skip: (page - 1) * take,
            }),
            take,
            where: {
                ...(category && { categoryId: category }),
                ...(search && {
                    name: {
                        contains: search,
                    },
                }),
            },
        },
    });

    return (
        <div className="flex flex-1 flex-col">
            <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalog</h1>
            <div className="flex flex-1 flex-col justify-start overflow-hidden">
                <CatalogContextProvider productList={productList} productAmount={productAmount}>
                    <SelectorsClient categoryList={categoryList} />
                    <CatalogClient className="p-6" />
                    <PaginationClient className="mb-6" />
                </CatalogContextProvider>
            </div>
        </div>
    );
}
