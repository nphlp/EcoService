import { SelectEveryFruit } from "@actions/database/Fruit";
import { Content, ImageCard, Img, Text, Title } from "@comps/server/ImageCard";

// Server component (can be async function)
export default async function FruitPage() {

    // This server comonent can use a server action directly to fetch data
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
                            <Content>
                                <Title>{name}</Title>
                                <Text>{description}</Text>
                            </Content>
                        </ImageCard>
                    ))
                    : "No fruits found."}
            </div>
        </div>
    );
}
