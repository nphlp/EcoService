"use client";

import Link from "@comps/UI/button/link";
import { combo } from "@lib/combo";
import { usePathname } from "next/navigation";
import { useHeaderStore } from "../headerStore";

export default function Navigation() {
    const path = usePathname();
    const { setSearchOpen, setBasketOpen } = useHeaderStore();

    return (
        <div className="flex flex-row items-center justify-center gap-5">
            <Link
                href="/catalog"
                label="Catalogue"
                variant="ghost"
                noRing
                className={combo(path.includes("/catalog") && "font-bold")}
                onClick={() => {
                    setSearchOpen(false);
                    setBasketOpen(false);
                }}
            />
            <Link
                href="/article"
                label="Articles"
                variant="ghost"
                noRing
                className={combo(path.includes("/article") && "font-bold")}
            />
            <Link
                label="Exemples"
                href="/examples"
                variant="ghost"
                noRing
                className={combo(path.includes("/examples") && "font-bold")}
            />
            {/* <Link
                label="Comps Table"
                href="/comps-table"
                variant="ghost"
                noRing
                className={combo(path.includes("/comps-table") && "font-bold")}
            />
            <Link
                label="AI Search"
                href="/ai-search"
                variant="ghost"
                noRing
                className={combo(path.includes("/ai-search") && "font-bold")}
            /> */}
        </div>
    );
}
