import { Fetch } from "@utils/Fetch/Fetch";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const stripeProduct = await Fetch({
        route: "/stripe/products/select",
        params: { id },
    });

    return <pre className="p-5">Edit Product {JSON.stringify(stripeProduct, null, 2)}</pre>;
}
