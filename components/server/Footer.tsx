import { combo } from "@lib/combo";
import Link from "next/link";

type FooterProps = {
    className?: string;
};

export default function FooterClient(props: FooterProps) {
    const { className } = props;

    return (
        <footer
            className={combo(
                "flex flex-row items-center justify-center gap-36",
                className,
            )}
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="size-24 rounded-full bg-white"></div>
                <h1 className="text-4xl font-bold text-white">Eco Service</h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-20">
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/">Home</Link>
                    <Link href="/catalogue">Catalogue</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/about">About</Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/">Home</Link>
                    <Link href="/catalogue">Catalogue</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </footer>
    );
}
