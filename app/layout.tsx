import "@/globals.css";
import FooterClient from "@comps/server/Footer";
import HeaderClient from "@comps/client/Header";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Eco Service",
    description: "A fully auth-ready application template for Next.js.",
};

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
    const { children } = props;

    return (
        <html lang="en" className="flex h-full flex-col overflow-hidden">
            <body
                className={combo(
                    "flex h-full flex-col overflow-hidden",
                    inter.className,
                )}
            >
                <NuqsAdapter>
                    <HeaderClient />
                    <main className="w-full flex-1 overflow-y-auto overflow-x-hidden">
                        {children}
                        <FooterClient />
                    </main>
                </NuqsAdapter>
            </body>
        </html>
    );
}

{/* 
Method center/scroll
- justify-center (y-axis) if the content is not scrollable
- justify-start (y-axis) if the content is scrollable
    
<main className="flex size-full flex-col items-center justify-center overflow-hidden">
    <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">
        {children}
    </div>
</main>
*/}