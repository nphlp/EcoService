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
        <main className="w-full space-y-8 py-12">
            <div className="flex flex-col items-center justify-center gap-3">
                <h1 className="text-4xl font-bold text-primary">Créer un nouveau produit</h1>
                <p className="text-center text-lg text-gray-600">Ajouter un produit au catalogue</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center bg-primary py-12 text-white">
                <ProductCreationForm categoryList={categoryList} />
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
                <h2 className="text-2xl font-bold text-primary">Consulter la liste de mes produits sur Stripe</h2>
                <Link href="https://dashboard.stripe.com/test/products" label="Voir les produits">
                    Voir les produits
                </Link>
            </div>
        </main>
    );
}
