import { FruitType, SelectFruitByIdProps } from "@actions/types/Fruit";
import Prisma from "@lib/prisma";

export const SelectFruitById = async (
    props: SelectFruitByIdProps
): Promise<FruitType | null> => {
    try {
        const { id } = props;

        if (!id) {
            throw new Error("Some parameters are missing");
        }

        const fruitDataRaw = await Prisma.fruit.findUnique({
            where: {
                id,
            },
        });

        if (!fruitDataRaw) {
            return null;
        }

        return fruitDataRaw;
    } catch (error) {
        throw new Error("SelectFruitById -> " + (error as Error).message);
    }
};

export const SelectEveryFruit = async (): Promise<FruitType[] | null> => {
    try {
        const fruitDataRaw = await Prisma.fruit.findMany();

        if (!fruitDataRaw) {
            return null;
        }

        return fruitDataRaw;
    } catch (error) {
        throw new Error("SelectEveryFruit -> " + (error as Error).message);
    }
};
