"use client";

import ProductCard from "@comps/productCard";
import Slider, { LinkInfoType } from "@comps/ui/slider";
import { ProductListType } from "./sliderFetchParams";

type ProductSliderProps = {
    productList: ProductListType;
};

export default function ProductSlider(props: ProductSliderProps) {
    const { productList } = props;

    const linkList: LinkInfoType[] = productList.map((product) => ({
        label: product.name,
        href: `/product/${product.id}`,
    }));

    return (
        <Slider dataListLength={productList.length} linkList={linkList}>
            {productList.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </Slider>
    );
}
