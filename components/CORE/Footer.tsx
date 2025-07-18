import { combo } from "@lib/combo";
import { ArticleFindManyServer, DiyFindManyServer, ProductFindManyServer } from "@services/server";
import Link from "next/link";
import Logo from "../server/logo";

type FooterProps = {
    className?: string;
};

export default async function Footer(props: FooterProps) {
    const { className } = props;

    const linksAmount = 5;

    const formatTitleToName = ({ title, slug }: { title: string; slug: string }) => ({ name: title, slug });

    const topNavigation = [
        {
            name: "Accueil",
            slug: "/",
        },
        {
            name: "Catalogue",
            slug: "/catalog",
        },
        {
            name: "Articles",
            slug: "/article",
        },
        {
            name: "Do it yourself",
            slug: "/do-it-yourself",
        },
        {
            name: "Authentication",
            slug: "/auth",
        },
    ];

    const topProducts = await ProductFindManyServer({
        select: { name: true, slug: true },
        take: linksAmount,
    });

    const topArticles = await ArticleFindManyServer({
        select: { title: true, slug: true },
        take: linksAmount,
    });

    const topDiys = await DiyFindManyServer({
        select: { title: true, slug: true },
        take: linksAmount,
    });

    return (
        <footer className={combo("bg-eco flex gap-18 p-18", className)}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex size-[70px] items-center justify-center rounded-full bg-white md:size-[108px]">
                    <Logo className="size-16 md:size-24" />
                </div>
                <h2 className="text-4xl font-bold text-white uppercase">Circle</h2>
            </div>
            <div className="flex gap-12">
                <TopLinks title="Navigation" url="" items={topNavigation} />
                <TopLinks title="Meilleurs ventes" url="/product/" items={topProducts} />
                <TopLinks title="Articles" url="/article/" items={topArticles.map(formatTitleToName)} />
                <TopLinks title="Do it yourselfes" url="/diy/" items={topDiys.map(formatTitleToName)} />
            </div>
        </footer>
    );
}

type TopLinksProps = {
    title: string;
    url: string;
    items: {
        name: string;
        slug: string;
    }[];
};

const TopLinks = (props: TopLinksProps) => {
    const { title, url, items } = props;

    return (
        <div className="space-y-3 text-white">
            <div className="space-y-1">
                <h3 className="text-xl font-semibold text-nowrap text-white">{title}</h3>
                <hr className="w-8 border-gray-400" />
            </div>
            <div className="space-y-0.5">
                {items.map((item, index) => (
                    <Link key={index} href={url + item.slug} className="line-clamp-1">
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};
