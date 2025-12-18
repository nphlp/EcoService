import ProductCard from "@comps/PROJECT/cards/productCard";
import { ProductListType } from "@comps/PROJECT/sliders/sliderFetchParams";
import { Carousel, Slide } from "@comps/UI/carousel";
import { Route } from "next";

type ProductSliderProps = {
    productList: ProductListType;
    title: string;
};

export default function ProductSlider(props: ProductSliderProps) {
    const { productList, title } = props;

    if (!productList.length) return null;

    return (
        <section className="space-y-6">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Carousel gap="0.5rem" withArrows>
                {productList.map((product) => (
                    <Slide key={product.id}>
                        <ProductCard
                            href={`/product/${product.slug}` as Route}
                            product={product}
                            mode="whenIsVisible"
                        />
                    </Slide>
                ))}
            </Carousel>
        </section>
    );
}
