"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hook to detect if the component is mounted (client-side)
 * Useful to prevent hydration mismatch with SSR
 */
export const useMounted = () => {
    return useSyncExternalStore(
        emptySubscribe,
        () => true, // Client snapshot
        () => false, // Server snapshot (SSR)
    );
};
