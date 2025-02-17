import { SelectProductAmount, SelectProductList } from "@actions/database/Product";
import CatalogueClient from "./components/Catalogue";
import FilterProvider from "./components/FilterProvider";
import FilterSelectClient from "./components/FilterSelectClient";
import { QueryParamType, queryParamCached } from "./components/FilterTypes";

type CataloguePageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function CataloguePage(props: CataloguePageProps) {
    const { searchParams } = props;

    const dataCached = await queryParamCached.parse(searchParams);
    const { priceOrder, page, take } = dataCached;

    const productAmount = await SelectProductAmount();
    if (!productAmount) {
        return <div>Erreur lors de la récupération du nombre de produits</div>;
    }

    const produitList = await SelectProductList({
        ...(priceOrder !== "not" && {
            orderBy: { price: priceOrder },
        }),
        ...(page > 1 && {
            skip: (page - 1) * take,
        }),
        take,
    });

    // console.log(page, produitList?.map((produit) => produit.name));

    return (
        <FilterProvider>
            <div className="size-full space-y-4 overflow-hidden py-4">
                <h1 className="px-4 text-2xl font-bold">Catalogue</h1>
                <div className="flex h-full flex-col justify-start gap-4 overflow-hidden">
                    <FilterSelectClient productAmount={productAmount} />
                    <CatalogueClient produitList={produitList} />
                </div>
            </div>
        </FilterProvider>
    );
}
