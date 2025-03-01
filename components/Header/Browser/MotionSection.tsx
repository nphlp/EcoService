"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { combo } from "@lib/combo";

type MotionSectionProps = {
    open: boolean;
    onMouseLeave?: () => void;
    children: ReactNode;
};

export default function MotionSection(props: MotionSectionProps) {
    const { children, open, onMouseLeave } = props;

    return (
        <motion.div
            initial={{ height: 0 }}
            animate={{
                height: open ? "auto" : 0,
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut",
            }}
            onMouseLeave={onMouseLeave}
            className={combo("w-full overflow-hidden bg-white")}
        >
            <div className="flex h-full flex-row flex-wrap items-center justify-center gap-3 bg-gray-100 p-4">
                {children}
            </div>
        </motion.div>
    );
};