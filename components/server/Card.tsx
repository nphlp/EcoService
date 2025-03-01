import { combo } from "@lib/combo";
import { ReactNode } from "react";

type CardProps = {
    className?: string;
    children: ReactNode;
};

export default function Card(props: CardProps) {
    const { className, children } = props;
    return (
        <div className={combo("rounded-xl border border-gray-300 bg-white p-5 shadow-md", className)}>{children}</div>
    );
}
