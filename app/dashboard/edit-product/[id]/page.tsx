import { hasRole } from "@permissions/hasRole";
import { unauthorized } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import Solid from "@/solid/solid-fetch";

type PageProps = {
    params: Promise<{ id: string }>;
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

    const { params } = props;
    const { id } = await params;

    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProduct = await Solid({
        route: "/stripe/products/select",
        params: { id },
    });

    return <pre className="p-5">Edit Product {JSON.stringify(stripeProduct, null, 2)}</pre>;
};
