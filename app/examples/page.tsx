import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";

type LinkProps = {
    label: string;
    href: string;
    text: string;
};

export default function Page() {
    const links: LinkProps[] = [
        {
            label: "Comps Table",
            href: "/examples/comps-table",
            text: "All components",
        },
        {
            label: "Formulaire",
            href: "/examples/formulaire",
            text: "How to create a form with input, select...",
        },
        {
            label: "Comboboxes and Searchboxes",
            href: "/examples/combobox-and-searchbox",
            text: "How to create a combobox and searchbox",
        },
        {
            label: "Auto-Layout",
            href: "/examples/auto-layout",
            text: "How to create a auto-layout",
        },
        {
            label: "Bouncy Height Resizer",
            href: "/examples/bouncy-height-resize",
            text: "How to create a bouncy height resize",
        },
        {
            label: "Cropper",
            href: "/examples/cropper",
            text: "How to create a cropper",
        },
        {
            label: "User permissions",
            href: "/examples/user-permissions",
            text: "How to create a user permissions",
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
        <div className="p-7">
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
    const { href, label, text } = props;
    return (
        <li className="list-disc">
            <Link href={href} variant="underline" label={label} className="px-1 decoration-gray-600" />
            <p className="text-xs text-gray-500">{text}</p>
        </li>
    );
};
