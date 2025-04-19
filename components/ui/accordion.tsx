"use client";

import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";

type AccordionContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

// Context
const AccordionContext = createContext<AccordionContextType>({} as AccordionContextType);

type AccordionProviderProps = {
    children: ReactNode;
    openByDefault: boolean;
};

// Provider
const AccordionProvider = (props: AccordionProviderProps) => {
    const { children, openByDefault } = props;
    const [open, setOpen] = useState(openByDefault);

    return <AccordionContext.Provider value={{ open, setOpen }}>{children}</AccordionContext.Provider>;
};

type AccordionProps = {
    openByDefault?: boolean;
    className?: string;
    children: ReactNode;
};

/**
 * Accordion
 * @example
 * ```tsx
 * <Accordion>
 *     <AccordionButton>Clic me to open the accordion</AccordionButton>
 *     <AccordionContent>
 *         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
 *     </AccordionContent>
 * </Accordion>
 * ```
 */
const Accordion = (props: AccordionProps) => {
    const { className, children, openByDefault = false } = props;

    return (
        <AccordionProvider openByDefault={openByDefault}>
            <div
                className={combo(
                    "w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionProvider>
    );
};

type AccordionButtonProps = {
    classComponent?: string;
    children: ReactNode;
    classLabel?: string;
};

// AccordionButton
const AccordionButton = (props: AccordionButtonProps) => {
    const { children, classComponent, classLabel } = props;

    const { open, setOpen } = useContext(AccordionContext);

    return (
        <button className={combo("w-full p-2", classComponent)} onClick={() => setOpen(!open)}>
            <div
                className={combo(
                    "w-full items-center justify-between rounded-lg px-3 py-1.5",
                    "hover:cursor-pointer hover:bg-gray-100",
                    "transition-colors duration-200",
                    "flex items-center justify-between",
                )}
            >
                <div className={combo("flex flex-col items-start", classLabel)}>{children}</div>
                <motion.div animate={{ rotate: open ? -180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronUp className="size-6" />
                </motion.div>
            </div>
        </button>
    );
};

type AccordionContentProps = {
    children: ReactNode;
    className?: string;
};

// AccordionContent
const AccordionContent = (props: AccordionContentProps) => {
    const { children, className } = props;

    const { open } = useContext(AccordionContext);

    return (
        <motion.div
            initial={{ height: open ? "auto" : 0 }}
            animate={{ height: open ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className={combo(className)}
        >
            <hr className="mx-5 border-gray-200" />
            <div className="p-5">{children}</div>
        </motion.div>
    );
};

export { Accordion, AccordionButton, AccordionContent };
