"use client";

import useBreakpoint, { Breakpoint } from "@utils/use-breakpoint";
import useEmblaCarousel from "embla-carousel-react";
import { ReactNode, createContext, useContext } from "react";

type ContextType = {
    size: string;
    gap: string;
};

const Context = createContext<ContextType>({ size: "calc(100% / 2)", gap: "1.5rem" });

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
    mobile: 1.25,
    "3xs": 1.25,
    "2xs": 1.25,
    xs: 2.25,
    sm: 2.75,
    md: 3.25,
    lg: 4.25,
    xl: 5.25,
    "2xl": 5.25,
    "3xl": 6.25,
};

type CarouselProps = {
    slidePerView?: SlidePerView;
    gap?: string;
    children: ReactNode;
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
    const { slidePerView = slidePerViewDefault, gap = "1rem", children } = props;

    const [emblaRef] = useEmblaCarousel({ slidesToScroll: 1, align: "start" });

    const breakpoint = useBreakpoint();

    const size = `calc(100% / ${slidePerView[breakpoint]})`;

    return (
        <Provider value={{ size, gap }}>
            <div className="max-w-screen overflow-hidden" ref={emblaRef}>
                <div
                    className="flex touch-pan-y touch-pinch-zoom backface-hidden"
                    style={{
                        marginLeft: `calc(${gap} * -1)`,
                    }}
                >
                    {children}
                </div>
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

export { Carousel, Slide };
