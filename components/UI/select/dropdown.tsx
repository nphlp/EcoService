"use client";

import { combo } from "@lib/combo";
import { AnimatePresence, motion } from "motion/react";
import { ReactNode, startTransition, useContext, useEffect, useState } from "react";
import { Context } from "./context";
import { theme } from "./theme";

type DropdownProps = {
    children?: ReactNode;
};

const Dropdown = (props: DropdownProps) => {
    const { children } = props;

    const { isOpen, buttonRef, optionListRef, dropdownGap, variant, className } = useContext(Context);

    // Select button position
    const [buttonRect, setButtonRect] = useState<DOMRect | undefined>(undefined);

    // Options dropdown position
    const top = (buttonRect?.bottom ?? 0) + dropdownGap;
    const left = buttonRect?.left;
    const width = buttonRect?.width;

    // Update buttonRect on dropdown open
    useEffect(() => {
        if (isOpen) {
            const newButtonRect = buttonRef.current?.getBoundingClientRect();
            startTransition(() => {
                setButtonRect(newButtonRect);
            });
        }
    }, [isOpen, buttonRef]);

    // Update buttonRect on scroll
    useEffect(() => {
        const scrollableElement = document.getElementById("main");

        const scrollListener = () => {
            const newButtonRect = buttonRef.current?.getBoundingClientRect();
            setButtonRect(newButtonRect);
        };

        const targetElement = scrollableElement ?? window;
        targetElement.addEventListener("scroll", scrollListener, { passive: true });

        return () => {
            targetElement.removeEventListener("scroll", scrollListener);
        };
    }, [buttonRef]);

    const shouldRender = isOpen && buttonRect;

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    ref={optionListRef}
                    className={combo(theme[variant].optionList, className?.optionList)}
                    style={{ top, left, width }}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.1 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dropdown;
