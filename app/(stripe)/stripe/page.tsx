import LogoutClient from "@comps/client/Logout";
import PaymentButton from "@comps/client/PaymentButton";
import ProductManager from "@comps/client/ProductManager";
import SellerOnboard from "@comps/client/SellerOnboard";
import { GetSession } from "@lib/auth";
import PrismaInstance from "@lib/prisma";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await GetSession();

    if (!session) {
        redirect("/login");
    }

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
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
            <h1 className="text-2xl font-bold">
                Hello {session.user.name.split(" ")[0]} !
            </h1>
            <div className="flex flex-col items-center gap-4">
                <h2 className="text-xl">Acheter</h2>
                {seller ? (
                    <PaymentButton
                        priceId="price_1QXgsvJ7wWUWkxFlGtww4CKm"
                        sellerId={seller.id}
                    />
                ) : (
                    <p className="text-sm text-gray-500">
                        No sellers available at the moment
                    </p>
                )}
            </div>
            <div className="mt-8 w-full max-w-4xl">
                <SellerOnboard
                    isSeller={user?.isSeller ?? false}
                    isOnboarded={user?.isOnboarded ?? false}
                />
            </div>
            {user?.isSeller && user?.isOnboarded && (
                <div className="mt-8 w-full max-w-4xl">
                    <h2 className="mb-4 text-xl">Product Management</h2>
                    <ProductManager />
                </div>
            )}
            <LogoutClient variant="outline" />
        </div>
    );
}
