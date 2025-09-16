"use client";

import Slider, { LinkInfoType } from "../../UI/slider";
import ArticleOrDiyCard from "../cards/articleOrDiyCard";
import { ArticleOrDiyListType } from "./sliderFetchParams";

type SliderClientProps = {
    className?: string;
    link: string;
    articleOrDiy: ArticleOrDiyListType;
    title: string;
};

export const ArticleOrDiySlider = (props: SliderClientProps) => {
    const { articleOrDiy, link, title } = props;

    if (!articleOrDiy.length) return null;

    const linkList: LinkInfoType[] = articleOrDiy.map((articleOrDiy) => ({
        label: articleOrDiy.title,
        href: `${link}/${articleOrDiy.slug}`,
    }));

    return (
        <section className="space-y-6">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Slider dataListLength={articleOrDiy.length} linkList={linkList}>
                {articleOrDiy.map((articleOrDiy, index) => (
                    <ArticleOrDiyCard key={index} articleOrDiy={articleOrDiy} mode="whenIsVisible" />
                ))}
            </Slider>
        </section>
    );
};
