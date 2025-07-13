import PrismaInstance from "@lib/prisma";
import { hasRole } from "@permissions/hasRole";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { SideBarToggleTitle } from "../sideBar";
import PaymentButton from "./components/paymentButton";
import ProductManager from "./components/productManager";
import SellerOnboard from "./components/sellerOnboard";

export const metadata: Metadata = {
    title: "Créer un vendeur",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) unauthorized();

    const user = session
        ? await PrismaInstance.user.findUnique({
              where: { id: session.user.id },
              select: { isSeller: true, isOnboarded: true },
          })
        : null;

    // Fetch a seller that has completed onboarding
    const seller = await PrismaInstance.user.findFirst({
        where: {
            isSeller: true,
            isOnboarded: true,
            stripeConnectId: { not: null },
        },
        select: { id: true },
    });

    return (
        <div className="flex h-full flex-col">
            <SideBarToggleTitle title={metadata.title as string} />
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex w-full flex-col items-center justify-start">
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-xl font-bold">Acheter</h2>
                        {seller ? (
                            <PaymentButton priceId="price_1QXgsvJ7wWUWkxFlGtww4CKm" sellerId={seller.id} />
                        ) : (
                            <p className="text-sm text-gray-500">No sellers available at the moment</p>
                        )}
                    </div>

                    <div className="mt-8 w-full max-w-4xl">
                        <SellerOnboard isSeller={user?.isSeller ?? false} isOnboarded={user?.isOnboarded ?? false} />
                    </div>

                    {user?.isSeller && user?.isOnboarded && (
                        <div className="mt-8 w-full max-w-4xl">
                            <h2 className="mb-4 text-xl">Product Management</h2>
                            <ProductManager />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
