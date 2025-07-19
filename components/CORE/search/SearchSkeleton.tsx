import { ArrowRightIcon } from "lucide-react";

export default function SearchSkeleton() {
    return (
        <>
            <ItemSkeletonList type="product" />
            <ItemSkeletonList type="category" />
            <ItemSkeletonList type="article" />
            <ItemSkeletonList type="diy" />
        </>
    );
}

type SkeletonType = {
    type: "product" | "category" | "article" | "diy";
};

export const ItemSkeletonList = (props: SkeletonType) => {
    const { type } = props;

    const length = type === "product" || type === "article" ? 2 : 1;

    return (
        <div className="space-y-2">
            <div className="flex flex-row items-center justify-between">
                <div className="animate-shimmer-second h-6 w-fit rounded text-transparent">Lorem ipsum dolor</div>
                <div className="animate-shimmer-second h-4 w-fit rounded text-transparent">Lorem ipsum</div>
            </div>
            <hr className="border-gray-300" />
            <div className="space-y-1">
                {Array.from({ length }).map((_, index) => (
                    <ItemSkeleton key={index} type={type} />
                ))}
            </div>
        </div>
    );
};

const ItemSkeleton = (props: SkeletonType) => {
    const { type } = props;

    const isNotCategory = type !== "category";
    const isArticleOrDiy = type === "article" || type === "diy";

    return (
        <div className="flex flex-row items-center justify-center gap-3 rounded-md bg-gray-100 px-4 py-1.5">
            {isNotCategory ? <div className="animate-shimmer-second h-16 w-24 shrink-0 rounded" /> : null}
            <div className="flex w-full flex-col gap-2">
                <div className="animate-shimmer-second h-5 w-fit rounded text-transparent">
                    Lorem ipsum dolor sit amet...
                </div>
                <div className="animate-shimmer-second h-3 w-fit rounded text-transparent">Lorem ipsum dolor...</div>
                {isArticleOrDiy ? (
                    <div className="animate-shimmer-second h-3 w-fit rounded text-transparent">
                        Lorem ipsum dolor...
                    </div>
                ) : null}
            </div>
            <div className="px-2">
                <ArrowRightIcon className="size-6 text-gray-500" />
            </div>
        </div>
    );
};
