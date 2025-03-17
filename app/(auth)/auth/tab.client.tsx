"use client";

import Button from "@comps/ui/Button";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type TabClientProps = {
    cardList: {
        label: string;
        component: ReactNode;
    }[];
};

export default function TabClient(props: TabClientProps) {
    const { cardList } = props;

    const [currentHeight, setCurrentHeight] = useState("auto");
    const heightRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    const [activeTab, setActiveTab] = useState(0);
    const [tabPosition, setTabPosition] = useState({
        left: "8px",
        right: "calc(50% + 4px)",
    });

    useEffect(() => {
        const updateHeight = () => {
            if (heightRef.current) {
                setCurrentHeight(heightRef.current.scrollHeight + "px");
            }
        };

        resizeObserverRef.current = new ResizeObserver(updateHeight);

        if (heightRef.current) {
            resizeObserverRef.current.observe(heightRef.current);
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [activeTab]);

    useEffect(() => {
        const gap = "4px";
        const padding = "8px";
        const tabAmount = cardList.length;
        const tabWidth = `(100% / ${tabAmount} - ${gap})`;
        const activeReal = activeTab + 1;

        setTabPosition({
            //              8px    +    width    *    0 ou 1
            left: `calc(${padding} + ${tabWidth} * ${activeTab})`,
            //               8px    +    width    *    2-1=1   ou   2-2=0
            right: `calc(${padding} + ${tabWidth} * ${tabAmount - activeReal})`,
        });
    }, [activeTab, cardList.length]);

    return (
        <div className="min-w-[350px] space-y-3">
            <motion.div className="relative flex flex-row gap-2 rounded-2xl border border-gray-300 bg-white p-2 shadow-md">
                {cardList.map(({ label }, index) => (
                    <Button
                        key={index}
                        variant="none"
                        baseStyleOnly={["pointer", "padding"]}
                        type="button"
                        label={"tab" + label}
                        className="relative z-20 w-full"
                        onClick={() => setActiveTab(index)}
                    >
                        {label}
                    </Button>
                ))}
                <motion.div
                    initial={{ left: tabPosition.left, right: tabPosition.right }}
                    animate={{ left: tabPosition.left, right: tabPosition.right }}
                    transition={{
                        duration: 0.7,
                        animate: "easeInOut",
                        type: "spring",
                        bounce: 0.2,
                    }}
                    className="absolute inset-y-2 z-10 rounded-lg border border-gray-400/70 bg-gray-100"
                />
            </motion.div>
            <motion.div
                initial={{ height: "auto" }}
                animate={{ height: currentHeight }}
                transition={{
                    duration: 0.7,
                    animate: "easeInOut",
                    type: "spring",
                    bounce: 0.3,
                }}
                className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md"
            >
                {cardList.map(
                    ({ component }, index) =>
                        activeTab === index && (
                            <div ref={heightRef} key={index} className="space-y-4 p-5">
                                {component}
                            </div>
                        ),
                )}
            </motion.div>
        </div>
    );
}
