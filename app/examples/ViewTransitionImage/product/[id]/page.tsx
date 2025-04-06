import ImageRatio from "@comps/server/imageRatio";
import Link from "@comps/ui/link";
import { FetchV2 } from "@utils/FetchV2";
import { unstable_ViewTransition as ViewTransition } from "react";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const product = await FetchV2({
        route: "/product/unique",
        params: { where: { id } },
    });

    if (!product) {
        return <div>Produit non trouvé</div>;
    }

    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <ViewTransition name={`product-${id}`}>
                <ImageRatio src={product.image} alt={product.name} className="w-1/2 rounded-xl" />
            </ViewTransition>
            <Link label="Retour" href="/examples/ViewTransitionImage" />
        </div>
    );
}
