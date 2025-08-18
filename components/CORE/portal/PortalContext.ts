import { ReactNode, createContext } from "react";

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
