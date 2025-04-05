"use client";

import Card from "@comps/server/card";
import ImageRatio from "@comps/server/imageRatio";
import Button from "@comps/ui/button";
import { combo } from "@lib/combo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductListType } from "./fetchParams";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type SliderProps = {
    dataList: ProductListType;
    itemNumber?: number;
    gap?: number;
    padding?: number;
    className?: string;
};

const Slider = (props: SliderProps) => {
    const { dataList, className, itemNumber = 3, gap = 16, padding = 8 } = props;

    const gapOffset = `calc(${gap}px / (${itemNumber} / ${itemNumber - 1}))`;
    const itemWidth = `calc(100% / ${itemNumber} - ${gapOffset})`;

    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < dataList.length - itemNumber) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const itemWidth = slider.children[0].getBoundingClientRect().width;
            console.log(itemWidth);
            setTranslateX(-currentIndex * (itemWidth + gap));
        }
    }, [currentIndex, itemWidth, gap]);

    return (
        <div className={combo("relative w-full", className)}>
            <div
                ref={sliderRef}
                style={{
                    gap: `${gap}px`,
                    padding: `${padding}px`,
                }}
                className={combo(
                    "flex flex-row items-stretch justify-start",
                    "w-full overflow-x-auto",
                    "scrollbar-hide pointer-events-none touch-none",
                )}
            >
                {dataList.map(({ name, description, price, image }, index) => (
                    <motion.div
                        key={index}
                        initial={{ transform: `translateX(${translateX}px)` }}
                        animate={{ transform: `translateX(${translateX}px)` }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                            type: "spring",
                            bounce: 0.2,
                        }}
                        style={{
                            width: itemWidth,
                        }}
                        className="shrink-0 grow-0"
                    >
                        <Card className={combo("h-full overflow-hidden p-0")}>
                            <ImageRatio src={image} alt={name} />
                            <div className="p-7">
                                <div className="flex flex-row items-end justify-between">
                                    <h2 className="text-xl font-bold">{name}</h2>
                                    <p className="font-bold text-nowrap text-gray-500">{price} €</p>
                                </div>
                                <p className="text-sm text-gray-500">{description}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
            <Button
                label="Previous"
                onClick={handlePrevious}
                className={combo(
                    "absolute top-1/2 -left-1.5 -translate-y-1/2 rounded-full p-1",
                    currentIndex === 0 && "opacity-50 hover:opacity-50",
                )}
                disabled={currentIndex === 0}
                baseStyleWithout={["padding"]}
            >
                <ChevronLeft className="-translate-x-px size-10" />
            </Button>
            <Button
                label="Next"
                onClick={handleNext}
                className={combo(
                    "absolute top-1/2 -right-1.5 -translate-y-1/2 rounded-full p-1",
                    currentIndex === dataList.length - itemNumber && "opacity-50 hover:opacity-50",
                )}
                disabled={currentIndex === dataList.length - itemNumber}
                baseStyleWithout={["padding"]}
            >
                <ChevronRight className="translate-x-px size-10" />
            </Button>
        </div>
    );
};

export default Slider;
