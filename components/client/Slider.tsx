"use client";

import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type SliderClientProps = {
    imageList: string[];
    className?: string;
};

/**
 * @doc [React hooks](https://swiperjs.com/react)
 * @doc [Demos and examples](https://swiperjs.com/demos)
 */
export const SliderClient = (props: SliderClientProps) => {
    const { imageList, className } = props;

    return (
        <Swiper
            className={combo(className)}
            spaceBetween={32}
            slidesPerView={3}
            pagination={{
                enabled: true,
                dynamicBullets: true,
                clickable: true,
            }}
            modules={[Pagination]}
            loop
        >
            {imageList.map((image) => (
                <SwiperSlide key={image}>
                    <ImageRatio src={image} alt="pshit" className="rounded" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
