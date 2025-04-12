import Card from "@comps/server/card";
import Link from "@comps/ui/link";
import { GetSession } from "@lib/auth";
import { combo } from "@lib/combo";
import { unauthorized } from "next/navigation";
import { ReactNode } from "react";
import { SideBar, SideBarProvider, SideBarButton } from "./sideBar";

export default async function Page() {
    const session = await GetSession();

    const role = session?.user.role;

    if (role !== "ADMIN" && role !== "VENDOR" && role !== "EMPLOYEE") {
        unauthorized();
    }

    return (
        <div className="flex h-full w-full flex-row border-t-1 border-gray-300">
            <SideBarProvider>
                <SideBar className="bg-gray-100">
                    <Link label="Créer un produit" variant="outline" className="text-sm" href="/create-product">
                        Créer un produit
                    </Link>
                    <Link label="Voir les produits" variant="outline" className="text-sm" href="/products">
                        Voir les produits
                    </Link>
                    <Link label="Stripe" variant="outline" className="text-sm" href="/stripe">
                        Stripe
                    </Link>
                </SideBar>
                <MainContent className="bg-gray-50">
                    <div className="flex flex-row items-center justify-start gap-4">
                        <SideBarButton />
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <Card>
                                <FakeContent />
                            </Card>
                            <Card>
                                <FakeContent />
                            </Card>
                            <Card>
                                <FakeContent />
                            </Card>
                            <Card>
                                <FakeContent />
                            </Card>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <Card className="col-span-2">
                                <FakeContent />
                            </Card>
                            <Card className="col-span-2 md:col-span-1">
                                <FakeContent />
                            </Card>
                        </div>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <Card className="col-span-2 md:col-span-1">
                                <FakeContent />
                            </Card>
                            <Card className="col-span-2">
                                <FakeContent />
                            </Card>
                        </div>
                        <div className="space-y-4">
                            <Card>
                                <FakeContent />
                            </Card>
                            <Card>
                                <FakeContent />
                            </Card>
                        </div>
                    </div>
                </MainContent>
            </SideBarProvider>
        </div>
    );
}

const FakeContent = () => {
    return (
        <>
            <div className="text-xl font-bold">Hello</div>
            <div className="line-clamp-5 text-xs text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum ratione neque nemo non commodi minus,
                voluptatum, alias dolor nam, tenetur voluptatibus error sequi voluptas eveniet natus? Ut voluptatum in
                veniam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quae sint officia enim quis
                cum soluta aperiam. Aliquam voluptate nobis eligendi, ut dicta sequi aliquid, nesciunt vero fuga illo
                libero? Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dignissimos vitae nihil
                necessitatibus veniam explicabo inventore! Eius debitis illo quae dolorem saepe, recusandae sequi
                nostrum modi ea, error esse. Nulla.
            </div>
        </>
    );
};

const MainContent = (props: { className?: string; children: ReactNode }) => {
    const { className, children } = props;
    return <div className={combo("flex w-full flex-col space-y-4 overflow-y-auto p-5", className)}>{children}</div>;
};
