"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { PortalContext } from "./PortalContext";

type CssProps = number | string;
type BoxType = { x?: CssProps; y?: CssProps; w?: CssProps; h?: CssProps };

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
