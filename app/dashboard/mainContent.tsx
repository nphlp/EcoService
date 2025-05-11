import { combo } from "@lib/combo";
import { ReactNode } from "react";

export default function MainContent(props: { className?: string; children: ReactNode }) {
    const { className, children } = props;
    return <div className={combo("w-full overflow-y-auto", className)}>{children}</div>;
}
