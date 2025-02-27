import { SelectCategoryList } from "@actions/database/Categories";
import {
    SelectProductAmount,
    SelectProductList,
} from "@actions/database/Product";
import CatalogueClient from "./components/CatalogueClient";
import FilterSelectClient from "./components/FilterSelectClient";
import { QueryParamType, queryParamCached } from "./components/QueryTypes";
import { CatalogueStoreProvider } from "./components/CatalogueProvider";

type PageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    const { priceOrder, page, take, category, search } = await queryParamCached.parse(searchParams);

    const productAmount = await SelectProductAmount({
        where: category ? { categoryId: category } : undefined,
    });
    if (!productAmount) {
        throw new Error("We don't have any product...");
    }

    const productList = await SelectProductList({
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
    });

    const categoryList = await SelectCategoryList({
        orderBy: { name: "asc" },
    });
    if (!categoryList) {
        throw new Error("We don't have any category...");
    }

    return (
        <div className="flex flex-1 flex-col">
            <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalogue</h1>
            <div className="flex flex-1 flex-col justify-start gap-4 overflow-hidden">
                <CatalogueStoreProvider
                    initialValues={{
                        productList,
                        productAmount,
                    }}
                >
                    <FilterSelectClient categoryList={categoryList} />
                    <CatalogueClient />
                </CatalogueStoreProvider>
            </div>
        </div>
    );
}
