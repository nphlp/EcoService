import ProductManager from "@/components/client/ProductManager";

export default function ProductsPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="mb-8 text-3xl font-bold">Products</h1>
            <ProductManager />
        </div>
    );
}
