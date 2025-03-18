"use client";

import Loader from "@comps/ui/Loader";
import { combo } from "@lib/combo";
import Link, { LinkProps } from "next/link";
import { ButtonHTMLAttributes, LinkHTMLAttributes, ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";

type ButtonType = Exclude<ButtonHTMLAttributes<HTMLButtonElement>["type"], undefined>;

export type ButtonClientProps = {
    label: string;
    children: ReactNode;
    className?: string;

    id?: string;
    name?: string;

    isLoading?: boolean;
    loadingLabel?: string;

    variant?: "default" | "outline" | "ghost" | "underline" | "none";
    padding?: "sm" | "md" | "lg" | "none";
    ring?: boolean;
    pageTransition?: boolean | never;
} & (
    | ({
          // If type "link"
          type: "link";
          href: string;
          pageTransition?: boolean;
      } & Omit<LinkHTMLAttributes<HTMLAnchorElement>, "href">)
    | ({
          // If type "button"
          type: ButtonType;
          pageTransition?: never;
      } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)
);

export default function ButtonClient(props: ButtonClientProps) {
    const {
        type,
        label,
        id,
        name,
        loadingLabel = "Loading...",
        isLoading = false,
        variant = "default",
        padding = "md",
        ring = true,
        className,
        pageTransition = false,
        children,
        onMouseEnter,
        onMouseLeave,
        ...others
    } = props;

    const varianteStyle = {
        default: "bg-black text-gray-100 hover:bg-gray-800",
        outline: "disabled:text-gray-300 disabled:border-gray-200 disabled:hover:bg-white border text-gray-800 hover:bg-gray-100 bg-white border-gray-300",
        ghost: "hover:bg-gray-200",
        underline: "hover:underline",
        none: "",
    };

    const paddingStyle = {
        sm: "px-2 py-0.5",
        md: "py-1 px-4",
        lg: "py-1.5 px-6",
        none: "",
    };

    const classList = combo(
        "flex flex-row items-center justify-center gap-2 rounded-md outline-none transition-all duration-150",
        varianteStyle[variant],
        paddingStyle[padding],
        ring && "ring-transparent focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-teal-400",
        className,
    );

    // If type is "link"
    if (type === "link") {
        const { href } = props;
        if (pageTransition) {
            return (
                <TransitionLink
                    id={id}
                    href={href}
                    className={classList}
                    aria-label={label}
                    {...(others as Omit<LinkProps, "href"> & LinkHTMLAttributes<HTMLAnchorElement>)}
                >
                    {children}
                </TransitionLink>
            );
        }
        return (
            <Link
                id={id}
                href={href}
                className={classList}
                aria-label={label}
                {...(others as Omit<LinkProps, "href"> & LinkHTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    }

    // If type is "button"
    else {
        const loaderColor =
            (variant === "default" && "white") ||
            (variant === "outline" && "gray") ||
            (variant === "ghost" && "gray") ||
            (variant === "underline" && "gray") ||
            (variant === "none" && "gray") ||
            "gray";

        return (
            <button
                type={type}
                className={classList}
                id={id ?? label}
                name={name ?? label}
                disabled={isLoading}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                {...(others as Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">)}
            >
                {isLoading ? (
                    <>
                        <Loader color={loaderColor} />
                        <span>{loadingLabel}</span>
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
}
