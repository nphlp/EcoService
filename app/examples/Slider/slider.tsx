"use client";

import Card from "@comps/server/card";
import ImageRatio from "@comps/server/imageRatio";
import Button from "@comps/ui/button";
import { combo } from "@lib/combo";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductListType } from "./fetchParams";

type SliderProps = {
    dataList: ProductListType;
    itemNumber?: number;
    gap?: number;
    paddingX?: number;
    paddingY?: number;
    overflow?: boolean;
    className?: string;
};

const Slider = (props: SliderProps) => {
    const { dataList, className, itemNumber = 3, gap = 16, paddingX = 8, paddingY = 8, overflow = false } = props;

    // Slider states
    const sliderRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);

    // Draging states
    const [isDragging, setIsDragging] = useState(false);

    // Swipe to left
    const handlePrevious = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    // Swipe to right
    const handleNext = () => {
        if (currentIndex < dataList.length - itemNumber) setCurrentIndex((prev) => prev + 1);
    };

    // Handle dragging
    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);

        const { offset, velocity } = info;

        // Movement
        const velocityX = Math.abs(velocity.x);
        const offsetX = Math.abs(offset.x);

        // Direction
        const toLeft = offset.x > 0;
        const toRight = offset.x < 0;

        // Power
        const power = velocityX * offsetX;
        const limit = 50000;

        // Swipe
        if (toLeft && power > limit) {
            handlePrevious();
        } else if (toRight && power > limit) {
            handleNext();
        }
    };

    // Swipe to right or left on current index changes
    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const itemWidth = slider.children[0].getBoundingClientRect().width;
            setTranslateX(-currentIndex * (itemWidth + gap));
        }
    }, [currentIndex, gap]);

    return (
        <div className={combo("relative w-full", className)}>
            {/* Slider container */}
            <motion.div
                // Enable keyboard navigation
                aria-label="Slider"
                role="button"
                tabIndex={0}
                // Control the slider
                ref={sliderRef}
                // Drag
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDrag}
                // Style
                style={{
                    gap: `${gap}px`,
                    paddingInline: `${paddingX}px`,
                    paddingBlock: `${paddingY}px`,
                }}
                className={combo(
                    "flex flex-row items-stretch justify-start outline-none",
                    overflow && "overflow-hidden",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
                // Events
                onWheel={(e) => {
                    const delta = e.deltaX;
                    if (delta !== 0) {
                        if (delta > 0) handleNext();
                        else handlePrevious();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                        handlePrevious();
                    } else if (e.key === "ArrowRight") {
                        handleNext();
                    }
                }}
            >
                {/* Slider items */}
                {dataList.map(({ name, description, price, image }, index) => {
                    const gapOffset = `calc(${gap}px / (${itemNumber} / ${itemNumber - 1}))`;
                    const itemWidth = `calc(100% / ${itemNumber} - ${gapOffset})`;

                    return (
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
                                <ImageRatio src={image} alt={name} onMouseDown={(e) => e.preventDefault()} />
                                <div className="p-7">
                                    <div className="flex flex-row items-end justify-between">
                                        <h2 className="text-xl font-bold">{name}</h2>
                                        <p className="font-bold text-nowrap text-gray-500">{price} €</p>
                                    </div>
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Swipe buttons */}
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
                <ChevronLeft className="size-10 -translate-x-px" />
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
                <ChevronRight className="size-10 translate-x-px" />
            </Button>
        </div>
    );
};

export default Slider;
