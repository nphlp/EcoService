"use client";

import { combo } from "@lib/combo";
import { createContext, ReactNode, useContext, useState } from "react";

type CssProps = number | string | undefined;

type PortalContextType = {
    // Search
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    // Position
    position: { x: CssProps; y: CssProps };
    setPosition: (position: { x: CssProps; y: CssProps }) => void;

    // Size
    size: { w: CssProps; h: CssProps };
    setSize: (size: { w: CssProps; h: CssProps }) => void;

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

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<{ x: CssProps; y: CssProps }>({ x: 0, y: 0 });
    const [size, setSize] = useState<{ w: CssProps; h: CssProps }>({ w: 0, h: 0 });
    const [content, setContent] = useState<ReactNode | null>(null);

    const value = { isOpen, setIsOpen, position, setPosition, size, setSize, content, setContent };

    return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
};

export const Portal = () => {
    const { isOpen, position, size, content } = useContext(PortalContext);

    return (
        <div
            id="portal"
            className={combo("absolute", !isOpen && "pointer-events-none")}
            style={{ top: position.y, left: position.x, width: size.w, height: size.h }}
        >
            {content}
        </div>
    );
};
