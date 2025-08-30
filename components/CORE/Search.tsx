import {
    ArticleCountServer,
    ArticleFindManyServer,
    CategoryCountServer,
    CategoryFindManyServer,
    DiyCountServer,
    DiyFindManyServer,
    ProductCountServer,
    ProductFindManyServer,
} from "@services/server";
import SearchModal from "./search/SearchModal";
import {
    ArticleSearchType,
    CategorySearchType,
    CountType,
    DiySearchType,
    ProductSearchType,
    articleCountParams,
    articleFetchParams,
    categoryCountParams,
    categoryFetchParams,
    diyCountParams,
    diyFetchParams,
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

    const diyList: DiySearchType[] = await DiyFindManyServer(diyFetchParams());
    const diyCount: CountType = await DiyCountServer(diyCountParams());

    const initialResults = {
        productList,
        productCount,
        categoryList,
        categoryCount,
        articleList,
        articleCount,
        diyList,
        diyCount,
    };

    return <SearchModal initialResults={initialResults} />;
}
