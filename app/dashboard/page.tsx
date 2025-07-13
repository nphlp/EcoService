import Card from "@comps/server/card";
import { hasRole } from "@permissions/hasRole";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { SideBarToggleTitle } from "./sideBar";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    const session = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
    if (!session) {
        unauthorized();
    }

    return (
        <>
            <SideBarToggleTitle title={metadata.title as string} />
            <div className="p-5">
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
            </div>
        </>
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
