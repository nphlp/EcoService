"use client";

import { combo } from "@lib/combo";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type CssProps = number | string;

type BoxType = { x?: CssProps; y?: CssProps; w?: CssProps; h?: CssProps };

type PortalContextType = {
    // Search
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    // Position and size
    box: BoxType;
    setBox: (box: BoxType) => void;

    // Content
    content: ReactNode;
    setContent: (content: ReactNode) => void;
};

export const PortalContext = createContext<PortalContextType>({} as PortalContextType);

type PortalProviderProps = {
    children: ReactNode;
};

export const PortalProvider = (props: PortalProviderProps) => {
    const { children } = props;

    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const [box, setBox] = useState<BoxType>({});
    const [content, setContent] = useState<ReactNode | null>(null);

    // Destroy portal content on route change
    // when a backward or forward navigation shortcut is used
    useEffect(() => {
        setIsOpen(false);
        setBox({});
        setContent(null);
    }, [pathname]);

    const value = { isOpen, setIsOpen, box, setBox, content, setContent };

    return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
};

export const Portal = () => {
    const { isOpen, box, content } = useContext(PortalContext);

    return (
        <div
            id="portal"
            className={combo("absolute z-50", !isOpen && "pointer-events-none")}
            style={{ top: box.y, left: box.x, width: box.w, height: box.h }}
        >
            {content}
        </div>
    );
};
