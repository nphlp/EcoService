import { SelectProductList } from "@actions/database/Product";
import CatalogueClient from "./client";
import { QueryParamType, queryParamCached } from "./type";

type CataloguePageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function CataloguePage(props: CataloguePageProps) {
    const { searchParams } = props;

    const dataCached = await queryParamCached.parse(searchParams);

    const take = 8;

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
        <div className="size-full space-y-4 overflow-hidden py-4">
            <h1 className="px-4 text-2xl font-bold">Catalogue</h1>
            <CatalogueClient produitList={produitList} take={take} />
        </div>
    );
}
