import Card from "@comps/UI/card";
import ImageRatio, { ImageRatioProps } from "@comps/UI/imageRatio";
import { ArticleOrDiyListType } from "../sliders/sliderFetchParams";

type ArticleOrDiyCardProps = {
    articleOrDiy: ArticleOrDiyListType[number];
    mode: ImageRatioProps["mode"];
};

export default function ArticleOrDiyCard(props: ArticleOrDiyCardProps) {
    const { articleOrDiy, mode } = props;
    const { title, createdAt, Content } = articleOrDiy;

    return (
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
    );
}

export const ArticleOrDiyCardSkeleton = () => {
    return (
        <Card className="h-full overflow-hidden p-0">
            <div className="animate-shimmer aspect-[3/2]" />
            <div className="space-y-2 p-4">
                <div className="animate-shimmer h-[28px] w-[60%] rounded" />
                <div className="space-y-1">
                    <div className="animate-shimmer h-[18px] w-[90%] rounded" />
                    <div className="animate-shimmer h-[18px] w-[80%] rounded" />
                    <div className="animate-shimmer h-[18px] w-[60%] rounded" />
                </div>
                <div className="animate-shimmer h-[17px] w-[30%] rounded" />
            </div>
        </Card>
    );
};
