import ProductCard from "@comps/productCard";
import Slider, { LinkInfoType } from "@comps/ui/slider";
import { ProductListType } from "./sliderFetchParams";

type ProductSliderProps = {
    productList: ProductListType;
    title: string;
};

export default async function ProductSlider(props: ProductSliderProps) {
    const { productList, title } = props;

    if (!productList.length) {
        return <></>;
    }

    const linkList: LinkInfoType[] = productList.map((product) => ({
        label: product.name,
        href: `/product/${product.id}`,
    }));

    return (
        <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Slider dataListLength={productList.length} linkList={linkList}>
                {productList.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </Slider>
        </section>
    );
}
