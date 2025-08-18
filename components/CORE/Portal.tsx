"use client";

import { combo } from "@lib/combo";
import { useContext } from "react";
import { PortalContext } from "./portal/PortalContext";

export default function Portal() {
    const { isOpen, box, content } = useContext(PortalContext);

    return (
        <div
            id="portal"
            className={combo("absolute z-50", !isOpen && "pointer-events-none")}
            style={{ top: box.y, left: box.x, width: box.w, height: box.h }}
        >
            {content}
        </div>
    );
}
