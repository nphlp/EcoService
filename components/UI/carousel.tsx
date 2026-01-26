"use client";

import { combo } from "@lib/combo";
import useBreakpoint, { Breakpoint } from "@utils/use-breakpoint";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Button from "./button/button";

type ContextType = {
    gap: string;
    emblaApi: UseEmblaCarouselType["1"] | undefined;
};

const Context = createContext<ContextType>({
    gap: "1rem",
    emblaApi: undefined,
});

type ProviderProps = {
    value: ContextType;
    children: ReactNode;
};

const Provider = (props: ProviderProps) => {
    const { value, children } = props;
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

type SlidePerView = Record<Breakpoint, number>;

const slidePerViewDefault: Record<Breakpoint, number> = {
    mobile: 1,
    "3xs": 1,
    "2xs": 1,
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
    "2xl": 4,
    "3xl": 4,
};

type CarouselProps = {
    /**
     * Number of slides to show per view at each breakpoint
     * @default `{ mobile: 1.2, "3xs": 1.2, "2xs": 1.2, xs: 2.2, sm: 2.2, md: 2.2, lg: 3.2, xl: 3.2, "2xl": 4.2, "3xl": 5.2 }`
     */
    slidePerView?: SlidePerView;
    /**
     * Gap between slides
     * @default "1rem"
     */
    gap?: string;
    /**
     * CSS hack to allow shadow overflow
     * @default "2rem"
     *
     * **Recommendation**
     * - Set to "0rem" when no shadow is needed
     */
    shadowSpace?: string;
    /**
     * Defines how to handle the last card overflow
     * - This problem occurs when using the shadowSpace
     * @default "clip-path"
     *
     * **Settings**
     * - "clip-path": specify a clip-path to hide overflowed part, the clip-path offset is configurable
     * - "margin": use margin to distort the container width
     *
     * **Recommendations**
     * - For round `slidePerView` settings (e.g. { "xl": 3 }), use "clip-path"
     * - For float `slidePerView` settings (e.g. { "xl": 3.2 }), use "margin"
     */
    manageLastCardOverflow?: "clip-path" | "margin";
    /**
     * Offset used for clip-path `x` axis when `manageLastCardOverflow` is set to "clip-path"
     * @default "0.8rem"
     */
    clippingOffset?: string;
    withArrows?: boolean;
    children: ReactNode;
};

/**
 *
 * @example
 * ```tsx
 * <Page className="p-7 w-screen">
 *     <Carousel gap="1.5rem" withArrows>
 *         {products.map((product) => (
 *             <Slide key={product.id}>
 *                 <Card className="shadow hover:shadow-lg">{product.name}</Card>
 *             </Slide>
 *         ))}
 *     </Carousel>
 * </Page>
 * ```
 */
const Carousel = (props: CarouselProps) => {
    const {
        slidePerView = slidePerViewDefault,
        gap = "1rem",
        shadowSpace = "2rem",
        manageLastCardOverflow = "clip-path",
        clippingOffset = "0.8rem",
        children,
        withArrows = false,
    } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, align: "start" });

    const breakpoint = useBreakpoint();

    return (
        <Provider value={{ gap, emblaApi }}>
            <div className="bg.-red-50 relative max-w-full min-w-full">
                <div
                    // Manage last card overflow: specify a clip-path to hide overflowed part
                    // Ideal for round slidePerView settings, problematic for float slidePerView settings
                    style={{
                        clipPath: manageLastCardOverflow === "clip-path" ? `inset(0 -${clippingOffset})` : undefined,
                    }}
                >
                    <div
                        style={{
                            // Negative margin on wrapper (for shadow overflow)
                            margin: `calc(${shadowSpace} * -1)`,
                        }}
                    >
                        <div
                            className="overflow-hidden"
                            style={{
                                // Positive padding on overflow-hidden container (for shadow overflow)
                                padding: `${shadowSpace}`,
                                // Manage last card overflow: use margin to distort the container width
                                // Ideal for float slidePerView settings, problematic for round slidePerView settings
                                marginRight: manageLastCardOverflow === "margin" ? `calc(${shadowSpace})` : undefined,
                            }}
                            ref={emblaRef}
                        >
                            <div
                                className="bg.-green-50 grid touch-pan-y touch-pinch-zoom grid-flow-col backface-hidden"
                                style={{
                                    gridAutoColumns: `calc(100% / ${slidePerView[breakpoint]})`,
                                    marginLeft: `calc(${gap} * -1)`,
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                {withArrows && <Arrow />}
            </div>
        </Provider>
    );
};

type SlideProps = {
    children: ReactNode;
};

const Slide = (props: SlideProps) => {
    const { children } = props;
    const { gap } = useContext(Context);

    return <div style={{ paddingLeft: gap }}>{children}</div>;
};

const Arrow = () => {
    const { emblaApi } = useContext(Context);

    const [canScroll, setCanScroll] = useState({ prev: false, next: false });

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCanScroll({
                prev: emblaApi.canScrollPrev(),
                next: emblaApi.canScrollNext(),
            });
        };

        // First render
        onSelect();

        // Listen for changes
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        return () => {
            // Cleanup listeners
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi]);

    const style = combo("absolute top-1/2 -translate-y-1/2", "data-disabled:opacity-50");

    return (
        <>
            <Button
                label="Previous"
                className={{ button: combo(style, "rounded-full p-2", "-left-2 md:-left-4", "disabled:opacity-30") }}
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScroll.prev}
            >
                <ArrowLeft className="size-5" />
            </Button>
            <Button
                label="Next"
                className={{ button: combo(style, "rounded-full p-2", "-right-2 md:-right-4", "disabled:opacity-30") }}
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScroll.next}
            >
                <ArrowRight className="size-5" />
            </Button>
        </>
    );
};

export { Carousel, Slide };
