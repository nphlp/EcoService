import { SelectCategoryList } from "@actions/database/Categories";
import { SelectProductAmount, SelectProductList } from "@actions/database/Product";
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
        <FilterProvider productList={productList} productAmount={productAmount}>
            <div className="size-full space-y-4 overflow-hidden py-4">
                <h1 className="px-4 text-2xl font-bold">Catalogue</h1>
                <div className="flex h-full flex-col justify-start gap-4 overflow-hidden">
                    <FilterSelectClient categoryList={categoryList} />
                    <CatalogueClient />
                </div>
            </div>
        </FilterProvider>
    );
}
