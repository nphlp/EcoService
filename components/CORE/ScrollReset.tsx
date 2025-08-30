"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Component to handle scroll reset on page changes
 * Fixes layout shift issues when Next.js preserves scroll position
 * between pages of different heights
 */
export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        const htmlElement = document.documentElement;
        htmlElement.scrollTo(0, 0);
    }, [pathname]);

    return <></>;
}
