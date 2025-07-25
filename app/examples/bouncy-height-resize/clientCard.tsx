"use client";

import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ProductResponse, selectProductFetch } from "./fetch";
import Toggle from "./toogle";

type ClientCardProps = {
    initialProductList: ProductResponse[];
};

export default function ClientCard(props: ClientCardProps) {
    const { initialProductList } = props;

    const [take, setTake] = useState(false);

    const { data: productList } = useFetchV2({
        route: "/product/findMany",
        params: {
            ...selectProductFetch,
            take: take ? 10 : 3,
        },
        initialData: initialProductList,
    });

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Bouncy Height Resizer</h1>
            <div className="text-sm text-gray-500">
                This is a simple example of how to create a bouncy height resizer.
            </div>
            <div className="flex items-center justify-center gap-5">
                <div className="text-md font-semibold text-gray-500">Take 3 items</div>
                <Toggle setValue={setTake} value={take} />
                <div className="text-md font-semibold text-gray-500">Take 10 items</div>
            </div>
            <AutoResizerCard>
                {productList?.map((product, index) => (
                    <div key={index}>{product.name}</div>
                ))}
            </AutoResizerCard>
        </div>
    );
}

type AutoResizerCardProps = {
    children: ReactNode;
};

const AutoResizerCard = (props: AutoResizerCardProps) => {
    const { children } = props;

    // Current height of the card
    const [currentHeight, setCurrentHeight] = useState("auto");

    // Ref to the tracked height element
    const heightRef = useRef<HTMLDivElement>(null);

    // Ref to the resize observer
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Update the height of the card when the height element changes
    useEffect(() => {
        // Get the height element from ref
        const heightElement = heightRef.current;

        // Prepare the update height function
        const updateHeight = () => {
            if (heightElement) {
                setCurrentHeight(heightElement.scrollHeight + "px");
            }
        };

        // Create the resize observer
        resizeObserverRef.current = new ResizeObserver(updateHeight);

        // Observe the height element
        if (heightElement) {
            resizeObserverRef.current.observe(heightElement);
        }

        // Disconnect the resize observer on unmount
        return () => {
            if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
        };
    }, []);

    return (
        <motion.div
            initial={{ height: "auto" }}
            animate={{ height: currentHeight }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
                type: "spring",
            }}
            className={"overflow-hidden rounded-xl border border-gray-300 shadow-md"}
        >
            <div ref={heightRef} className="flex flex-col gap-1 p-5">
                {children}
            </div>
        </motion.div>
    );
};
