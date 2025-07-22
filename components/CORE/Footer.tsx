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

    const linksList = {
        topNavigation,
        topProducts,
        topArticles: topArticles.map(formatTitleToName),
        topDiys: topDiys.map(formatTitleToName),
    };

    return (
        <footer className={combo("bg-primary flex items-center justify-center gap-24 p-18", className)}>
            {/* Mobile */}
            <div className={combo("flex sm:hidden", "flex-col gap-12")}>
                <LogoTitle scale={1.2} />
                <TopLinksList
                    linksList={linksList}
                    className={combo("flex flex-row flex-wrap justify-between gap-12")}
                />
            </div>
            {/* Tablet */}
            <div className={combo("hidden sm:flex md:hidden", "flex-col gap-12")}>
                <LogoTitle />
                <TopLinksList
                    linksList={linksList}
                    className={combo("grid grid-flow-col grid-cols-[auto_1fr] grid-rows-2 gap-12")}
                />
            </div>
            {/* Desktop */}
            <div className={combo("hidden md:flex lg:hidden", "flex-row items-start gap-16")}>
                <LogoTitle />
                <TopLinksList
                    linksList={linksList}
                    className={combo("grid grid-flow-col grid-cols-[auto_1fr] grid-rows-2 gap-12")}
                />
            </div>
            {/* Large Desktop */}
            <div className={combo("hidden lg:flex", "flex-row gap-16")}>
                <LogoTitle />
                <TopLinksList
                    linksList={linksList}
                    className={combo("grid grid-flow-col grid-cols-[auto_1fr] gap-12")}
                />
            </div>
        </footer>
    );
}

type LogoTitleProps = {
    scale?: number;
};

const LogoTitle = (props: LogoTitleProps) => {
    const { scale = 1 } = props;

    return (
        <div style={{ scale }} className="flex flex-col items-center justify-center gap-4">
            <div className="flex size-[108px] items-center justify-center rounded-full bg-white">
                <Logo className="size-[100px]" />
            </div>
            <div className="text-4xl font-semibold text-white uppercase">Circle</div>
        </div>
    );
};

type LinksItem = {
    name: string;
    slug: string;
};

type LinksList = {
    topNavigation: LinksItem[];
    topProducts: LinksItem[];
    topArticles: LinksItem[];
    topDiys: LinksItem[];
};

type TopLinksListProps = {
    className?: string;
    linksList: LinksList;
};

const TopLinksList = (props: TopLinksListProps) => {
    const { className, linksList } = props;

    const { topNavigation, topProducts, topArticles, topDiys } = linksList;

    return (
        <div className={className}>
            <TopLinks title="Navigation" url="" items={topNavigation} />
            <TopLinks title="Produits" url="/product/" items={topProducts} />
            <TopLinks title="Articles" url="/article/" items={topArticles} />
            <TopLinks title="DIYs" url="/diy/" items={topDiys} />
        </div>
    );
};

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
        <div className={combo("space-y-3 text-white")}>
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
