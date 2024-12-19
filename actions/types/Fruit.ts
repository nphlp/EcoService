"use server";

import { Fruit } from "@prisma/client";

export type FruitType = Fruit;

export interface SelectFruitByIdProps {
    id: Fruit["id"];
}

export interface SelectRandomFruitReturn {
    name: string;
    id: string;
    description: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}