import { RefObject, createContext } from "react";
import { CommonProps } from "./select";

// Context
export type ContextType = CommonProps & {
    // Internal States
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    // Internal Refs
    buttonRef: RefObject<HTMLButtonElement | null>;
    optionListRef: RefObject<HTMLDivElement | null>;
};

export const Context = createContext<ContextType>({} as ContextType);
