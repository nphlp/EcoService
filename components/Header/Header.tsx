import { FetchParallelized } from "@actions/utils/FetchParallelized";
import { Category } from "@prisma/client";
import Basket from "../Basket/Basket";
import Main from "./Browser/Main";
import Sub from "./Browser/Sub";
import MobileHeader from "./Mobile/MobileHeader";

export type SearchKeywords = {
    id: string;
    keyword: string;
}[];

export default async function Header() {
    const [productList, categorieList] = await FetchParallelized([
        { route: "/products", params: { take: 100 } },
        { route: "/categories", params: { take: 100 } },
    ]);

    if (!productList || !categorieList) {
        return <div>Mmmm... It seems there is not data.</div>;
    }

    const keywords: SearchKeywords = [];
    keywords.push(...productList.map((product) => ({ id: product.id, keyword: product.name })));
    keywords.push(...categorieList.map((categorie) => ({ id: categorie.id, keyword: categorie.name })));

    return (
        <header>
            <BrowserHeader
                className="bg-white text-center max-md:hidden"
                keywords={keywords}
                categorieList={categorieList}
            />
            <MobileHeader className="md:hidden" />
        </header>
    );
}

type BrowserHeaderProps = {
    keywords: SearchKeywords;
    categorieList: Category[];
    className?: string;
};

const BrowserHeader = (props: BrowserHeaderProps) => {
    const { className, keywords, categorieList } = props;

    return (
        <div className={className}>
            <Main />
            <Sub keywords={keywords} categorieList={categorieList} />
            <Basket />
        </div>
    );
};
