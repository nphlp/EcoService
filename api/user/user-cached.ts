import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client/client";
import { cacheLife, cacheTag } from "next/cache";
import "server-only";

const userFindManyCached = async <T extends Prisma.UserFindManyArgs>(
    props: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
    key: string[],
) => {
    "use cache";
    cacheTag(...key);
    cacheLife("hours");
    return await PrismaInstance.user.findMany(props);
};

const userFindUniqueCached = async <T extends Prisma.UserFindUniqueArgs>(
    props: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    key: string[],
) => {
    "use cache";
    cacheTag(...key);
    cacheLife("hours");
    return await PrismaInstance.user.findUnique(props);
};

const userFindFirstCached = async <T extends Prisma.UserFindFirstArgs>(
    props: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
    key: string[],
) => {
    "use cache";
    cacheTag(...key);
    cacheLife("hours");
    return await PrismaInstance.user.findFirst(props);
};

export { userFindManyCached, userFindUniqueCached, userFindFirstCached };
