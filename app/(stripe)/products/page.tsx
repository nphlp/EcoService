import ProductManager from "@/components/client/ProductManager";

export default function ProductsPage() {
    return (
        <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">
            <div className="container mx-auto py-8">
                <h1 className="mb-8 text-3xl font-bold">Products</h1>
                <ProductManager />
            </div>
        </div>
    );
}
