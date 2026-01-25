"use client";

import { combo } from "@lib/combo";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { useSidebarStore } from "./sidebarStore";

export default function SidebarLayout(props: { width?: number; className?: string; children: ReactNode }) {
    const { width = 250, className, children } = props;
    const { isOpen } = useSidebarStore();

    return (
        <motion.div
            initial={{ width: isOpen ? width : 0 }}
            animate={{ width: isOpen ? width : 0 }}
            transition={{ duration: 0.3 }}
            className={combo(className)}
        >
            <motion.div
                initial={{ x: isOpen ? 0 : -width }}
                animate={{ x: isOpen ? 0 : -width }}
                transition={{ duration: 0.3 }}
                style={{ width }}
                className={combo("h-full overflow-hidden", "border-r-1 border-gray-300", "space-y-2 p-5")}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
