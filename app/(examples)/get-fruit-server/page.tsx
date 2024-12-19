import { SelectEveryFruit } from "@actions/database/Fruit";
import { ImageCard, Text, Title } from "@comps/server/ImageCommon";
import { Img } from "@comps/server/ImageCard";

export default async function ServerFruitPage() {
    const fruitList = await SelectEveryFruit();

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Fruit List</h1>
                <p>
                    Here is a list of fruits fetched and rendered on the <span className="font-bold">server side</span>. The list is sorted alphabetically.
                </p>
            </div>
            <div className="grid columns-1 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {fruitList
                    ? fruitList.map(({ name, description, image }, index) => (
                        <ImageCard key={index}>
                            <Img src={image} alt={name} />
                            <div className="w-[200px] space-y-1 p-4">
                                <Title>{name}</Title>
                                <Text>{description}</Text>
                            </div>
                        </ImageCard>
                    ))
                    : "No fruits found."}
            </div>
        </div>
    );
}
