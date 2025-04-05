import { FetchV2 } from "@utils/FetchV2";
import { ProductFetchParams } from "./fetchParams";
import Slider from "./slider";

export default async function Page() {
    const productList = await FetchV2({
        route: "/product",
        params: ProductFetchParams,
    });

    return (
        <div className="flex min-h-screen flex-col items-start justify-start p-5">
            <h1 className="text-2xl font-bold">Incredible slider</h1>
            <p className="text-gray-500 text-sm">A custom slider made with framer motion</p>
            <Slider dataList={productList} />
        </div>
    );
}
