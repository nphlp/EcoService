"use client";

import Slider, { LinkInfoType } from "./UI/slider";
import ArticleOrDiyCard from "./articleOrDiyCard";
import { ArticleOrDiyListType } from "./sliderFetchParams";

type SliderClientProps = {
    className?: string;
    link: string;
    articleOrDiy: ArticleOrDiyListType;
    title: string;
};

export const ArticleOrDiySlider = (props: SliderClientProps) => {
    const { articleOrDiy, link, title } = props;

    if (!articleOrDiy.length) {
        return <></>;
    }

    const linkList: LinkInfoType[] = articleOrDiy.map((articleOrDiy) => ({
        label: articleOrDiy.title,
        href: `${link}/${articleOrDiy.slug}`,
    }));

    return (
        <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Slider dataListLength={articleOrDiy.length} linkList={linkList}>
                {articleOrDiy.map((articleOrDiy, index) => (
                    <ArticleOrDiyCard key={index} articleOrDiy={articleOrDiy} />
                ))}
            </Slider>
        </section>
    );
};
