import {
    ArticleCountAction,
    ArticleFindFirstAction,
    ArticleFindManyAction,
    ArticleFindUniqueAction,
} from "@actions/ArticleAction";
import PrismaInstance from "@lib/prisma";
import {
    ArticleCountServer,
    ArticleFindFirstServer,
    ArticleFindManyServer,
    ArticleFindUniqueServer,
} from "@services/server";
import {
    ArticleCountProps,
    ArticleFindFirstProps,
    ArticleFindManyProps,
    ArticleFindUniqueProps,
} from "@services/types";
import { FetchV3 } from "@utils/FetchV3/FetchV3";
import Mutations from "./mutations";

export const dynamic = "force-dynamic";

export default async function Page() {
    // For mutations tests
    const articleClient = await ArticleFindUniqueServer({ where: { id: "test-id" } });

    // ========== Find Many ========== //

    const paramsMany = { select: { slug: true } } satisfies ArticleFindManyProps;

    const articleMany = await PrismaInstance.article.findMany(paramsMany);
    const articleManyServer = await ArticleFindManyServer(paramsMany);
    const articleManyAction = await ArticleFindManyAction(paramsMany, true);
    const articleManyFetch = await FetchV3({ route: "/internal/article/findMany", params: paramsMany });

    const articleManyTypes =
        typeof articleMany === typeof articleManyServer &&
        typeof articleManyServer === typeof articleManyAction &&
        typeof articleManyAction === typeof articleManyFetch;

    // ========== Find First ========== //

    const paramsFirst = { select: { slug: true } } satisfies ArticleFindFirstProps;

    const articleFirst = await PrismaInstance.article.findFirst(paramsFirst);
    const articleFirstServer = await ArticleFindFirstServer(paramsFirst);
    const articleFirstAction = await ArticleFindFirstAction(paramsFirst, true);
    const articleFirstFetch = await FetchV3({ route: "/internal/article/findFirst", params: paramsFirst });

    const articleFirstTypes =
        typeof articleFirst === typeof articleFirstServer &&
        typeof articleFirstServer === typeof articleFirstAction &&
        typeof articleFirstAction === typeof articleFirstFetch;

    // ========== Find Unique ========== //

    const paramsUnique = { select: { slug: true }, where: { id: "" } } satisfies ArticleFindUniqueProps;

    const articleUnique = await PrismaInstance.article.findUnique(paramsUnique);
    const articleUniqueServer = await ArticleFindUniqueServer(paramsUnique);
    const articleUniqueAction = await ArticleFindUniqueAction(paramsUnique, true);
    const articleUniqueFetch = await FetchV3({ route: "/internal/article/findUnique", params: paramsUnique });

    const articleUniqueTypes =
        typeof articleUnique === typeof articleUniqueServer &&
        typeof articleUniqueServer === typeof articleUniqueAction &&
        typeof articleUniqueAction === typeof articleUniqueFetch;

    // ========== Count ========== //

    const paramsCount = {} satisfies ArticleCountProps;

    const articleCount = await PrismaInstance.article.count(paramsCount);
    const articleCountServer = await ArticleCountServer(paramsCount);
    const articleCountAction = await ArticleCountAction(paramsCount, true);
    const articleCountFetch = await FetchV3({ route: "/internal/article/count", params: paramsCount });

    const articleCountTypes =
        typeof articleCount === typeof articleCountServer &&
        typeof articleCountServer === typeof articleCountAction &&
        typeof articleCountAction === typeof articleCountFetch;

    // ========== Return ========== //

    return (
        <div className="space-y-6 p-8">
            <h1 className="mb-6 text-2xl font-bold">Debug Services</h1>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Article Fetches</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Operation</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 font-medium">Find Many</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span className={`font-bold ${articleManyTypes ? "text-green-600" : "text-red-600"}`}>
                                    {articleManyTypes ? "✅" : "❌"}
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-medium">Find First</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span className={`font-bold ${articleFirstTypes ? "text-green-600" : "text-red-600"}`}>
                                    {articleFirstTypes ? "✅" : "❌"}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 font-medium">Find Unique</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span className={`font-bold ${articleUniqueTypes ? "text-green-600" : "text-red-600"}`}>
                                    {articleUniqueTypes ? "✅" : "❌"}
                                </span>
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 font-medium">Count</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <span className={`font-bold ${articleCountTypes ? "text-green-600" : "text-red-600"}`}>
                                    {articleCountTypes ? "✅" : "❌"}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Mutations articleClient={articleClient} />
        </div>
    );
}
