import { Button } from "@comps/shadcn/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@comps/shadcn/components/ui/card";
import { ProductFindManyServer } from "@services/server";
import Combobox from "./combobox";

export default async function Page() {
    const productList = await ProductFindManyServer({
        select: {
            id: true,
            name: true,
        },
    });

    const productOptions = productList.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Card className="">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <Combobox options={productOptions} />
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
