import { combo } from "@lib/combo";
import { HTMLAttributes } from "react";

export type CardProps = {
    className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

export default function Card(props: CardProps) {
    const { className, ...others } = props;
    return (
        <div className={combo("bg-white rounded-xl border border-gray-300 p-7 shadow-md", className)} {...others} />
    );
}
