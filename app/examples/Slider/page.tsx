import ProductCard from "@comps/productCard";
import Slider from "@comps/ui/slider";
import { FetchV2 } from "@utils/FetchV2/FetchV2";

export default async function Page() {
    const productList = await FetchV2({
        route: "/product",
        params: {
            take: 15,
        },
    });

    return (
        <div className="flex h-full flex-col items-start justify-start p-5">
            <h1 className="text-2xl font-bold">Incredible slider</h1>
            <p className="text-sm text-gray-500">A custom slider made with framer motion</p>
            <Slider dataListLength={productList.length}>
                {productList.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </Slider>
        </div>
    );
}
