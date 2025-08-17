import ProductCard from "@comps/productCard";
import Slider from "@comps/ui/slider";
import { ProductFindManyServer } from "@services/server";

export default async function Page() {
    const productList = await ProductFindManyServer({ take: 15 });

    return (
        <div className="flex w-full flex-1 flex-col items-start justify-start p-7">
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
