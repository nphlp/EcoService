"use client";

import { combo } from "@lib/combo";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

// ==== Accordion Group ==== //

type AccordionGroupContextType = {
    openedAccordionIndex: number | null;
    setOpenedAccordionIndex: Dispatch<SetStateAction<number | null>>;
    idListRef: RefObject<Map<string, number>>;
};

// Context
const AccordionGroupContext = createContext<AccordionGroupContextType>({} as AccordionGroupContextType);

type AccordionGroupProps = {
    children: ReactNode;
    openByDefaultIndex?: number | null;
};

/**
 * Accordion Group to open one accordion at a time
 * Even if sub-accordion are nested in other tags
 * @example
 * ```tsx
 * <AccordionGroup openByDefaultIndex={1}>
 *     <Accordion />
 *     <Accordion /> // This will be opened by default
 *     <div>
 *         <Accordion />
 *         <Accordion />
 *     </div>
 * </AccordionGroup>
 * ```
 */
const AccordionGroup = (props: AccordionGroupProps) => {
    const { children, openByDefaultIndex = null } = props;

    const [openedAccordionIndex, setOpenedAccordionIndex] = useState(openByDefaultIndex);

    // Store the unique id list
    const idListRef = useRef<Map<string, number>>(new Map());

    return (
        <AccordionGroupContext.Provider value={{ openedAccordionIndex, setOpenedAccordionIndex, idListRef }}>
            {children}
        </AccordionGroupContext.Provider>
    );
};

// ==== Accordion Item ==== //

type AccordionContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    index?: number;
};

// Context
const AccordionContext = createContext<AccordionContextType>({} as AccordionContextType);

type AccordionProviderProps = {
    children: ReactNode;
    openByDefault: boolean;
    index?: number;
};

// Item Provider
const AccordionProvider = (props: AccordionProviderProps) => {
    const { children, openByDefault, index } = props;

    const { openedAccordionIndex, setOpenedAccordionIndex } = useContext(AccordionGroupContext);

    // Check if this accordion is default opened by the group
    const isOpenByGroup = index !== undefined && index === openedAccordionIndex;

    // Check if default is from accordion or group
    const [open, setOpen] = useState(isOpenByGroup ?? openByDefault);

    // Update the opened index
    useEffect(() => {
        if (typeof index === "number" && open === true) {
            setOpenedAccordionIndex(index);
        }
    }, [open]);

    // Update all accordions
    useEffect(() => {
        if (typeof index === "number" && openedAccordionIndex !== index) {
            setOpen(false);
        }
    }, [openedAccordionIndex]);

    return <AccordionContext.Provider value={{ open, setOpen, index }}>{children}</AccordionContext.Provider>;
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

    // Store the index of this accordion
    const indexRef = useRef<number>(undefined);

    // Get the id list
    const { idListRef } = useContext(AccordionGroupContext);

    // Get the id of this accordion
    const idRef = useRef<string>(nanoid());
    const id = idRef.current;

    // Register the accordion if it's not already in the list
    if (idListRef) {
        const idList = idListRef.current;
        if (!idList.has(id)) {
            idList.set(id, idList.size);
        }
    }

    // Prevent hydration error
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return <></>;

    // Determine the index of this accordion after the first render
    if (idListRef) {
        indexRef.current = idListRef.current.get(id);
    }

    return (
        <AccordionProvider openByDefault={openByDefault} index={indexRef.current}>
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

export { Accordion, AccordionButton, AccordionContent, AccordionGroup };
