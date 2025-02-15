"use server";

import Prisma from "@lib/prisma";
import { Category } from "@prisma/client";



export const GetCategories = async (props: { order: "asc" | "desc" }): Promise<Category[]> => {
    const { order } = props;

    const data: Category[] = await Prisma.category.findMany({orderBy: {name: order}});
    return data;
};
