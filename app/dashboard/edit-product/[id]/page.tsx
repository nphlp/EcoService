import { hasRole } from "@permissions/hasRole";
import { FetchV3 } from "@utils/FetchV3/FetchV3";
import { unauthorized } from "next/navigation";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const stripeProduct = await FetchV3({
        route: "/stripe/products/select",
        params: { id },
    });

    return <pre className="p-5">Edit Product {JSON.stringify(stripeProduct, null, 2)}</pre>;
}
