import CatalogueClient from "./components/CatalogueClient";
import CatalogueContextProvider from "./components/ContextProvider";
import SelectorsClient from "./components/SelectorsClient";
import { QueryParamType, queryParamCached } from "./components/FilterTypes";
import { Fetch } from "@actions/utils/Fetch";

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
        params: { where: category ? { categoryId: category } : undefined },
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
            <h1 className="bg-primary px-6 pt-6 text-4xl font-bold text-secondary">Catalogue</h1>
            <div className="flex flex-1 flex-col justify-start gap-4 overflow-hidden">
                <CatalogueContextProvider productList={productList} productAmount={productAmount}>
                    <SelectorsClient categoryList={categoryList} />
                    <CatalogueClient />
                </CatalogueContextProvider>
            </div>
        </div>
    );
}
