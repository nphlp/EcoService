"use client";

import { ArticleRelationsOptional } from "@class/ArticleClass";
import ImageRatio from "@comps/server/ImageRatio";
import { combo } from "@lib/combo";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type SliderClientProps = {
    className?: string;
    link: string;
    dataList: ArticleRelationsOptional[];
};

/**
 * @doc [React hooks](https://swiperjs.com/react)
 * @doc [Demos and examples](https://swiperjs.com/demos)
 */
export const SliderClient = (props: SliderClientProps) => {
    const { className, dataList, link } = props;

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
            {dataList.map((data, index) => (
                <SwiperSlide key={index} className="h-full">
                    <Link
                        key={index}
                        href={`${link}/${data.id}`}
                        className="group m-3 mb-6 flex flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-md"
                    >
                        {/* Image */}
                        {data.Content?.[0] && (
                            <div className="h-48 overflow-hidden">
                                <ImageRatio
                                    src={`/illustration/${data.Content[0].image}`}
                                    alt={data.title}
                                    className="size-full transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        )}

                        {/* Contenu */}
                        <div className="flex flex-col p-4">
                            <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-teal-600">
                                {data.title}
                            </h2>

                            {data.Content?.[0] && (
                                <p className="mb-4 line-clamp-3 text-gray-600">{data.Content[0].content}</p>
                            )}

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm text-gray-500">Par {data.Author?.name}</span>
                                <span className="text-sm text-gray-500">
                                    {new Date(data.createdAt).toLocaleDateString("fr-FR")}
                                </span>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
