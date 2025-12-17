"use client";

import { Carousel, Slide } from "@comps/UI/carousel";
import { Route } from "next";
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

    return (
        <section className="space-y-6">
            <h2 className="text-center text-4xl font-bold">{title}</h2>
            <Carousel gap="0.5rem">
                {articleOrDiy.map((articleOrDiy) => (
                    <Slide key={articleOrDiy.title}>
                        <ArticleOrDiyCard
                            href={`${link}/${articleOrDiy.slug}` as Route}
                            articleOrDiy={articleOrDiy}
                            mode="whenIsVisible"
                        />
                    </Slide>
                ))}
            </Carousel>
        </section>
    );
};
