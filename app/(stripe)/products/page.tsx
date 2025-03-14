import ProductDisplay from "@app/(stripe)/products/ProductDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EcoService - Produits",
  description: "Découvrez nos produits et services écologiques",
};

export default function Page() {
  return (
    <main className="w-full">
      <ProductDisplay />
    </main>
  );
}
