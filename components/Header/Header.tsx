"use client";

import { Category } from "@prisma/client";
import Basket from "../Basket/Basket";
import Main from "./Browser/Main";
import Sub from "./Browser/Sub";
import MobileHeader from "./Mobile/MobileHeader";

type HeaderClientProps = {
    categorieList: Category[];
};

export default function HeaderClient(props: HeaderClientProps) {
    const { categorieList } = props;

    return (
        <header>
            <BrowserHeader className="bg-white text-center max-md:hidden" categorieList={categorieList} />
            <MobileHeader className="md:hidden" />
        </header>
    );
}

type BrowserHeaderProps = {
    categorieList: Category[];
    className?: string;
};

const BrowserHeader = (props: BrowserHeaderProps) => {
    const { className, categorieList } = props;

    return (
        <div className={className}>
            <Main />
            <Sub categorieList={categorieList} />
            <Basket />
        </div>
    );
};
