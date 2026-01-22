"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, useEffect, useRef } from "react";

type TransitionLinkProps = {
    href: Route;
    className?: string;
    children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const TransitionLink = (props: TransitionLinkProps) => {
    const { href, className, children, ...others } = props;

    const router = useRouter();
    const path = usePathname();

    const html = useRef<HTMLElement | null>(null);
    const body = useRef<HTMLElement | null>(null);

    useEffect(() => {
        html.current = document.querySelector("html");
        body.current = document.querySelector("body");
    }, []);

    const htmlClasses = ["flex", "flex-col", "items-center", "justify-center"];
    const bodyClasses = ["absolute", "scale-1", "opacity-1", "transition-all", "duration-200", "ease-in-out"];

    /**
     * Start the transition \
     * -> Triggered when the link is clicked
     */
    const transitionIn = async (event: MouseEvent<HTMLAnchorElement>) => {
        // Prevent the default redirection
        event.preventDefault();

        // If href is the same as the current path, refresh the page to prevent locking transitions
        if (path === href) {
            return router.refresh();
        }

        if (!html.current || !body.current) {
            return router.push(href);
        }

        // Prepare transition
        html.current.classList.add(...htmlClasses);
        body.current.classList.add(...bodyClasses);

        // Start the transition
        await wait(10);
        body.current.style.scale = "0.2";
        body.current.style.opacity = "0";

        // Wait util the transition is done
        await wait(200);

        // Redirect to the page
        router.push(href);
    };

    /**
     * End the transition \
     * -> Triggered when the page is loaded
     */
    const transitionOut = async () => {
        if (!html.current || !body.current) {
            return router.push(href);
        }

        // Start the transition back
        body.current.style.scale = "";
        body.current.style.opacity = "";

        // Wait util the transition is done
        await wait(200);

        // Clean up
        html.current.classList.remove(...htmlClasses);
        body.current.classList.remove(...bodyClasses);
    };

    useEffect(() => {
        transitionOut();
        // eslint-disable-next-line
    }, [path]);

    return (
        <Link href={href} onClick={transitionIn} className={className} {...others}>
            {children}
        </Link>
    );
};
