import BrowserHeader from "@comps/CORE/header/browser/BrowserHeader";
import MobileHeader from "@comps/CORE/header/mobile/MobileHeader";
import { Suspense } from "react";

export default async function Header() {
    return (
        <Suspense>
            <BrowserHeader className="bg-white text-center max-md:hidden" />
            <MobileHeader className="md:hidden" />
        </Suspense>
    );
}
