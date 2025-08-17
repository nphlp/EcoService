import Card, { CardProps } from "@comps/server/card";
import ImageRatio from "@comps/ui/imageRatio";
import { ArticleOrDiyListType } from "./sliderFetchParams";

type ArticleOrDiyCardProps = {
    articleOrDiy: ArticleOrDiyListType[number];
} & CardProps;

export default function ArticleOrDiyCard(props: ArticleOrDiyCardProps) {
    const { articleOrDiy, ...others } = props;
    const { title, createdAt, Content, Author } = articleOrDiy;

    return (
        <Card className="h-full overflow-hidden p-0" {...others}>
            <ImageRatio src={Content[0].image} alt={title} />
            <div className="flex flex-col p-4">
                <h2 className="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-teal-600">
                    {title}
                </h2>

                <p className="mb-4 line-clamp-3 text-gray-600">{Content[0].content}</p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm text-gray-500">Par {Author.name}</span>
                    <span className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
            </div>
        </Card>
    );
}
