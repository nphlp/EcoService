"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
            className="w-full overflow-hidden bg-white"
        >
            <div className="flex h-full flex-row flex-wrap items-center justify-center gap-6 bg-gray-100 p-10">
                {children}
            </div>
        </motion.div>
    );
}
