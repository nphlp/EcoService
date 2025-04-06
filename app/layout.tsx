import "@/globals.css";
import Header from "@comps/header/header";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Eco Service",
    description: "A fully auth-ready application template for Next.js.",
};

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const lang = "fr";

    return (
        <html lang={lang} className={combo("h-full overflow-hidden")}>
            <body className={combo("flex flex-col", "h-full overflow-hidden", inter.className)}>
                <NuqsAdapter>
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                        <div className="h-full bg-white">{children}</div>
                        {/* <Footer className="bg-primary h-[300px]" /> */}
                    </main>
                </NuqsAdapter>
            </body>
        </html>
    );
}
