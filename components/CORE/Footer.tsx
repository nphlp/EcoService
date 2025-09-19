import Link from "@comps/UI/button/link";
import { combo } from "@lib/combo";
import { ArticleFindManyServer, DiyFindManyServer, ProductFindManyServer } from "@services/server";
import { Route } from "next";
import Logo from "../UI/logo";

type LinkItem = {
    name: string;
    url: Route;
};

type LinksList = {
    topNavigation: LinkItem[];
    topProducts: LinkItem[];
    topArticles: LinkItem[];
    topDiys: LinkItem[];
};

type FooterProps = {
    className?: string;
};

export default async function Footer(props: FooterProps) {
    const { className } = props;

    const linksAmount = 5;

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

    const linksList: LinksList = {
        topNavigation: [
            { name: "Accueil", url: "/" },
            { name: "Catalogue", url: "/catalog" },
            { name: "Articles", url: "/article" },
            { name: "Do it yourself", url: "/diy" },
            { name: "Authentication", url: "/auth" },
        ],
        topProducts: topProducts.map(({ name, slug }) => ({
            name,
            url: `/product/${slug}` as Route,
        })),
        topArticles: topArticles.map(({ title, slug }) => ({
            name: title,
            url: `/article/${slug}` as Route,
        })),
        topDiys: topDiys.map(({ title, slug }) => ({
            name: title,
            url: `/diy/${slug}` as Route,
        })),
    };

    return (
        <footer className={combo("bg-primary flex items-center justify-center gap-24 p-18", className)}>
            {/* Mobile */}
            <div className={combo("flex sm:hidden", "flex-col gap-12")}>
                <LogoTitle scale={1.2} />
                <LinkList linksList={linksList} className={combo("flex flex-row flex-wrap justify-between gap-12")} />
            </div>
            {/* Tablet */}
            <div className={combo("hidden sm:flex md:hidden", "flex-col gap-12")}>
                <LogoTitle />
                <LinkList
                    linksList={linksList}
                    className={combo("grid grid-flow-col grid-cols-[auto_1fr] grid-rows-2 gap-12")}
                />
            </div>
            {/* Desktop */}
            <div className={combo("hidden md:flex lg:hidden", "flex-row items-start gap-16")}>
                <LogoTitle />
                <LinkList
                    linksList={linksList}
                    className={combo("grid grid-flow-col grid-cols-[auto_1fr] grid-rows-2 gap-12")}
                />
            </div>
            {/* Large Desktop */}
            <div className={combo("hidden lg:flex", "flex-row gap-16")}>
                <LogoTitle />
                <LinkList linksList={linksList} className={combo("grid grid-flow-col grid-cols-[auto_1fr] gap-12")} />
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

type LinkListProps = {
    className?: string;
    linksList: LinksList;
};

const LinkList = (props: LinkListProps) => {
    const { className, linksList } = props;

    const { topNavigation, topProducts, topArticles, topDiys } = linksList;

    return (
        <div className={className}>
            <TopLinks title="Navigation" items={topNavigation} />
            <TopLinks title="Produits" items={topProducts} />
            <TopLinks title="Articles" items={topArticles} />
            <TopLinks title="DIYs" items={topDiys} />
        </div>
    );
};

type TopLinksProps = {
    title: string;
    items: LinkItem[];
};

const TopLinks = (props: TopLinksProps) => {
    const { title, items } = props;

    return (
        <div className={combo("space-y-3 text-white")}>
            <div className="space-y-1">
                <h3 className="text-xl font-semibold text-nowrap text-white">{title}</h3>
                <hr className="w-8 border-gray-400" />
            </div>
            <div className="space-y-0.5">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        label={item.name}
                        variant="underline"
                        href={item.url}
                        className="line-clamp-1 text-white"
                    />
                ))}
            </div>
        </div>
    );
};
