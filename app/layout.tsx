import "@/globals.css";
import BasketSync from "@comps/basket/basketSync";
import Header from "@comps/header/header";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Eco Service",
    description: "Achetez des produits éco-responsables sur Eco Service.",
    metadataBase: new URL(baseUrl),
    alternates: {
        canonical: `${baseUrl}`,
    },
};

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const lang = "fr";

    return (
        <html lang={lang} className={combo("h-full overflow-hidden", inter.className)}>
            <body className={combo("flex flex-col", "h-full")}>
                <NuqsAdapter>
                    <Header />
                    <BasketSync />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto">
                        <div className="h-full bg-white">{children}</div>
                        {/* <Footer className="bg-eco h-[300px]" /> */}
                    </main>
                </NuqsAdapter>
            </body>
        </html>
    );
}
