import { FetchV2 } from "@utils/FetchV2";
import { ProductFetchParams } from "./fetchParams";
import Slider from "./slider";

export default async function Page() {
    const productList = await FetchV2({
        route: "/product",
        params: ProductFetchParams,
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-start p-5">
            <Slider dataList={productList} />
        </div>
    );
}
