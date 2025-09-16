import { combo } from "@lib/combo";
import { useEffect, useState } from "react";

type PopoverProps = {
    name: string;
    idToTrack: string;
    needsEllipsis: boolean;
    arrowSize?: number;
    popoverDistance?: number;
    debug?: boolean;
};

export default function Popover(props: PopoverProps) {
    const {
        name,
        idToTrack,
        needsEllipsis,
        arrowSize = 10,
        popoverDistance = 10,
        debug = false, // for debugging
    } = props;

    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Add 0.5s delay to show the popover
    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        if (isHovered) {
            timeoutId = setTimeout(() => {
                setIsVisible(true);
            }, 500);
        } else {
            setIsVisible(false);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isHovered]);

    // Listen the mouse enter and leave events with the idToTrack element
    useEffect(() => {
        const popover = document.getElementById(idToTrack);

        if (!popover) return;

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        popover.addEventListener("mouseenter", handleMouseEnter);
        popover.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            popover.removeEventListener("mouseenter", handleMouseEnter);
            popover.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [idToTrack]);

    if (!needsEllipsis) return null;

    return (
        <div
            className={combo(
                "absolute left-1/2 -translate-x-1/2",
                "rounded-full px-3 py-1",
                "shadow-[1px_1px_3px_rgba(0,0,0,0.25)]",
                "border border-gray-400 bg-white",
                "pointer-events-none",
                "text-sm",
                isVisible ? "translate-y-0" : "translate-y-[3px]",
                isVisible ? "opacity-100" : "opacity-0",
                "transition-all duration-150",
            )}
            style={{ top: `calc(-100% - ${popoverDistance}px)` }}
        >
            {/* Text */}
            <div className={combo("relative z-10 text-gray-700", "text-nowrap")}>{name}</div>

            {/* Rotated square with border (green) */}
            <div
                className={combo(
                    "absolute left-1/2 -translate-x-1/2",
                    "rotate-45 border border-gray-400 bg-white",
                    debug && "border-green-700 bg-green-400", // for debugging
                )}
                style={{
                    width: arrowSize,
                    height: arrowSize,
                }}
            />

            {/* Offsetted rotated square to hide border (red) */}
            <div
                className={combo(
                    "absolute left-1/2 -translate-x-1/2 -translate-y-[1.5px]",
                    "rotate-45 bg-white",
                    debug && "bg-red-500", // for debugging
                )}
                style={{
                    width: arrowSize,
                    height: arrowSize,
                }}
            />

            {/* Long rectangle to hide little borders (blue) */}
            <div
                className={combo(
                    "absolute bottom-0 left-1/2 -translate-x-1/2",
                    "h-1 w-[calc(100%-30px)] bg-white",
                    debug && "bg-blue-500", // for debugging
                )}
            />
        </div>
    );
}
