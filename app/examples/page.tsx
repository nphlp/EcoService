import Card from "@comps/server/card";
import Link from "@comps/ui/link";

export default function Page() {
    const links = [
        {
            label: "Server Actions (Server Component)",
            href: "/examples/Actions/server",
            text: "How to use server actions in a Server Component",
        },
        {
            label: "Server Actions (Client Component)",
            href: "/examples/Actions/client",
            text: "How to use server actions in a Client Component",
        },
        {
            label: "Server Actions (with a Process)",
            href: "/examples/Actions/process",
            text: "How to use server actions with a Process script",
        },
        {
            label: "Fetch",
            href: "/examples/Fetch",
            text: "How to fetch data from the server",
        },
        {
            label: "useFetch",
            href: "/examples/useFetch",
            text: "How to fetch data from the client",
        },
        {
            label: "Fetch Parallelized",
            href: "/examples/FetchParallelized",
            text: "How to fetch data from the server in parallel",
        },
        {
            label: "Redis Cache",
            href: "/examples/Redis",
            text: "How to use Redis cache",
        },
        {
            label: "Form",
            href: "/examples/Form",
            text: "How to create a form",
        },
        {
            label: "Image Import",
            href: "/examples/ImageImport",
            text: "How to import an image",
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
        {
            label: "Slider",
            href: "/examples/Slider",
            text: "How to create a slider",
        },
        {
            label: "Combobox (Shadcn)",
            href: "/examples/Combobox",
            text: "How to create a combobox",
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
