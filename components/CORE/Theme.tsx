"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "./themeStore";

export default function ThemeClient() {
    const { isDarkMode } = useThemeStore();

    const isMounted = useRef(false);

    useEffect(() => {
        const htmlClass = document.documentElement.classList;

        const reset = () => {
            htmlClass.remove("light");
            htmlClass.remove("dark");
        };

        reset();

        if (isDarkMode === true) htmlClass.add("dark");
        if (isDarkMode === false) htmlClass.add("light");
    }, [isDarkMode]);

    if (!isMounted.current) {
        isMounted.current = true;
    }

    return <></>;
}
