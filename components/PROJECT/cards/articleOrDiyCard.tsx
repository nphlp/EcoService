import Link from "@comps/UI/button/link";
import Card from "@comps/UI/card";
import ImageRatio, { ImageRatioProps } from "@comps/UI/imageRatio";
import { Route } from "next";
import { ArticleOrDiyListType } from "../sliders/sliderFetchParams";

type ArticleOrDiyCardProps = {
    href: Route;
    articleOrDiy: ArticleOrDiyListType[number];
    mode: ImageRatioProps["mode"];
};

export default function ArticleOrDiyCard(props: ArticleOrDiyCardProps) {
    const { href, articleOrDiy, mode } = props;
    const { title, createdAt, Content } = articleOrDiy;

    return (
        <Link label={title} href={href} variant="none" className="size-full rounded-xl p-2">
            <Card className="flex h-full flex-col overflow-hidden p-0">
                <ImageRatio src={Content[0].image} alt={title} mode={mode} />
                <div className="space-y-2 p-4">
                    <h2 className="line-clamp-1 text-xl font-semibold">{title}</h2>
                    <p className="line-clamp-3 text-sm text-gray-600">{Content[0].content}</p>
                    <time dateTime={new Date(createdAt).toISOString()} className="text-sm text-gray-500">
                        {new Date(createdAt).toLocaleDateString("fr-FR")}
                    </time>
                </div>
            </Card>
        </Link>
    );
}

export const ArticleOrDiyCardSkeleton = () => {
    return (
        <Card className="h-full overflow-hidden p-0">
            <div className="animate-shimmer aspect-3/2" />
            <div className="space-y-2 p-4">
                <div className="animate-shimmer h-7 w-[60%] rounded" />
                <div className="space-y-1">
                    <div className="animate-shimmer h-4.5 w-[90%] rounded" />
                    <div className="animate-shimmer h-4.5 w-[80%] rounded" />
                    <div className="animate-shimmer h-4.5 w-[60%] rounded" />
                </div>
                <div className="animate-shimmer h-4.25 w-[30%] rounded" />
            </div>
        </Card>
    );
};
