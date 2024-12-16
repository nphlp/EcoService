import { SelectRandomFruit } from "@actions/database/Fruit";
import ButtonClient from "@comps/client/Button";
import { Fruit } from "@prisma/client";
import { useState } from "react";
import { ImgClient } from "@comps/client/ImageCard";
import { ImageCard, Text, Title } from "@comps/client/ImageCommon";

export default function ClientFruitPage() {
    const [fruitList, setFruitList] = useState<Fruit[]>([]);

    const fetchRandomFruit = async () => {
        const randomFruit = await SelectRandomFruit();

        if (!randomFruit) {
            return;
        }

        setFruitList([...fruitList, randomFruit]);
    };

    return (
        <>
            <div className="grid columns-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fruitList
                    ? fruitList.map(({ name, description, image }, index) => (
                          <ImageCard key={index}>
                              <ImgClient src={image} alt={name} />
                              <div className="w-[200px] space-y-1 p-4">
                                  <Title>{name}</Title>
                                  <Text>{description}</Text>
                              </div>
                          </ImageCard>
                      ))
                    : "No fruits found."}
            </div>
            <div className="flex items-center justify-center">
                <ButtonClient type="button" label="new-fruit" onClick={fetchRandomFruit}>Get new fruit</ButtonClient>
            </div>
        </>
    );
}
