"use server";

import { Fruit } from "@prisma/client";

export type FruitType = Fruit;

export interface SelectFruitByIdProps {
    id: Fruit["id"];
}