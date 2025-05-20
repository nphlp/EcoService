"use cache";

import Basket from "@comps/basket/basket";
import Navigation from "@comps/header/browser/navigation";
import SectionList from "@comps/header/browser/sectionList";
import MobileHeader from "@comps/header/mobile/mobileHeader";
import { CategoryModel } from "@services/types";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

export type SearchKeywords = {
    slug: string;
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
    cacheLife("hours");
    cacheTag("header");

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
        ...productList.map(({ slug, name, image, price }) => ({
            slug,
            type: "product" as const,
            keyword: name,
            image,
            price,
        })),
    );
    keywords.push(
        ...categorieList.map(({ slug, name }) => ({
            slug,
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
