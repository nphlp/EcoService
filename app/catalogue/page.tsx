import { SelectProductList } from "@actions/database/Product";
import CatalogueClient from "./client";
import { QueryParamType, queryParamCached } from "./type";

type CataloguePageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function CataloguePage(props: CataloguePageProps) {
    const { searchParams } = props;

    const dataCached = await queryParamCached.parse(searchParams);

    const take = 6;

    const produitList = await SelectProductList({
        ...(dataCached.priceOrder !== "" && {
            orderBy: { price: dataCached.priceOrder as "asc" | "desc" },
        }),
        ...(dataCached.page > 1 && {
            skip: (dataCached.page - 1) * take,
        }),
        take,
    });

    console.log(dataCached.page, produitList?.map((produit) => produit.name));

    return (
        <div className="w-full">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Catalogue</h1>
            <CatalogueClient produitList={produitList} take={take} />
        </div>
    );
}
