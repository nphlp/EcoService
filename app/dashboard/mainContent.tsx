import { combo } from "@lib/combo";
import { ReactNode } from "react";

export default function MainContent(props: { className?: string; children: ReactNode }) {
    const { className, children } = props;
    return <div className={combo("flex w-full flex-col space-y-4 overflow-y-auto p-5", className)}>{children}</div>;
};
