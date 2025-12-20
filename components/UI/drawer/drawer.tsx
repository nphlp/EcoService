"use client";

import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { DrawerVariant, theme } from "./theme";

export type DrawerClassName = {
    component?: string;
    drawer?: string;

    backgroundBlur?: string;
    backgroundColor?: string;
    backgroundButton?: string;

    closeButton?: string;
    closeIcon?: string;
};

type DrawerProps = {
    setIsDrawerOpen: (visible: boolean) => void;
    isDrawerOpen: boolean;

    // Config
    noBackgroundBlur?: boolean;
    noBackgroundColor?: boolean;
    noBackgroundButton?: boolean;
    withCloseButton?: boolean;

    // Animation
    noAnimation?: boolean;
    duration?: number;

    // Styles
    variant?: DrawerVariant;
    className?: DrawerClassName;

    children: ReactNode;
};

export default function Drawer(props: DrawerProps) {
    const {
        isDrawerOpen,
        setIsDrawerOpen,
        noBackgroundBlur = false,
        noBackgroundButton = false,
        noBackgroundColor = false,
        withCloseButton = false,
        noAnimation = false,
        duration = 0.3,
        variant = "default",
        className,
        children,
    } = props;

    const animationDuration = noAnimation ? 0 : duration;

    return (
        <div
            className={combo(
                theme[variant].component,
                className?.component,
                isDrawerOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
        >
            {/* Background Blur */}
            {!noBackgroundBlur && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isDrawerOpen ? 1 : 0,
                        transition: { duration: animationDuration / 6 },
                    }}
                    className={combo(theme[variant].backgroundBlur, className?.backgroundBlur)}
                />
            )}

            {/* Background Color */}
            {!noBackgroundColor && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isDrawerOpen ? 1 : 0,
                        transition: { duration: animationDuration / 2 },
                    }}
                    className={combo(theme[variant].backgroundColor, className?.backgroundColor)}
                />
            )}

            {/* Background Button */}
            {!noBackgroundButton && (
                <motion.button
                    type="button"
                    aria-label="close-modal"
                    onClick={() => setIsDrawerOpen(false)}
                    className={combo(theme[variant].backgroundButton, className?.backgroundButton)}
                />
            )}

            {/* Drawer */}
            <motion.div
                initial={{
                    display: "none",
                    translateX: "100%",
                }}
                animate={{
                    display: isDrawerOpen ? "" : "none",
                    translateX: isDrawerOpen ? "0" : "100%",
                }}
                transition={{ duration: animationDuration }}
                className={combo("w-full sm:w-100", theme[variant].drawer, className?.drawer)}
            >
                <CloseButton
                    setIsDrawerOpen={setIsDrawerOpen}
                    withCloseButton={withCloseButton}
                    className={className}
                    variant={variant}
                />
                {children}
            </motion.div>
        </div>
    );
}

type CloseButtonProps = {
    setIsDrawerOpen: (visible: boolean) => void;
    withCloseButton: boolean;
    variant: DrawerVariant;
    className?: {
        closeButton?: string;
        closeIcon?: string;
    };
};

const CloseButton = (props: CloseButtonProps) => {
    const { className, setIsDrawerOpen, withCloseButton, variant } = props;

    if (!withCloseButton) return null;

    return (
        <button
            type="button"
            aria-label="Close modal"
            onClick={() => setIsDrawerOpen(false)}
            className={combo(theme[variant].closeButton, className?.closeButton)}
        >
            <X className={combo(theme[variant].closeIcon, className?.closeIcon)} />
        </button>
    );
};
