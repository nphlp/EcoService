"use client";

import { CompleteProduct } from "@actions/zod-generated";
import { useBasketStore } from "@comps/Basket/BasketStore";
import ButtonClient from "@comps/client/Button";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { CircleCheck, CirclePlus, CircleX, ShoppingCart } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ProductSliderProps = {
    className?: string;
    dataList: CompleteProduct[];
};

export default function ProductSlider(props: ProductSliderProps) {
    const { className, dataList } = props;

    const { basketProductList, addProductToBasket, removeProductFromBasket } = useBasketStore();

    const handleClick = (e: React.MouseEvent, product: typeof dataList[0]) => {
        e.preventDefault();
        
        if (basketProductList.some((p) => p.id === product.id)) {
            removeProductFromBasket(product);
        } else {
            addProductToBasket(product);
        }
    };

    return (
        <Swiper
        className={combo(className)}
        slidesPerView={3.2}
        pagination={{
            enabled: true,
            dynamicBullets: true,
            clickable: true,
        }}
        breakpoints={{
            1280: {
                slidesPerView: 4.2,
            },
            1024: {
                slidesPerView: 3.2,
            },
            768: {
                slidesPerView: 2.2,
            },
            480: {
                slidesPerView: 1.2,
            },
            320: {
                slidesPerView: 1.2,
            },
            20: {
                slidesPerView: 1.2,
            },  
        }}
        modules={[Pagination]}
        loop
        >
            {dataList.map((product) => (
                <SwiperSlide key={product.id} className="h-full">
                    <Link
                        href={`/product/${product.id}`}
                        className="group m-3 mb-6 flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md"
                    >
                        <div className="h-48 overflow-hidden">
                            <ImageRatio
                                src={product.image}
                                alt={product.name}
                                className="size-full transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                            <h3 className="mb-2 line-clamp-1 text-xl font-semibold transition-colors duration-300 group-hover:text-teal-600">
                                {product.name}
                            </h3>
                            <p className="mb-4 text-lg text-primary">{product.price.toFixed(2)} €</p>
                            <div className="mt-auto flex items-center justify-end">
                                <ButtonClient
                                    type="button"
                                    label="add-to-basket"
                                    onClick={(e) => handleClick(e, product)}
                                    className="group relative size-fit rounded-xl p-[10px] transition-all duration-300 hover:scale-105"
                                >
                                    {basketProductList.some((p) => p.id === product.id) ? (
                                        <>
                                            <CircleCheck className="group-hover:hidden" />
                                            <CircleX className="hidden group-hover:block" />
                                        </>
                                    ) : (
                                        <>
                                            <CirclePlus className="absolute translate-x-[45%] translate-y-[-35%] scale-[0.8] fill-white stroke-black stroke-[3px]" />
                                            <ShoppingCart />
                                        </>
                                    )}
                                </ButtonClient>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
} 