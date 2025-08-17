import { GetSession } from "@lib/authServer";
import { unauthorized } from "next/navigation";
import { ReactNode } from "react";
import LinkList from "./linkList";
import MainContent from "./mainContent";
import { SideBar, SideBarProvider } from "./sideBar";

type LayoutProps = {
    children: ReactNode;
};

export default async function Layout(props: LayoutProps) {
    const { children } = props;

    const session = await GetSession();

    const role = session?.user.role;

    if (role !== "ADMIN" && role !== "VENDOR" && role !== "EMPLOYEE") {
        unauthorized();
    }

    return (
        <div className="flex w-full flex-1 flex-row border-t-1 border-gray-300">
            <SideBarProvider>
                <SideBar className="bg-gray-100">
                    <LinkList />
                </SideBar>
                <MainContent className="bg-gray-50">{children}</MainContent>
            </SideBarProvider>
        </div>
    );
}
