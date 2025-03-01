import "@/globals.css";
import { SelectCategoryList } from "@actions/database/Categories";
import HeaderClient from "@comps/client/Header/Header";
import FooterClient from "@comps/server/Footer";
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

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const categorieList = await SelectCategoryList({ orderBy: { name: "asc" } });

    if (!categorieList) {
        return <div>Mmmm... It seems there is not data.</div>;
    }

    return (
        <html lang="en" className="flex h-full flex-col overflow-hidden">
            <body className={combo("flex h-full flex-col overflow-hidden", inter.className)}>
                <NuqsAdapter>
                    <HeaderClient categorieList={categorieList} />
                    <main className="pointer-events-none relative z-10 w-full flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="pointer-events-auto flex min-h-full w-full flex-col bg-white">{children}</div>
                        <div className="h-[300px] w-full bg-transparent">
                            <div className="h-4 bg-gradient-to-b from-gray-900/50 to-transparent" />
                        </div>
                    </main>
                    <FooterClient className="pointer-events-auto absolute bottom-0 h-[300px] w-full bg-primary" />
                </NuqsAdapter>
            </body>
        </html>
    );
}

/* 

Method center/scroll
- justify-center (y-axis) if the content is not scrollable
- justify-start (y-axis) if the content is scrollable
    
<main className="flex size-full flex-col items-center justify-center overflow-hidden">
    <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">
        {children}
    </div>
</main>

*/
