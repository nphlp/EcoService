import {
    ArticleCountServer,
    ArticleFindManyServer,
    CategoryCountServer,
    CategoryFindManyServer,
    ProductCountServer,
    ProductFindManyServer,
} from "@services/server";
import SearchPortal from "./search/SearchPortal";
import {
    ArticleSearchType,
    CategorySearchType,
    CountType,
    ProductSearchType,
    articleCountParams,
    articleFetchParams,
    categoryCountParams,
    categoryFetchParams,
    productCountParams,
    productFetchParams,
} from "./search/fetchParams";

export default async function Search() {
    // Fetch data
    const productList: ProductSearchType[] = await ProductFindManyServer(productFetchParams());
    const productCount: CountType = await ProductCountServer(productCountParams());

    const categoryList: CategorySearchType[] = await CategoryFindManyServer(categoryFetchParams());
    const categoryCount: CountType = await CategoryCountServer(categoryCountParams());

    const articleList: ArticleSearchType[] = await ArticleFindManyServer(articleFetchParams());
    const articleCount: CountType = await ArticleCountServer(articleCountParams());

    const initialResults = {
        productList,
        productCount,
        categoryList,
        categoryCount,
        articleList,
        articleCount,
    };

    return <SearchPortal initialResults={initialResults} />;
}
