import Pagination from "@comps/SHARED/PaginationFilter";
import SearchFilter from "@comps/SHARED/SearchFilter";
import { combo } from "@lib/combo";
import { DiyCountServer, DiyFindManyServer } from "@services/server";
import { Search } from "lucide-react";
import { Metadata } from "next";
import { connection } from "next/server";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { Context } from "./context";
import DiyResults from "./diyResults";
import { diyCountParams, diyFetchParams } from "./fetchParams";
import Provider from "./provider";
import { diyQueryParamsCached } from "./queryParams";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

export const metadata: Metadata = {
    title: "Nos tutoriels DIY",
    description: "Découvrez nos tutoriels DIY et nos conseils pour améliorer votre maison.",
    metadataBase: new URL(`${baseUrl}/diy`),
    alternates: {
        canonical: `${baseUrl}/diy`,
    },
};

type PageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: PageProps) {
    return (
        <Suspense>
            <SuspendedPage {...props} />
        </Suspense>
    );
}

const SuspendedPage = async (props: PageProps) => {
    await connection();

    const { searchParams } = props;

    // Get search params
    const { page, search } = await diyQueryParamsCached.parse(searchParams);

    // Fetch data
    const initialDiyAmount = await DiyCountServer(diyCountParams({ search }));

    const initialDiyList = await DiyFindManyServer(diyFetchParams({ page, search }));

    return (
        <div className="flex w-full flex-1 flex-col space-y-6 py-10">
            <Provider initialDiyAmount={initialDiyAmount}>
                <section
                    className={combo(
                        "mx-auto max-w-400 px-4 md:px-7",
                        "flex w-full flex-col items-center justify-between gap-4 md:flex-row",
                    )}
                >
                    <h1 className="text-center text-3xl font-bold md:text-4xl">Nos tutoriels DIY</h1>
                    <div className={combo("group flex flex-row items-center justify-center gap-4")}>
                        <Search
                            className={combo(
                                "text-gray-400 group-focus-within:text-gray-700",
                                "transition-all duration-150",
                            )}
                        />
                        <SearchFilter
                            className={{
                                input: "rounded-none border-x-0 border-t-0 border-b-gray-300 px-0 py-0.5 ring-transparent",
                            }}
                            noLabel
                        />
                    </div>
                </section>
                <DiyResults initialDiyList={initialDiyList} />
                <Pagination path="/diy" takeOverride={6} context={Context} />
            </Provider>
        </div>
    );
};
