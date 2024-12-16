"use server"

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

        const fruitData: FruitType = fruitDataRaw

        return fruitData;
    } catch (error) {
        throw new Error("SelectFruitById -> " + (error as Error).message);
    }
};

export const SelectEveryFruit = async (): Promise<FruitType[] | null> => {
    try {
        const fruitDataListRaw = await Prisma.fruit.findMany();

        if (!fruitDataListRaw.length) {
            return null;
        }

        const fruitDataList: FruitType[] = fruitDataListRaw.sort((a, b) => a.name.localeCompare(b.name));

        return fruitDataList;
    } catch (error) {
        throw new Error("SelectEveryFruit -> " + (error as Error).message);
    }
};

export const SelectRandomFruit = async (): Promise<FruitType | null> => {
    try {
        const fruitDataListRaw = await Prisma.fruit.findMany();

        if (!fruitDataListRaw.length) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * fruitDataListRaw.length);

        const fruitData: FruitType = fruitDataListRaw[randomIndex];

        return fruitData;
    } catch (error) {
        throw new Error("SelectRandomFruit -> " + (error as Error).message);
    }
}