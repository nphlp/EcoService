import { Fruit } from "@prisma/client";

export type FruitType = Fruit;

export interface CreateFruitProps {
    name: string;
    description: string;
    imageFile: File;
}

export interface SelectFruitByIdProps {
    id: Fruit["id"];
}

export interface FruitTypeReturn {
    name: string;
    id: string;
    description: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
