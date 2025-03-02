import Link from "next/link";
import ParamsExampleClient from "./client";
import ParamsExampleTitle from "./title";
import { queryParamCached, QueryParamType, urlSerializer } from "./type";

type PageProps = {
    searchParams: Promise<QueryParamType>;
};

export default async function Page(props: PageProps) {
    const { searchParams } = props;

    // The cached value is shared to the nested components
    const dataCached = await queryParamCached.parse(searchParams);

    // console.log("Parent server component", "\n", dataCached);

    // Generate a new URL with cutsomized params
    const nextPage = dataCached.page === 1 ? 2 : 1;
    const generateUrl = urlSerializer("/examples/url-params", {
        page: nextPage,
    });

    // console.log("Generated URL", "\n", generateUrl);

    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="space-y-8">
                <ParamsExampleTitle />
                <ParamsExampleClient />
                <div className="flex justify-center">
                    <Link href={generateUrl} className="block w-fit rounded bg-blue-500 px-4 py-2 text-white">
                        Go to page {nextPage}
                    </Link>
                </div>
            </div>
        </div>
    );
}
