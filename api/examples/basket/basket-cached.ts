import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";

const basketFindManyCached = async <T extends Prisma.BasketFindManyArgs>(
    props: Prisma.SelectSubset<T, Prisma.BasketFindManyArgs>,
    tags: string[],
) => {
    "use cache";
    cacheTag(...tags);
    cacheLife("hours");
    return await PrismaInstance.basket.findMany(props);
};

export { basketFindManyCached };
