"use client";

import { useSession } from "@lib/client";
import { Category } from "@prisma/client";
import BrowserHeader from "./BrowserHeader";
import MobileHeader from "./MobileHeader";

type HeaderClientProps = {
    categorieList: Category[];
};

export default function HeaderClient(props: HeaderClientProps) {
    const { categorieList } = props;

    const { data: session } = useSession();

    return (
        <header>
            <div className="bg-white text-center max-md:hidden">
                <BrowserHeader
                    session={session}
                    categorieList={categorieList}
                />
            </div>
            <div className="md:hidden">
                <MobileHeader session={session} />
            </div>
        </header>
    );
}

