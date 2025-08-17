import ImageRatio from "@comps/ui/imageRatio";
import Link from "@comps/ui/link";
import { ProductFindUniqueServer } from "@services/server";
import { unstable_ViewTransition as ViewTransition } from "react";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { slug } = await params;

    const product = await ProductFindUniqueServer({ where: { slug } });

    if (!product) {
        return <div>Produit non trouvé</div>;
    }

    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
            <ViewTransition name={`product-${slug}`}>
                <ImageRatio src={product.image} alt={product.name} className="w-1/2 rounded-xl" />
            </ViewTransition>
            <Link label="Retour" href="/examples/ViewTransitionImage" />
        </div>
    );
}
