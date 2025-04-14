import Card from "@comps/server/card";
import { SideBarButton } from "./sideBar";

export default async function Page() {
    return (
        <>
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
