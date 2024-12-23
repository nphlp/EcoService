"use client";

import { SelectRandomFruit } from "@actions/database/Fruit";
import ButtonClient from "@comps/client/Button";
import { useState } from "react";
import { Content, ImageCard, Img, Text, Title } from "@comps/server/ImageCard";
import { FruitTypeReturn } from "@actions/types/Fruit";

// Client component (can't be async fucntion)
export default function FruitPageClient() {
    const [fruitList, setFruitList] = useState<FruitTypeReturn[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // This client component can't use server actions directly, it needs to create an async function to fetch data from server
    const fetchRandomFruit = async () => {
        // Start loading
        setIsLoading(true);

        const randomFruit = await SelectRandomFruit();

        if (!randomFruit) {
            return;
        }

        setFruitList([...fruitList, randomFruit]);

        // Stop loading
        setIsLoading(false);
    };

    return (
        <>
            <div className="grid columns-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fruitList
                    ? fruitList.map(({ name, description, image }, index) => (
                          <ImageCard key={index}>
                              <Img src={image} alt={name} />
                              <Content>
                                  <Title>{name}</Title>
                                  <Text>{description}</Text>
                              </Content>
                          </ImageCard>
                      ))
                    : "No fruits found."}
            </div>
            <div className="flex items-center justify-center">
                <ButtonClient
                    type="button"
                    label="new-fruit"
                    isLoading={isLoading}
                    onClick={fetchRandomFruit}
                >
                    Get new fruit
                </ButtonClient>
            </div>
        </>
    );
}
