import ImageRatio from "@comps/server/imageRatio";
import Link from "@comps/ui/link";
import { FetchV2 } from "@utils/FetchV2/FetchV2";
import { unstable_ViewTransition as ViewTransition } from "react";

export default async function Page() {
    const productList = await FetchV2({
        route: "/product",
        params: {
            take: 5,
        },
    });

    return (
        <div className="flex h-full flex-col items-start justify-start gap-4 p-7">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Image transition</h1>
                <p className="text-sm text-gray-500">An example of a view transition image</p>
            </div>
            <div className="flex w-full flex-row items-center justify-between gap-4">
                {productList.map(({ slug, name, image }, index) => (
                    <Link
                        key={index}
                        label={name}
                        variant="none"
                        baseStyle={false}
                        className="w-full"
                        href={`/examples/ViewTransitionImage/product/${slug}`}
                    >
                        <ViewTransition name={`product-${slug}`}>
                            <ImageRatio src={image} alt={name} className="rounded-xl" />
                        </ViewTransition>
                    </Link>
                ))}
            </div>
        </div>
    );
}
