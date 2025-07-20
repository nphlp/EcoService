"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { PortalContext } from "../Portal";
import { useHeaderStore } from "../header/headerStore";
import SearchModal, { SearchModalProps } from "./SearchModal";
import { combo } from "@lib/combo";

const DURATION = 0.3;

/**
 * Generate a modal through the portal context and component
 */
export default function SearchPortal(props: SearchModalProps) {
    const { initialResults } = props;

    const { searchOpen, setSearchOpen } = useHeaderStore();

    const { setIsOpen, setBox, setContent } = useContext(PortalContext);

    // CMD + K listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "k") {
                setSearchOpen(true);
            }
        };

        if (!searchOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (!searchOpen) {
                window.removeEventListener("keydown", handleKeyDown);
            }
        };
    }, [searchOpen, setSearchOpen]);

    // Search open state
    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        if (searchOpen) {
            setIsOpen(true);
            setBox({ w: "100vw", h: "100vh" });
            setContent(<PortalLayout initialResults={initialResults} />);
        } else {
            timeout = setTimeout(() => {
                setIsOpen(false);
                setBox({});
                setContent(null);
            }, DURATION * 1000);
        }

        return () => clearTimeout(timeout);
    }, [searchOpen, initialResults, setIsOpen, setBox, setContent]);

    return <></>;
}

/**
 * Modal and backgroud component
 */
const PortalLayout = (props: SearchModalProps) => {
    const { initialResults } = props;

    const { searchOpen } = useHeaderStore();

    return (
        <div className="size-full">
            {/* Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: searchOpen ? 0.2 : 0,
                    transition: { duration: DURATION },
                }}
                className="absolute size-full bg-black"
            />

            {/* Content */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{
                    scale: searchOpen ? 1 : 0,
                }}
                transition={{
                    duration: DURATION,
                    ease: "easeInOut",
                    type: "spring",
                }}
                className={combo(
                    // "bg-amber-300/50",
                    "relative size-full overflow-auto",
                )}
            >
                <div
                    className={combo(
                        // "bg-teal-300/50",
                        "flex min-h-full flex-col items-center justify-center",
                    )}
                >
                    <SearchModal initialResults={initialResults} />
                </div>
            </motion.div>
        </div>
    );
};

/**
 * Close button to close the search modal
 * The height auto adjust by tracking the parent element height
 */
export const BackgroundCloseButton = () => {
    const { searchOpen, setSearchOpen } = useHeaderStore();

    const [currentHeight, setCurrentHeight] = useState("auto");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        const parent = buttonRef.current?.parentElement;

        const updateHeight = () => {
            if (parent) {
                setCurrentHeight(parent.scrollHeight + "px");
            }
        };

        resizeObserverRef.current = new ResizeObserver(updateHeight);

        if (parent) {
            resizeObserverRef.current.observe(parent);
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [searchOpen]);

    return (
        <button
            ref={buttonRef}
            type="button"
            style={{ height: currentHeight }}
            onClick={() => setSearchOpen(false)}
            className={combo(
                // "bg-pink-300/50",
                "absolute top-0 left-0 min-h-full w-full",
            )}
        />
    );
};
