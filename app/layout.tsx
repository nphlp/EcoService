import "@/globals.css";
import Header from "@comps/header/header";
import Footer from "@comps/server/footer";
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

    return (
        <html lang="en" className="flex h-full flex-col overflow-hidden">
            <body className={combo("flex h-full flex-col overflow-hidden", inter.className)}>
                <NuqsAdapter>
                    <Header />
                    <main className="pointer-events-none relative z-10 w-full flex-1 overflow-x-hidden overflow-y-auto">
                        <div className="pointer-events-auto flex min-h-full w-full flex-col bg-white">{children}</div>
                        <div className="h-[300px] w-full bg-transparent">
                            <div className="h-4 bg-gradient-to-b from-gray-900/50 to-transparent" />
                        </div>
                    </main>
                    <Footer className="bg-primary pointer-events-auto absolute bottom-0 h-[300px] w-full" />
                </NuqsAdapter>
            </body>
        </html>
    );
}
