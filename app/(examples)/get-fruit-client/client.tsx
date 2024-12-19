'use client'

import { SelectRandomFruit } from "@actions/database/Fruit";
import ButtonClient from "@comps/client/Button";
import { useState } from "react";
import { ImgClient } from "@comps/client/ImageCard";
import { ImageCard, Text, Title } from "@comps/server/ImageCommon";
import { Image as ImageTemplate } from "lucide-react";
import { SelectRandomFruitReturn } from "@actions/types/Fruit";

export default function ClientFruitPage() {
    const [fruitList, setFruitList] = useState<SelectRandomFruitReturn[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchRandomFruit = async () => {
        setIsLoading(true);
        const randomFruit = await SelectRandomFruit();

        if (!randomFruit) {
            return;
        }

        setFruitList([...fruitList, randomFruit]);
        setIsLoading(false);
    };

    return (
        <>
            <div className="grid columns-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fruitList
                    ? fruitList.map(({ name, description, image }, index) => (
                        <ImageCard key={index}>
                            {image ?
                                <ImgClient src={image} alt={name} />
                                : <ImageTemplate width={300} height={200} />
                            }
                            <div className="w-[200px] space-y-1 p-4">
                                <Title>{name}</Title>
                                <Text>{description}</Text>
                            </div>
                        </ImageCard>
                    ))
                    : "No fruits found."}
            </div>
            <div className="flex items-center justify-center">
                <ButtonClient type="button" label="new-fruit" isLoading={isLoading} onClick={fetchRandomFruit}>Get new fruit</ButtonClient>
            </div>
        </>
    );
}
