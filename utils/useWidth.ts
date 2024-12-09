"use client";

import { useEffect, useState } from "react";

export const useWidth = () => {
    // Current window width
    const [windowWidth, setWindowWidth] = useState<number>();

    useEffect(() => {
        // Initial value
        setWindowWidth(window.innerWidth);

        // Resize event
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowWidth;
};
