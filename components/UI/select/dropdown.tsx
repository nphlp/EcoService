"use client";

import { combo } from "@lib/combo";
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

    if (!isOpen || !buttonRect) return null;

    return (
        <div
            ref={optionListRef}
            className={combo(theme[variant].optionList, className?.optionList)}
            style={{ top, left, width }}
        >
            {children}
        </div>
    );
};

export default Dropdown;
