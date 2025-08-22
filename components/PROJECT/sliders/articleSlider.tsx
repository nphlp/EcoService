"use client";

import Slider, { LinkInfoType } from "../../UI/slider";
import ArticleCard from "../cards/articleCard";
import { ArticleListType } from "./sliderFetchParams";

type SliderClientProps = {
    className?: string;
    link: string;
    articles: ArticleListType;
    title: string;
};

export const ArticleSlider = (props: SliderClientProps) => {
    const { articles, link, title } = props;

    if (!articles.length) return null;

    const linkList: LinkInfoType[] = articles.map((article) => ({
        label: article.title,
        href: `${link}/${article.slug}`,
    }));

    return (
        <section className="space-y-6 px-6 py-8 md:px-12 md:py-16">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Slider dataListLength={articles.length} linkList={linkList}>
                {articles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </Slider>
        </section>
    );
};
