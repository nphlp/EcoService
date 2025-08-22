"use client";

import Link, { LinkProps } from "@comps/UI/button/link";
import { useTransitionRouter } from "next-view-transitions";
import { MouseEvent } from "react";

type TransitionLinkProps = Omit<LinkProps, "href" | "onClick"> & {
    label: string;
    href: string;
    animation: keyof typeof cssAnimation;
    duration?: number;
};

export default function TransitionLink(props: TransitionLinkProps) {
    const { href, label, duration = 700, animation, ...others } = props;

    const router = useTransitionRouter();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        router.push(href, {
            onTransitionReady: () => cssAnimation[animation](duration),
        });
    };

    return <Link label={label} href={href} onClick={handleClick} {...others} />;
}

const cssAnimation = {
    above: (duration: number) => {
        // Old page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateY(0)",
                    scale: 1,
                    opacity: 1,
                },
                {
                    transform: "translateY(-150px)",
                    scale: 0.9,
                    opacity: 0.5,
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            },
        );

        // New page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateY(100%)",
                    opacity: 1,
                },
                {
                    transform: "translateY(0)",
                    opacity: 1,
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    },
    swipeToRight: (duration: number) => {
        // Old page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateX(0)",
                },
                {
                    transform: "translateX(-100%)",
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            },
        );

        // New page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateX(100%)",
                },
                {
                    transform: "translateX(0)",
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    },
    swipeToLeft: (duration: number) => {
        // Old page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateX(0)",
                },
                {
                    transform: "translateX(100%)",
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            },
        );

        // New page transition
        document.documentElement.animate(
            [
                {
                    transform: "translateX(-100%)",
                },
                {
                    transform: "translateX(0)",
                },
            ],
            {
                duration,
                easing: "ease-in-out",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            },
        );
    },
};
