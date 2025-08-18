import Card from "@comps/server/card";
import { hasRole } from "@permissions/hasRole";
import {
    ArticleCountServer,
    DiyCountServer,
    OrderCountServer,
    ProductCountServer,
    UserCountServer,
} from "@services/server";
import { FileText, Hammer, Package, ShoppingCart, Users } from "lucide-react";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { JSX, cloneElement } from "react";
import { SideBarToggleTitle } from "./sideBar";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);

    if (!session) unauthorized();

    const articleCount = await ArticleCountServer({});
    const diyCount = await DiyCountServer({});
    const productCount = await ProductCountServer({});
    const orderCount = await OrderCountServer({});
    const userCount = await UserCountServer({});

    return (
        <>
            <SideBarToggleTitle title={metadata.title as string} />
            <div className="p-5">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <StatsCard count={articleCount} title="Articles" icon={<FileText />} />
                        <StatsCard count={diyCount} title="DIY" icon={<Hammer />} />
                        <StatsCard count={productCount} title="Products" icon={<Package />} />
                        <StatsCard count={orderCount} title="Orders" icon={<ShoppingCart />} />
                        <StatsCard count={userCount} title="Users" icon={<Users />} />
                    </div>
                </div>
            </div>
        </>
    );
}

type StatsCardProps = {
    count: number;
    title: string;
    icon: JSX.Element;
};

const StatsCard = (props: StatsCardProps) => {
    const { count, title, icon } = props;

    return (
        <Card className="flex items-center justify-center gap-6 p-4">
            {cloneElement(icon, { className: "size-10 stroke-[1.5px] text-gray-500" })}
            <div>
                <div className="text-lg font-semibold">{count}</div>
                <div className="text-sm text-gray-500">{title}</div>
            </div>
        </Card>
    );
};
