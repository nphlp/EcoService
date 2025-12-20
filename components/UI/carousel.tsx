"use client";

import Button from "@comps/UI/button/button";
import { combo } from "@lib/combo";
import useBreakpoint, { Breakpoint } from "@utils/use-breakpoint";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode, createContext, useContext } from "react";

type ContextType = {
    size: string;
    gap: string;
    emblaApi: UseEmblaCarouselType["1"] | undefined;
};

const Context = createContext<ContextType>({ size: "calc(100% / 2)", gap: "1.5rem", emblaApi: undefined });

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
    sm: 2.75,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 5,
    "3xl": 6,
};

type CarouselProps = {
    slidePerView?: SlidePerView;
    gap?: string;
    children: ReactNode;
    withArrows?: boolean;
};

/**
 *
 * @example
 * ```tsx
 * <Page className="p-7 w-screen">
 *     <Carousel gap="1.5rem">
 *         {products.map((product) => (
 *             <Slide key={product.id}>
 *                 <Card>{product.name}</Card>
 *             </Slide>
 *         ))}
 *     </Carousel>
 * </Page>
 * ```
 */
const Carousel = (props: CarouselProps) => {
    const { slidePerView = slidePerViewDefault, gap = "1rem", children, withArrows = false } = props;

    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, align: "start" });

    const breakpoint = useBreakpoint();

    const size = `calc(100% / ${slidePerView[breakpoint]})`;

    return (
        <Provider value={{ size, gap, emblaApi }}>
            <div className="relative max-w-full min-w-full overflow-hidden" ref={emblaRef}>
                <div
                    className="flex touch-pan-y touch-pinch-zoom backface-hidden"
                    style={{
                        marginLeft: `calc(${gap} * -1)`,
                    }}
                >
                    {children}
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

    const { size, gap } = useContext(Context);

    return (
        <div
            className="min-w-0 flex-none"
            style={{
                paddingLeft: gap,
                flexBasis: size,
            }}
        >
            {children}
        </div>
    );
};

const Arrow = () => {
    const { emblaApi } = useContext(Context);

    const style = "absolute top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/30 disabled:bg-black/30";

    return (
        <>
            <Button
                label="Previous"
                className={{
                    button: combo(style, "left-0"),
                }}
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!emblaApi?.canScrollPrev()}
                focusVisible
            >
                <ArrowLeft className="size-5" />
            </Button>
            <Button
                label="Next"
                className={{
                    button: combo(style, "right-0"),
                }}
                onClick={() => emblaApi?.scrollNext()}
                disabled={!emblaApi?.canScrollNext()}
                focusVisible
            >
                <ArrowRight className="size-5" />
            </Button>
        </>
    );
};

export { Carousel, Slide };
