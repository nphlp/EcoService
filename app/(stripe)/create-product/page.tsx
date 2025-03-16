import ProductCreationForm from "@app/(stripe)/create-product/ProductCreationForm";
import { Fetch } from "@app/api/utils/Fetch";
import Link from "@ui/Link";

export default async function Page() {
    // const session = await GetSession();

    // if (!session) {
    //     unauthorized();
    // }

    const categoryList = await Fetch({ route: "/categories" });

    if (!categoryList) {
        throw new Error("Category list not found");
    }

    return (
        <main className="w-full bg-primary">
            <div className="flex flex-col py-12 items-center justify-center gap-12">
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-4xl font-bold text-white">
                        <span>Créer un </span>
                        <span className="text-secondary">nouveau</span>
                        <span> produit</span>
                    </h1>
                    <div className="text-center text-lg text-gray-300">Ajouter un produit au catalogue</div>
                </div>
                <ProductCreationForm categoryList={categoryList} />
            </div>
            <div className="flex flex-col items-center justify-center bg-white py-12 gap-3">
                <h2 className="text-2xl font-bold text-primary">Consulter la liste de mes produits sur Stripe</h2>
                <Link href="https://dashboard.stripe.com/test/products" label="Voir les produits">
                    Voir les produits
                </Link>
            </div>
        </main>
    );
}
