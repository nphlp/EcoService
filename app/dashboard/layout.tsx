import { getSession } from "@lib/auth-server";
import { unauthorized } from "next/navigation";
import { ReactNode } from "react";
import LinkList from "./components/linkList";
import Sidebar from "./components/sidebar";

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
            <Sidebar className="bg-gray-100">
                <LinkList />
            </Sidebar>
            <div className="flex w-full flex-1 flex-col overflow-y-auto bg-gray-50">{children}</div>
        </div>
    );
}
