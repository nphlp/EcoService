import ProductCreationForm from "@app/(stripe)/create-product/ProductCreationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EcoService - Créer un produit",
  description: "Créez un nouveau produit ou service écologique",
};

export default function Page() {
  return (
    <main className="w-full">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <h1 className="mb-2 text-4xl font-bold text-[#0A0A2C]">Créer un nouveau service</h1>
        <p className="mb-6 max-w-2xl text-center text-lg text-gray-600">
          Remplissez le formulaire ci-dessous pour ajouter un nouveau service écologique à notre catalogue
        </p>
        <ProductCreationForm />
      </div>
    </main>
  );
} 