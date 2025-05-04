import BasketProductList from "./basketProductList";
import CheckoutButton from "./checkoutButton";

export default function Page() {
    return (
        <div className="flex min-h-full flex-col items-center justify-center">
            <div className="flex flex-col items-start space-y-6 p-5">
                <h2 className="text-4xl font-bold">Votre panier</h2>
                <hr className="w-full" />
                <BasketProductList />
                <hr className="w-full" />
                <CheckoutButton />
            </div>
        </div>
    );
}
