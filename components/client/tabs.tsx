"use client";

import Button from "@comps/ui/button";
import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

type TabClientProps = {
    cardList: {
        label: string;
        component: ReactNode;
    }[];
};

// Params for the tabs
const PADDING = "16px";
const GAP = "8px";

// TODO: add description
export default function TabClient(props: TabClientProps) {
    const { cardList } = props;

    // Current card height
    const [currentHeight, setCurrentHeight] = useState("auto");
    const heightRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Active tab
    const [activeTab, setActiveTab] = useState(0);

    const tabAmount = cardList.length;
    const realActiveTab = activeTab + 1;

    // Calculate tab width
    const tabWidth = `( (100% / ${tabAmount}) - ${PADDING} + (${GAP} / 2 * ${tabAmount - 1}) )`;

    // Calculate tab position
    const leftSide = `calc(${PADDING} + ${tabWidth} * ${activeTab})`;
    const rightSide = `calc(${PADDING} + ${tabWidth} * ${tabAmount - realActiveTab})`;

    // Initialize tab position
    const [tabPosition, setTabPosition] = useState({ left: leftSide, right: rightSide });

    // Update tab position
    useEffect(() => {
        setTabPosition({ left: leftSide, right: rightSide });
    }, [activeTab, leftSide, rightSide]);

    // Update card height
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

    return (
        <div className="min-w-[350px] space-y-3">
            <motion.div
                style={{ gap: GAP, padding: PADDING }}
                className="relative flex flex-row rounded-2xl border border-gray-300 bg-white shadow-md"
            >
                {/* Tab buttons */}
                {cardList.map(({ label }, index) => (
                    <Button
                        key={index}
                        variant="none"
                        baseStyleOnly={["padding", "rounded", "transition"]}
                        type="button"
                        label={"tab" + label}
                        className={combo(
                            "border border-transparent", // to get the same size for buttons and indicator
                            "relative z-20 w-full",
                            index !== activeTab && "hover:bg-gray-100",
                        )}
                        onClick={() => setActiveTab(index)}
                    >
                        {label}
                    </Button>
                ))}

                {/* Tab indicator */}
                <motion.div
                    id="tab-container"
                    initial={{ left: tabPosition.left, right: tabPosition.right }}
                    animate={{ left: tabPosition.left, right: tabPosition.right }}
                    transition={{
                        duration: 0.5,
                        animate: "easeInOut",
                        type: "spring",
                        bounce: 0.2,
                    }}
                    style={{ insetBlock: PADDING }}
                    className="absolute z-10 rounded-lg border border-gray-400/70 bg-gray-100"
                />
            </motion.div>

            {/* Card container */}
            <motion.div
                initial={{ height: "auto" }}
                animate={{ height: currentHeight }}
                transition={{
                    duration: 0.3,
                    animate: "easeInOut",
                }}
                className="w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md"
            >
                {cardList.map(
                    ({ component }, index) =>
                        activeTab === index && (
                            <div ref={heightRef} key={index} className="space-y-4 p-7">
                                {component}
                            </div>
                        ),
                )}
            </motion.div>
        </div>
    );
}
