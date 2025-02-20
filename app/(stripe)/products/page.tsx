import ProductManager from "@/components/client/ProductManager";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
            <h1 className="text-3xl font-bold">Products</h1>
            <ProductManager />
        </div>
    );
}
