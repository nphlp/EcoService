import Card from "@comps/server/card";
import Button from "@comps/ui/button";
import { combo } from "@lib/combo";

export default function Page() {
    return (
        <div className={combo("w-full flex-1 bg-red-100", "grid grid-cols-4 gap-6")}>
            <Card>
                Button
                <Button label="button" />
            </Card>
            <Card></Card>
        </div>
    );
}
