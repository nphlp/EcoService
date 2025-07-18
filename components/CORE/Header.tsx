import BrowserHeader from "@comps/CORE/header/browser/BrowserHeader";
import MobileHeader from "@comps/CORE/header/mobile/MobileHeader";
import { Suspense } from "react";

type HeaderProps = {
    className?: string;
};

export default async function Header(props: HeaderProps) {
    const { className } = props;

    return (
        <Suspense>
            <header className={className}>
                <BrowserHeader className="bg-white text-center max-md:hidden" />
                <MobileHeader className="md:hidden" />
            </header>
        </Suspense>
    );
}
