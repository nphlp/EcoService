import { combo } from "@lib/combo";
import Link from "next/link";
import Logo from "./Logo";

type FooterProps = {
    className?: string;
};

export default function FooterClient(props: FooterProps) {
    const { className } = props;

    return (
        <footer className={combo("flex flex-row items-center justify-center gap-36", className)}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex size-[108px] items-center justify-center rounded-full bg-white">
                    <Logo className="size-24" />
                </div>
                <h1 className="text-4xl font-bold uppercase text-white">Circle</h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-20">
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/">Home</Link>
                    <Link href="/catalog">Catalog</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/about">About</Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/">Home</Link>
                    <Link href="/catalog">Catalog</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/about">About</Link>
                </div>
            </div>
        </footer>
    );
}
