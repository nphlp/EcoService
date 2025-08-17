import IconLinks from "./IconLinks";
import LogoTitle from "./LogoTitle";
import Navigation from "./Navigation";

type BrowserHeaderProps = {
    className?: string;
};

export default function BrowserHeader(props: BrowserHeaderProps) {
    const { className } = props;

    return (
        <div className={className}>
            <nav className="flex flex-row items-center justify-between gap-5 px-5 py-3">
                <LogoTitle />
                <Navigation />
                <IconLinks />
            </nav>
        </div>
    );
}
