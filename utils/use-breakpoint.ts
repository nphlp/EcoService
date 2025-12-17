import { useSyncExternalStore } from "react";

export type Breakpoint = "mobile" | "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const breakpoints: Record<number, Breakpoint> = {
    0: "mobile",
    320: "3xs",
    416: "2xs",
    512: "xs",
    640: "sm",
    768: "md",
    1024: "lg",
    1280: "xl",
    1536: "2xl",
    1920: "3xl",
};

const breakpointKeys = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => b - a);

const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
};

const getSnapshot = (): Breakpoint => {
    const width = window.innerWidth;
    const key = breakpointKeys.find((bp) => width >= bp) ?? 0;
    return breakpoints[key];
};

const getServerSnapshot = (): Breakpoint => "mobile";

const useBreakpoint = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useBreakpoint;
