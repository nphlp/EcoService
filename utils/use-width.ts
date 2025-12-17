import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
};

const getSnapshot = () => window.innerWidth;

const getServerSnapshot = () => 0;

const useWidth = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useWidth;
