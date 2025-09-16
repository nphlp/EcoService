import { combo } from "@lib/combo";
import { LoaderCircle } from "lucide-react";

type LoaderProps = {
    className?: string;
};

/**
 * Loader component
 * @example
 * ```tsx
 * <Loader className="border-white" />
 * ```
 */
export default function Loader(props: LoaderProps) {
    const { className } = props;

    return <LoaderCircle className={combo("size-6 animate-spin border-gray-300 stroke-2", className)} />;
}
