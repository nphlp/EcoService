import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";
import { hasRole } from "@permissions/hasRole";
import {
    ArticleCountServer,
    ArticleFindManyServer,
    DiyCountServer,
    DiyFindManyServer,
    OrderCountServer,
    ProductCountServer,
    UserCountServer,
} from "@services/server";
import { FileText, Hammer, Package, Plus, ShoppingCart, Users } from "lucide-react";
import { Route } from "next";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { JSX, Suspense, cloneElement } from "react";
import ContentList from "./components/contentList";
import SidebarToggleButton from "./components/sidebarToggleButton";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

const SuspendedPage = async () => {
    await connection();

    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);

    if (!session) unauthorized();

    const articleCount = await ArticleCountServer({});
    const diyCount = await DiyCountServer({});
    const productCount = await ProductCountServer({});
    const orderCount = await OrderCountServer({});
    const userCount = await UserCountServer({});

    const articles = await ArticleFindManyServer({
        select: { id: true, title: true, slug: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    const diys = await DiyFindManyServer({
        select: { id: true, title: true, slug: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    return (
        <>
            <SidebarToggleButton title={metadata.title as string} />
            <div className="space-y-8 p-4 py-4 md:px-7">
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">Statistiques</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <StatsCard
                            count={articleCount}
                            title="Articles"
                            icon={<FileText />}
                            color="bg-blue-50 text-blue-600"
                        />
                        <StatsCard count={diyCount} title="DIY" icon={<Hammer />} color="bg-amber-50 text-amber-600" />
                        <StatsCard
                            count={productCount}
                            title="Produits"
                            icon={<Package />}
                            color="bg-green-50 text-green-600"
                        />
                        <StatsCard
                            count={orderCount}
                            title="Commandes"
                            icon={<ShoppingCart />}
                            color="bg-purple-50 text-purple-600"
                        />
                        <StatsCard
                            count={userCount}
                            title="Utilisateurs"
                            icon={<Users />}
                            color="bg-rose-50 text-rose-600"
                        />
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700">Actions rapides</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <QuickActionCard
                            title="Créer un produit"
                            description="Ajouter un nouveau produit à la boutique"
                            href="/dashboard/create-product"
                            icon={<Package />}
                            color="bg-green-500"
                        />
                        <QuickActionCard
                            title="Créer un contenu"
                            description="Rédiger un article ou un tutoriel DIY"
                            href="/dashboard/create-content"
                            icon={<FileText />}
                            color="bg-blue-500"
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <section>
                        <ContentList title="Articles" type="article" items={articles ?? []} />
                    </section>
                    <section>
                        <ContentList title="DIY" type="diy" items={diys ?? []} />
                    </section>
                </div>
            </div>
        </>
    );
};

type StatsCardProps = {
    count: number;
    title: string;
    icon: JSX.Element;
    color: string;
};

const StatsCard = (props: StatsCardProps) => {
    const { count, title, icon, color } = props;

    return (
        <Card className="flex items-center gap-4 p-5">
            <div className={`rounded-xl p-3 ${color}`}>
                {cloneElement(icon, { className: "size-6 stroke-[1.5px]" })}
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-800">{count}</div>
                <div className="text-sm text-gray-500">{title}</div>
            </div>
        </Card>
    );
};

type QuickActionCardProps = {
    title: string;
    description: string;
    href: Route;
    icon: JSX.Element;
    color: string;
};

const QuickActionCard = (props: QuickActionCardProps) => {
    const { title, description, href, icon, color } = props;

    return (
        <Card className="group relative overflow-hidden p-5 transition-shadow hover:shadow-md">
            <div className="flex items-start gap-4">
                <div className={`rounded-xl p-3 text-white ${color}`}>
                    {cloneElement(icon, { className: "size-6 stroke-[1.5px]" })}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <Link href={href} label={title} variant="outline" className="flex items-center gap-1 text-sm">
                    <Plus className="size-4" />
                    Créer
                </Link>
            </div>
        </Card>
    );
};
