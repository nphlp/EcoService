import { ProductFindManyServer } from "@services/server";
import ClientCard from "./clientCard";
import { selectProductFetch } from "./fetch";

export default async function Page() {
    const productList = await ProductFindManyServer({
        ...selectProductFetch,
        take: 3,
    });

    return (
        <div className="mt-16 flex-1">
            <ClientCard initialProductList={productList} />
        </div>
    );
}
