// import { Category } from "@prisma/client";
import { FetchV2 } from "@utils/FetchV2";
import Basket from "@comps/basket/basket";
import Navigation from "@comps/header/browser/navigation";
import SectionList from "@comps/header/browser/sectionList";
import MobileHeader from "@comps/header/mobile/mobileHeader";
import { CategoryModel } from "@services/types";

export const dynamic = "force-dynamic";

export type SearchKeywords = {
    id: string;
    type: "product" | "category";
    keyword: string;
} & (
    | {
          type: "product";
          image: string;
          price: number;
      }
    | {
          type: "category";
          image?: never;
          price?: never;
      }
);

type HeaderProps = {
    className?: string;
};

export default async function Header(props: HeaderProps) {
    const { className } = props;

    const productList = await FetchV2({
        route: "/product",
        params: { take: 100 },
    });

    const categorieList = await FetchV2({
        route: "/category",
        params: { take: 100 },
    });

    if (!productList || !categorieList) {
        return <div>Mmmm... It seems there is not data.</div>;
    }

    // Generate keyword list for search
    const keywords: SearchKeywords[] = [];
    keywords.push(
        ...productList.map(({ id, name, image, price }) => ({
            id,
            type: "product" as const,
            keyword: name,
            image,
            price,
        })),
    );
    keywords.push(
        ...categorieList.map(({ id, name }) => ({
            id,
            type: "category" as const,
            keyword: name,
        })),
    );

    return (
        <header className={className}>
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
    keywords: SearchKeywords[];
    categorieList: CategoryModel[];
    className?: string;
};

const BrowserHeader = (props: BrowserHeaderProps) => {
    const { className, keywords, categorieList } = props;

    return (
        <div className={className}>
            <Navigation />
            <SectionList keywords={keywords} categorieList={categorieList} />
            <Basket />
        </div>
    );
};
