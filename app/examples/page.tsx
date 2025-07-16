import Card from "@comps/server/card";
import Link from "@comps/ui/link";

type LinkProps = {
    label: string;
    grayLabel?: string;
    href: string;
    text: string;
};

export default function Page() {
    const links: LinkProps[] = [
        {
            label: "Formulaire",
            href: "/examples/formulaire",
            text: "How to create a form with input, select...",
        },
        {
            label: "Search",
            grayLabel: "Single source",
            href: "/examples/search-single-source",
            text: "How to create a single source search combobox",
        },
        {
            label: "Search",
            grayLabel: "Multi source",
            href: "/examples/search-multi-source",
            text: "How to create a multi source search combobox",
        },
        {
            label: "Image Upload",
            href: "/examples/image-upload",
            text: "How to upload an image",
        },
        {
            label: "Slider",
            href: "/examples/Slider",
            text: "How to create a slider",
        },
        {
            label: "View Transition Image",
            href: "/examples/ViewTransitionImage",
            text: "How to create a view transition image",
        },
        {
            label: "View Transition Link",
            href: "/examples/ViewTransitionLink",
            text: "How to create a view transition link",
        },
    ];
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <Card className="flex flex-col items-center gap-4 pl-10">
                <h1 className="text-2xl font-bold">Examples</h1>
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <UnderlinedLink key={index} {...link} />
                    ))}
                </ul>
            </Card>
        </div>
    );
}

type UnderlinedLinkProps = LinkProps;

const UnderlinedLink = (props: UnderlinedLinkProps) => {
    const { href, label, text, grayLabel } = props;
    return (
        <li className="list-disc">
            <Link
                href={href}
                variant="underline"
                label={label}
                baseStyleWithout={["outline", "padding", "flex", "font"]}
                className="decoration-gray-600"
            >
                <span>{label}</span>
                {grayLabel && <span className="text-gray-500"> {grayLabel}</span>}
            </Link>
            <p className="text-xs text-gray-500">{text}</p>
        </li>
    );
};
