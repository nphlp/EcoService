import Card from "@comps/server/card";
import Link from "@comps/ui/link";

export default function Page() {
    const links = [
        {
            label: "Formulaire",
            href: "/examples/formulaire",
            text: "How to create a form",
        },
        {
            label: "Image Import",
            href: "/examples/ImageImport",
            text: "How to import an image",
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
                    {links.map(({ label, href, text }) => (
                        <UnderlinedLink key={label} label={label} href={href} text={text} />
                    ))}
                </ul>
            </Card>
        </div>
    );
}

type UnderlinedLinkProps = {
    href: string;
    label: string;
    text: string;
};

const UnderlinedLink = (props: UnderlinedLinkProps) => {
    const { href, label, text } = props;
    return (
        <li className="list-disc">
            <Link
                href={href}
                variant="underline"
                label={label}
                baseStyleWithout={["outline", "padding", "flex", "font"]}
            />
            <p className="text-xs text-gray-500">{text}</p>
        </li>
    );
};
