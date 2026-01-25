import { combo } from "@lib/combo";
import IconLinks from "./IconLinks";
import LogoTitle from "./LogoTitle";
import Navigation from "./Navigation";

type BrowserHeaderProps = {
    className?: string;
};

export default async function BrowserHeader(props: BrowserHeaderProps) {
    const { className } = props;

    return (
        <div className={className}>
            <nav
                className={combo(
                    "mx-auto max-w-400 px-4 py-3 md:px-7",
                    "flex flex-row items-center justify-between gap-5",
                )}
            >
                <LogoTitle />
                <Navigation />
                <IconLinks />
            </nav>
        </div>
    );
}
