import { combo } from "@lib/combo";
import Link from "next/link";
import Logo from "./Logo";

type FooterProps = {
    className?: string;
};

export default function FooterClient(props: FooterProps) {
    const { className } = props;

    return (
        <footer className={combo("flex flex-col items-center justify-center gap-6 md:flex-row md:gap-36", className)}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex size-[70px] items-center justify-center rounded-full bg-white md:size-[108px]">
                    <Logo className="size-16 md:size-24" />
                </div>
                <h1 className="text-4xl font-bold uppercase text-white">Circle</h1>
            </div>
            <div className="flex flex-row items-center justify-center gap-20">
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/">Accueil</Link>
                    <Link href="/catalog">Catalogue</Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-3 text-lg text-white">
                    <Link href="/article">Articles</Link>
                    <Link href="/do-it-yourself">Do It Yourself</Link>
                </div>
            </div>
        </footer>
    );
}
