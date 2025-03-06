import ButtonClient from "@comps/client/Button";
import ImageRatio from "@comps/server/ImageRatio";
import { Fetch } from "@actions/utils/Fetch";
type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function Page(props: PageProps) {
    const { params } = props;
    const { id } = await params;

    const product = await Fetch({ route: "/products/unique", params: { where: { id } } });

    if (!product) {
        return <div>Produit non trouvé</div>;
    }

    const { name, image, price, description } = product;

    return (
        <div>
            <div className="space-y-4 bg-primary p-6">
                <h1 className="text-4xl font-bold text-secondary">{name}</h1>
                <div className="text-white">{description}</div>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className="w-1/2 p-5">
                    <ImageRatio src={image} alt={name} />
                </div>
                <div className="w-1/2 p-5">
                    <div className="text-xl">{price} €</div>
                    <ButtonClient type="button" label="Ajouter au panier">
                        Ajouter au panier
                    </ButtonClient>
                </div>
            </div>
        </div>
    );
}
