import ProductCard from "@comps/PROJECT/cards/productCard";
import { ProductListType } from "@comps/PROJECT/sliders/sliderFetchParams";
import Slider, { LinkInfoType } from "@comps/UI/slider";
import { Route } from "next";

type ProductSliderProps = {
    productList: ProductListType;
    title: string;
};

export default function ProductSlider(props: ProductSliderProps) {
    const { productList, title } = props;

    if (!productList.length) return null;

    const linkList: LinkInfoType[] = productList.map((product) => ({
        label: product.name,
        href: `/product/${product.slug}` as Route,
    }));

    return (
        <section className="space-y-6">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Slider dataListLength={productList.length} linkList={linkList}>
                {productList.map((product, index) => (
                    <ProductCard key={index} product={product} mode="whenIsVisible" />
                ))}
            </Slider>
        </section>
    );
}
