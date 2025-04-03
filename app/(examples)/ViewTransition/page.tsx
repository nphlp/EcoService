import ImageRatio from "@comps/server/ImageRatio";
import Link from "@comps/ui/Link";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <ViewTransition name="product">
                <ImageRatio className="h-80 rounded-xl" src={"/illustration/produit 2.jpg"} alt={"Product 1"} />
            </ViewTransition>
            <ViewTransition name="button">
                <Link href="/ViewTransition/zoom" label="Next" />
            </ViewTransition>
        </div>
    );
}
