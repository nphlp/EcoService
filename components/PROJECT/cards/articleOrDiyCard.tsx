import Card, { CardProps } from "@comps/UI/card";
import ImageRatio from "@comps/UI/imageRatio";
import { ArticleOrDiyListType } from "../sliders/sliderFetchParams";

type ArticleOrDiyCardProps = {
    articleOrDiy: ArticleOrDiyListType[number];
} & CardProps;

export default function ArticleOrDiyCard(props: ArticleOrDiyCardProps) {
    const { articleOrDiy, ...others } = props;
    const { title, createdAt, Content } = articleOrDiy;

    return (
        <Card className="flex h-full flex-col overflow-hidden p-0" {...others}>
            <ImageRatio src={Content[0].image} alt={title} mode="whenIsVisible" />
            <div className="space-y-2 p-4">
                <h2 className="line-clamp-1 text-xl font-semibold">{title}</h2>
                <p className="line-clamp-3 text-sm text-gray-600">{Content[0].content}</p>
                <time dateTime={createdAt.toISOString()} className="text-sm text-gray-500">
                    {new Date(createdAt).toLocaleDateString("fr-FR")}
                </time>
            </div>
        </Card>
    );
}
