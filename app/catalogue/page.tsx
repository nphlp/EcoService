import { SelectCategoryList } from "@actions/database/Categories";
import {
    SelectProductAmount,
    SelectProductList,
} from "@actions/database/Product";
import CatalogueClient from "./components/CatalogueClient";
import FilterProvider from "./components/FilterProvider";
import FilterSelectClient from "./components/FilterSelectClient";
import { QueryParamType, queryParamCached } from "./components/FilterTypes";

type CataloguePageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function CataloguePage(props: CataloguePageProps) {
    const { searchParams } = props;

    const dataCached = await queryParamCached.parse(searchParams);
    const { priceOrder, page, take, category } = dataCached;

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
        where: category ? { categoryId: category } : undefined,
    });

    const categoryList = await SelectCategoryList({
        orderBy: { name: "asc" },
    });
    if (!categoryList) {
        throw new Error("We don't have any category...");
    }

    return (
        <div className="flex size-full flex-col gap-4 bg-white">
            <h1 className="px-6 pt-6 text-4xl font-bold">Catalogue</h1>
            <div className="flex flex-1 flex-col justify-start gap-4 overflow-hidden">
                <FilterProvider
                    productList={productList}
                    productAmount={productAmount}
                >
                    <FilterSelectClient categoryList={categoryList} />
                    <CatalogueClient />
                </FilterProvider>
            </div>
        </div>
    );
}
