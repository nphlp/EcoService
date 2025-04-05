"use client";

import Slider, { LinkInfoType } from "./ui/slider";
import { ArticleOrDiyListType } from "./sliderFetchParams";
import ArticleOrDiyCard from "./articleOrDiyCard";

type SliderClientProps = {
    className?: string;
    link: string;
    articleOrDiy: ArticleOrDiyListType;
};

export const ArticleOrDiySlider = (props: SliderClientProps) => {
    const { articleOrDiy, link } = props;

    const linkList: LinkInfoType[] = articleOrDiy.map((articleOrDiy) => ({
        label: articleOrDiy.title,
        href: `${link}/${articleOrDiy.id}`,
    }));

    return (
        <Slider dataListLength={articleOrDiy.length} linkList={linkList}>
            {articleOrDiy.map((articleOrDiy, index) => (
                <ArticleOrDiyCard key={index} articleOrDiy={articleOrDiy} />
            ))}
        </Slider>
    );
};
