import ProductManager from "@/components/client/ProductManager";

export default function ProductsPage() {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center gap-6 bg-white p-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <ProductManager />
        </div>
    );
}
