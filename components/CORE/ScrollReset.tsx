"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Component to handle scroll reset on page changes
 * Fixes layout shift issues when Next.js preserves scroll position
 * between pages of different heights
 */
export default function ScrollReset() {
    return (
        <Suspense>
            <SuspensedScrollReset />
        </Suspense>
    );
}

const SuspensedScrollReset = () => {
    const pathname = usePathname();

    useEffect(() => {
        const mainElement = document.getElementById("main");
        if (mainElement) {
            mainElement.scrollTo(0, 0);
        }
    }, [pathname]);

    return <></>;
};
