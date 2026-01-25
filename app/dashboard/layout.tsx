import { getSession } from "@lib/auth-server";
import { unauthorized } from "next/navigation";
import { ReactNode } from "react";
import LinkList from "./linkList";
import MainContent from "./mainContent";
import SidebarLayout from "./sidebarLayout";

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const session = await getSession();

    const role = session?.user.role;

    if (role !== "ADMIN" && role !== "VENDOR" && role !== "EMPLOYEE") {
        unauthorized();
    }

    return (
        <div className="flex w-full flex-1 flex-row border-t border-gray-300">
            <SidebarLayout className="bg-gray-100">
                <LinkList />
            </SidebarLayout>
            <MainContent className="bg-gray-50">{children}</MainContent>
        </div>
    );
}
