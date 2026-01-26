"use client";

import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode } from "react";
import { useSidebarStore } from "./sidebarStore";

export default function Sidebar(props: { width?: number; className?: string; children: ReactNode }) {
    const { width = 250, className, children } = props;
    const { isOpen, setIsOpen } = useSidebarStore();

    return (
        <>
            {/* Desktop sidebar */}
            <motion.div
                initial={{ width: isOpen ? width : 0 }}
                animate={{ width: isOpen ? width : 0 }}
                transition={{ duration: 0.3 }}
                className={combo("hidden md:block", className)}
            >
                <motion.div
                    initial={{ x: isOpen ? 0 : -width }}
                    animate={{ x: isOpen ? 0 : -width }}
                    transition={{ duration: 0.3 }}
                    style={{ width }}
                    className={combo("h-full overflow-hidden", "border-r border-gray-300", "space-y-2 p-5")}
                >
                    {children}
                </motion.div>
            </motion.div>

            {/* Mobile sidebar (full screen overlay) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/50 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar content */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={combo(
                                "fixed inset-y-0 left-0 z-50 w-full md:hidden",
                                "border-r border-gray-300",
                                "space-y-2 p-5",
                                className,
                            )}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 rounded-full p-2 text-gray-500 hover:bg-gray-200"
                            >
                                <X className="size-6" />
                            </button>

                            <div className="pt-12">{children}</div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
