import { combo } from "@lib/combo";
import Link from "next/link";

export default function FooterClient() {
    return (
        <footer className="h-[300px] w-full">
            <div className="h-4 bg-gradient-to-b from-primary/40 to-transparent"></div>
            <div
                className={combo(
                    "absolute bottom-0 -z-10 h-[300px] w-full bg-primary",
                    "flex flex-row items-center justify-center gap-36",
                )}
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="size-24 rounded-full bg-white"></div>
                    <h1 className="text-4xl font-bold text-white">
                        Eco Service
                    </h1>
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
            </div>
        </footer>
    );
}
