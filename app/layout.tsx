import Basket from "@comps/CORE/Basket";
import Footer from "@comps/CORE/Footer";
import Header from "@comps/CORE/Header";
import Portal from "@comps/CORE/Portal";
import ScrollReset from "@comps/CORE/ScrollReset";
import Search from "@comps/CORE/Search";
import BasketSync from "@comps/CORE/basket/basketSync";
import { PortalProvider } from "@comps/CORE/portal/PortalProvider";
import { combo } from "@lib/combo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";
import "@/globals.scss";

const inter = Inter({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

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

    // const isDarkMode = await getZustandCookie<ThemeStore["isDarkMode"]>("theme-cookie", themeSchema, "isDarkMode");

    return (
        <html
            lang={lang}
            className={combo(
                "h-full overflow-hidden",
                inter.className,
                // isDarkMode === true && "dark",
                // isDarkMode === false && "light",
            )}
        >
            <body className="flex h-full flex-col">
                <NuqsAdapter>
                    <PortalProvider>
                        <Header />
                        {/* <Theme /> */}
                        <Search />
                        <Basket />
                        <BasketSync />
                        <div id="main" className="flex-1 overflow-y-auto">
                            <main className="flex min-h-full flex-col items-center justify-center">{children}</main>
                            <Footer />
                        </div>
                        <Portal />
                    </PortalProvider>
                </NuqsAdapter>
                <ScrollReset />
            </body>
        </html>
    );
}
